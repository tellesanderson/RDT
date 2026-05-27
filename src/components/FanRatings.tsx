import React, { useState, useEffect } from "react";
import { MatchData } from "../mocks/mockData";
import { Club } from "../mocks/clubs";
import { ClubBadge } from "./ClubBadge";
import { ShareCardButton } from "./ShareCardButton";
import { Trophy, User, Star, ShieldAlert, Award, Clock, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";

interface FanRatingsProps {
  matchData: MatchData;
  currentClub: Club;
  onVoteSubmitted: () => void;
}

interface RatingsState {
  [key: string]: number;
}

// Map grade to funny Brazilian football expressions
const getGradeCaption = (grade: number): string => {
  if (grade < 3.0) return "Pereba Histórico 🤮";
  if (grade < 5.0) return "Fraco demais 📉";
  if (grade < 6.5) return "Fez o básico 😴";
  if (grade < 8.0) return "Regular/Bom 👍";
  if (grade < 9.5) return "Destaque! 🔥";
  return "Joga de terno! 🎩✨";
};

// Help to get thermometer info
const getThermometerInfo = (avg: number) => {
  if (avg < 4.5) {
    return {
      label: "Clima Tenso 🥶",
      desc: "Torcida impaciente com as atuações! Corneta está batendo recordes.",
      color: "from-blue-600 to-indigo-500",
      accent: "text-blue-400"
    };
  }
  if (avg < 6.5) {
    return {
      label: "Time Apático 😐",
      desc: "Jogo burocrático e sem brilho. A torcida esperava bem mais hoje.",
      color: "from-slate-600 to-amber-600",
      accent: "text-amber-400"
    };
  }
  if (avg < 8.5) {
    return {
      label: "Futebol Aprovado 🙂",
      desc: "Boa exibição geral. Torcida apoia o desempenho em campo.",
      color: "from-emerald-600 to-teal-500",
      accent: "text-emerald-400"
    };
  }
  return {
    label: "Show de Bola! 😍",
    desc: "Atuação de gala! A torcida está em festa e aplaudindo de pé.",
    color: "from-amber-500 to-yellow-400",
    accent: "text-yellow-400"
  };
};

export const FanRatings: React.FC<FanRatingsProps> = ({ matchData, currentClub, onVoteSubmitted }) => {
  const { teams, highlights_1_minuto, central_da_corneta } = matchData;
  const matchId = matchData.match_info.id;

  const isHome = teams.home.id.replace("team_", "").toLowerCase() === currentClub.id;
  const homeScore = teams.home.score;
  const awayScore = teams.away.score;
  
  const won = (isHome && homeScore > awayScore) || (!isHome && awayScore > homeScore);
  const lost = (isHome && homeScore < awayScore) || (!isHome && awayScore < homeScore);
  const draw = homeScore === awayScore;

  // Retrieve players from the match generator details
  const getPlayersToRate = () => {
    const list = isHome 
      ? [...central_da_corneta.top_players, ...central_da_corneta.flop_players].filter(p => p.id.startsWith("hp"))
      : [...central_da_corneta.top_players, ...central_da_corneta.flop_players].filter(p => p.id.startsWith("ap"));
    
    if (list.length === 0) {
      return [
        { id: "p1", name: "Goleiro Paredão", position: "GOL" },
        { id: "p2", name: "Zagueiro Xerife", position: "ZAG" },
        { id: "p3", name: "Meia Armador", position: "MEI" },
        { id: "p4", name: "Ponta Veloz", position: "ATA" },
        { id: "p5", name: "Artilheiro do Time", position: "ATA" }
      ];
    }

    return list.map(p => ({
      id: p.id,
      name: p.name,
      position: p.position
    }));
  };

  const players = getPlayersToRate();
  const coachId = "coach_id";
  const refereeId = "referee_id";

  const [ratings, setRatings] = useState<RatingsState>({});
  const [hasVoted, setHasVoted] = useState(false);
  const [globalAverages, setGlobalAverages] = useState<Record<string, number>>({});
  
  // Simulated Comments (Mural da Corneta)
  const [comments, setComments] = useState<string[]>([]);
  
  // Poll (Enquete) State
  const [pollVoted, setPollVoted] = useState(false);
  const [selectedPollOption, setSelectedPollOption] = useState<number | null>(null);
  const [pollVotes, setPollVotes] = useState<number[]>([45, 25, 18, 12]);

  // Retrieve previous votes & setup states
  useEffect(() => {
    const savedVotes = localStorage.getItem(`votes_${matchId}`);
    if (savedVotes) {
      setRatings(JSON.parse(savedVotes));
      setHasVoted(true);
    } else {
      const defaults: RatingsState = {};
      players.forEach(p => { defaults[p.id] = 6.0; });
      defaults[coachId] = 6.0;
      defaults[refereeId] = 5.0;
      setRatings(defaults);
      setHasVoted(false);
    }

    // Load poll state
    const savedPoll = localStorage.getItem(`poll_${matchId}`);
    if (savedPoll) {
      setPollVoted(true);
      setSelectedPollOption(parseInt(savedPoll));
    } else {
      setPollVoted(false);
      setSelectedPollOption(null);
    }
  }, [matchId]);

  // Load global averages
  useEffect(() => {
    const averages: Record<string, number> = {};
    players.forEach((p, idx) => {
      averages[p.id] = parseFloat((6.5 + (idx % 2 === 0 ? 1.4 : -1.1)).toFixed(1));
    });
    averages[coachId] = central_da_corneta.average_coach_rating;
    averages[refereeId] = central_da_corneta.average_referee_rating;
    setGlobalAverages(averages);
  }, [matchId]);

  // Generate dynamic simulated comments based on match outcome
  useEffect(() => {
    let mockComments: string[] = [];
    if (won) {
      mockComments = [
        "Vitória importantíssima! O time jogou com raça no segundo tempo. 🔥",
        "Aquele jogador ali na ponta jogou muito hoje, é titular absoluto!",
        "Juiz caseiro tentou complicar expulsando nosso zagueiro, mas fomos superiores.",
        "Ótima vitória, mas o professor mexeu mal de novo no final. Quase sofremos o empate."
      ];
    } else if (lost) {
      mockComments = [
        "Pode mandar esse técnico embora hoje. Não tem padrão tático nenhum! 🤦‍♂️",
        "Que zaga lenta... Parecia que tavam jogando de calça jeans molhada hoje.",
        "Fomos roubados! Aquele pênalti não marcado mudou o jogo de figura. Juiz cego!",
        "Falta vontade de jogar pra essa galera. Salários milionários e futebol minúsculo!"
      ];
    } else {
      mockComments = [
        "Empate amargo. Entramos com sono no primeiro tempo e pagamos o preço.",
        "Perdemos chances claras cara a cara com o goleiro. Displicência pura!",
        "Pelo menos somamos um ponto fora de casa, mas o futebol apresentado deu sono 😴",
        "Temos que treinar finalização a semana inteira. Ataque inofensivo hoje."
      ];
    }
    setComments(mockComments);
  }, [won, lost, draw]);

  const handleRatingChange = (id: string, val: number) => {
    setRatings(prev => ({
      ...prev,
      [id]: val
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(`votes_${matchId}`, JSON.stringify(ratings));
    setHasVoted(true);
    onVoteSubmitted();
  };

  // Helper to color grades dynamically
  const getGradeColorClass = (grade: number) => {
    if (grade < 5.0) return "text-rose-400 bg-rose-500/10 border-rose-500/20";
    if (grade < 7.5) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
  };

  // User Average Grade
  const calculateAverage = () => {
    const keys = Object.keys(ratings);
    if (keys.length === 0) return 0;
    const sum = keys.reduce((acc, key) => acc + ratings[key], 0);
    return parseFloat((sum / keys.length).toFixed(1));
  };

  const userAverage = calculateAverage();
  const thermo = getThermometerInfo(userAverage);

  // Poll configuration based on outcome
  const getPollConfig = () => {
    if (won) {
      return {
        question: "Qual foi o principal fator para a nossa vitória de hoje?",
        options: [
          "A garra e entrega tática dos jogadores",
          "O talento individual do nosso artilheiro",
          "As substituições certeiras do treinador",
          "A fragilidade técnica do time adversário"
        ]
      };
    } else if (lost) {
      return {
        question: "Quem foi o maior culpado pela derrota de hoje?",
        options: [
          "O esquema tático covarde do treinador",
          "Erros individuais grotescos da defesa",
          "Falta de vontade e moleza em campo",
          "A arbitragem confusa que nos prejudicou"
        ]
      };
    } else {
      return {
        question: "O que faltou para sairmos de campo com os três pontos?",
        options: [
          "Mais criatividade e passes no meio campo",
          "Pontaria calibrada na hora de finalizar",
          "Substituições mais rápidas do técnico",
          "Foco defensivo nos minutos finais"
        ]
      };
    }
  };

  const poll = getPollConfig();

  const handleVotePoll = (idx: number) => {
    setSelectedPollOption(idx);
    setPollVoted(true);
    localStorage.setItem(`poll_${matchId}`, idx.toString());
    
    // Add weight to selected option for visual interest
    setPollVotes(prev => {
      const copy = [...prev];
      copy[idx] = copy[idx] + 15;
      const total = copy.reduce((a,b)=>a+b, 0);
      return copy.map(v => Math.round((v / total) * 100));
    });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* 1. VOTAÇÃO OU EXIBIÇÃO DE NOTAS */}
      {!hasVoted ? (
        <form onSubmit={handleSubmit} className="w-full rounded-3xl glass-panel p-5 border border-white/5 shadow-2xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
            <div>
              <h2 className="text-xs font-black text-white uppercase tracking-widest">
                Central da Corneta
              </h2>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">Avalie as atuações do seu time hoje.</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-white/5 text-xs font-bold text-white shadow-inner">
              ⭐ Média: <span className="text-club-accent font-black">{userAverage}</span>
            </div>
          </div>

          {/* Thermometer Status Header */}
          <div className={`mb-5 p-3 rounded-2xl bg-gradient-to-r ${thermo.color} text-white flex items-center justify-between shadow-md`}>
            <div className="max-w-[70%]">
              <span className="text-[10px] font-black uppercase tracking-wider block opacity-75">Termômetro do Jogo</span>
              <span className="text-xs font-semibold leading-relaxed block mt-0.5">{thermo.desc}</span>
            </div>
            <span className="text-sm font-black uppercase tracking-widest shrink-0 px-2.5 py-1 bg-black/25 rounded-xl border border-white/10">
              {thermo.label}
            </span>
          </div>

          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
            {/* Player Ratings */}
            {players.map(player => (
              <div key={player.id} className="bg-slate-950/40 rounded-2xl p-3.5 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-club-primary/10 border border-club-primary/20 flex items-center justify-center text-club-accent shrink-0">
                      <User size={13} />
                    </div>
                    <div>
                      <span className="text-xs font-black text-white block leading-tight">{player.name}</span>
                      <span className="text-[9px] text-slate-500 font-black tracking-widest uppercase mt-0.5">{player.position}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${getGradeColorClass(ratings[player.id] || 6.0)}`}>
                      {(ratings[player.id] || 6.0).toFixed(1)}
                    </span>
                    <span className="text-[9px] font-medium text-slate-400 block mt-1">{getGradeCaption(ratings[player.id] || 6.0)}</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={ratings[player.id] || 6.0}
                  onChange={(e) => handleRatingChange(player.id, parseFloat(e.target.value))}
                  className="w-full cursor-pointer"
                />
              </div>
            ))}

            {/* Coach Rating */}
            <div className="bg-slate-950/40 rounded-2xl p-3.5 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-club-primary/10 border border-club-primary/20 flex items-center justify-center text-club-accent shrink-0">
                    <Award size={13} />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white block leading-tight">O Técnico</span>
                    <span className="text-[9px] text-slate-500 font-black tracking-widest uppercase mt-0.5">Treinador</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${getGradeColorClass(ratings[coachId] || 6.0)}`}>
                    {(ratings[coachId] || 6.0).toFixed(1)}
                  </span>
                  <span className="text-[9px] font-medium text-slate-400 block mt-1">{getGradeCaption(ratings[coachId] || 6.0)}</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={ratings[coachId] || 6.0}
                onChange={(e) => handleRatingChange(coachId, parseFloat(e.target.value))}
                className="w-full cursor-pointer"
              />
            </div>

            {/* Referee Rating */}
            <div className="bg-slate-950/40 rounded-2xl p-3.5 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-950/20 border border-rose-900/30 flex items-center justify-center text-rose-400 shrink-0">
                    <ShieldAlert size={13} />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white block leading-tight">A Arbitragem</span>
                    <span className="text-[9px] text-slate-500 font-black tracking-widest uppercase mt-0.5">Árbitro</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${getGradeColorClass(ratings[refereeId] || 5.0)}`}>
                    {(ratings[refereeId] || 5.0).toFixed(1)}
                  </span>
                  <span className="text-[9px] font-medium text-slate-400 block mt-1">{getGradeCaption(ratings[refereeId] || 5.0)}</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={ratings[refereeId] || 5.0}
                onChange={(e) => handleRatingChange(refereeId, parseFloat(e.target.value))}
                className="w-full cursor-pointer"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-5 bg-club-accent hover:opacity-95 text-slate-950 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md shadow-club-accent/25 active:scale-97 border border-white/10"
          >
            Confirmar Minhas Notas
          </button>
        </form>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Card containing the values to capture (ID: share-card-container) */}
          <div 
            id="share-card-container" 
            className="w-full rounded-3xl bg-slate-950 p-5 border border-white/5 shadow-2xl relative overflow-hidden"
          >
            {/* Background Glows for shared card */}
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-club-primary/10 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-club-accent/5 blur-2xl pointer-events-none" />

            {/* Watermark */}
            <div className="absolute top-2 right-4 text-[7px] font-black uppercase text-slate-600 tracking-widest pointer-events-none">
              RadardaTorcida.com
            </div>

            {/* Score info for card */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ClubBadge clubId={teams.home.id.replace("team_", "").toLowerCase()} size={24} />
                <span className="text-[10px] font-black text-white uppercase">{teams.home.short_name}</span>
                <span className="text-xs font-black text-slate-300">{teams.home.score}</span>
                <span className="text-[9px] font-bold text-slate-600">x</span>
                <span className="text-xs font-black text-slate-300">{teams.away.score}</span>
                <span className="text-[10px] font-black text-white uppercase">{teams.away.short_name}</span>
                <ClubBadge clubId={teams.away.id.replace("team_", "").toLowerCase()} size={24} />
              </div>
              <div className="flex items-center gap-1 bg-club-primary/10 border border-club-primary/20 px-2 py-0.5 rounded text-[8px] font-black text-club-accent uppercase">
                Votado
              </div>
            </div>

            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-4 text-center">
              Minhas Notas do Jogo
            </h3>

            {/* User Ratings Display inside Share Card */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {players.map(player => (
                <div key={player.id} className="bg-slate-900/50 rounded-xl p-3 border border-white/5 flex items-center justify-between">
                  <div className="truncate max-w-[85px]">
                    <span className="text-xs font-black text-white block truncate leading-none">{player.name}</span>
                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block mt-1">{player.position}</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border shrink-0 ${getGradeColorClass(ratings[player.id] || 6.0)}`}>
                    {(ratings[player.id] || 6.0).toFixed(1)}
                  </span>
                </div>
              ))}
              
              {/* Técnico */}
              <div className="bg-slate-900/50 rounded-xl p-3 border border-white/5 flex items-center justify-between">
                <div className="truncate">
                  <span className="text-xs font-black text-white block leading-none">O Técnico</span>
                  <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block mt-1">Treinador</span>
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border shrink-0 ${getGradeColorClass(ratings[coachId] || 6.0)}`}>
                  {(ratings[coachId] || 6.0).toFixed(1)}
                </span>
              </div>

              {/* Árbitro */}
              <div className="bg-slate-900/50 rounded-xl p-3 border border-white/5 flex items-center justify-between">
                <div className="truncate">
                  <span className="text-xs font-black text-white block leading-none">Árbitro</span>
                  <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block mt-1">Arbitragem</span>
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border shrink-0 ${getGradeColorClass(ratings[refereeId] || 5.0)}`}>
                  {(ratings[refereeId] || 5.0).toFixed(1)}
                </span>
              </div>
            </div>

            {/* Overall User Average inside Card */}
            <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-white/5">
              <div className="flex items-center gap-1.5">
                <Trophy size={14} className="text-yellow-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Minha Nota Média</span>
              </div>
              <span className="text-xs font-black text-club-accent bg-club-primary/10 border border-club-primary/20 px-2.5 py-0.5 rounded-lg">{userAverage} / 10</span>
            </div>
          </div>

          {/* Retention banner */}
          <div className="bg-slate-950/60 rounded-3xl p-4 border border-white/5 flex items-start gap-3 shadow-md">
            <div className="p-2 rounded-2xl bg-slate-900 text-club-accent border border-slate-800 shrink-0">
              <Clock size={15} className="animate-spin-slow" />
            </div>
            <div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-wider">Nota Oficial da Torcida</h4>
              <p className="text-[11px] text-slate-400 mt-1 font-semibold leading-relaxed">
                A nota oficial consolidada de todos os torcedores sai amanhã às 8h. Volte para conferir!
              </p>
            </div>
          </div>

          {/* Share Button (calls html2canvas) */}
          <ShareCardButton 
            elementId="share-card-container" 
            matchInfo={`${currentClub.shortName}-match-notes`} 
          />

          <button
            onClick={() => setHasVoted(false)}
            className="w-full text-center text-[10px] font-black text-slate-500 hover:text-slate-400 uppercase tracking-widest py-2"
          >
            Refazer Minha Votação
          </button>
        </div>
      )}

      {/* 2. MURAL DA CORNETA (Simulated Live Fan Feed) */}
      <div className="w-full rounded-3xl glass-panel p-5 border border-white/5 shadow-lg">
        <div className="flex items-center gap-1.5 mb-4 border-b border-white/5 pb-2.5">
          <MessageSquare size={14} className="text-club-accent" />
          <h3 className="text-xs font-black text-white uppercase tracking-widest">
            Mural da Corneta
          </h3>
          <span className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        </div>

        <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
          {comments.map((comment, idx) => (
            <div key={idx} className="flex gap-2.5 items-start bg-slate-950/40 p-3 rounded-2xl border border-white/5">
              <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-[10px] text-slate-400 shrink-0">
                Torcedor #{1024 + idx * 87}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">há {idx * 3 + 2} minutos</span>
                <p className="text-[11px] text-slate-300 font-semibold leading-relaxed">{comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. ENQUETE INTERATIVA DA TORCIDA */}
      <div className="w-full rounded-3xl glass-panel p-5 border border-white/5 shadow-lg">
        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-1.5">
          Enquete da Rodada
        </h3>
        <p className="text-[10px] text-slate-400 font-medium mb-4 border-b border-white/5 pb-2.5">{poll.question}</p>

        {!pollVoted ? (
          <div className="flex flex-col gap-2.5">
            {poll.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleVotePoll(idx)}
                className="w-full text-left bg-slate-950/50 hover:bg-slate-900 p-3 rounded-2xl border border-white/5 text-[11px] font-bold text-slate-300 hover:text-white transition-all active:scale-98 cursor-pointer"
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {poll.options.map((option, idx) => {
              const isSelected = selectedPollOption === idx;
              const percent = pollVotes[idx];
              return (
                <div key={idx} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[11px] font-black text-slate-200">
                    <span className="truncate max-w-[85%]">{option} {isSelected && "🎯"}</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${isSelected ? "bg-club-accent" : "bg-slate-800"}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
            <button
              onClick={() => {
                setPollVoted(false);
                setSelectedPollOption(null);
                localStorage.removeItem(`poll_${matchId}`);
              }}
              className="mt-2 text-center text-[9px] font-black text-slate-500 hover:text-slate-400 uppercase tracking-widest py-1"
            >
              Votar Novamente
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

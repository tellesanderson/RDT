import { useState } from "react";
import { Round } from "../types/worldcup";
import MiniFlag from "./MiniFlag";
import { Search, Calendar, MapPin, Award, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface MatchCenterProps {
  rounds: Round[];
  onMatchScoreChange: (roundIdx: number, matchIdx: number, s1: number | null, s2: number | null) => void;
}

interface FilteredMatchItem {
  match: any;
  roundIdx: number;
  matchIdx: number;
}

export default function MatchCenter({ rounds, onMatchScoreChange }: MatchCenterProps) {
  const [selectedRoundIdx, setSelectedRoundIdx] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const groups = [
    "Todos", "Grupo A", "Grupo B", "Grupo C", "Grupo D", "Grupo E", 
    "Grupo F", "Grupo G", "Grupo H", "Grupo I", "Grupo J", "Grupo K", "Grupo L"
  ];

  const handleScoreChange = (
    roundIdx: number, 
    matchIdx: number, 
    val: string, 
    teamNum: 1 | 2
  ) => {
    const parsed = val.trim() === "" ? null : parseInt(val, 10);
    const match = rounds[roundIdx].matches[matchIdx];
    
    if (teamNum === 1) {
      onMatchScoreChange(roundIdx, matchIdx, parsed, match.score2);
    } else {
      onMatchScoreChange(roundIdx, matchIdx, match.score1, parsed);
    }
  };

  // Build the list of matches to display based on filters and search queries
  const isSearchActive = searchQuery.trim() !== "";
  const displayMatches: FilteredMatchItem[] = [];

  if (isSearchActive) {
    // Global search across all rounds of the tournament
    rounds.forEach((round, roundIdx) => {
      round.matches.forEach((match, matchIdx) => {
        const matchesGroup = selectedGroup === "Todos" || match.group === selectedGroup;
        const matchesSearch = 
          match.team1.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          match.team2.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          match.team1.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          match.team2.code.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (matchesGroup && matchesSearch) {
          displayMatches.push({ match, roundIdx, matchIdx });
        }
      });
    });
  } else {
    // Standard view: filtered matches only in the currently selected round
    const currentRound = rounds[selectedRoundIdx];
    if (currentRound) {
      currentRound.matches.forEach((match, matchIdx) => {
        const matchesGroup = selectedGroup === "Todos" || match.group === selectedGroup;
        if (matchesGroup) {
          displayMatches.push({ match, roundIdx: selectedRoundIdx, matchIdx });
        }
      });
    }
  }

  return (
    <div className="w-full flex flex-col gap-6" id="match-center-container">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award size={18} className="text-gold-premium" />
          <h2 className="text-lg font-black uppercase tracking-wider text-white">
            Central de Partidas & Simulador
          </h2>
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest text-neon-green bg-neon-green/5 border border-neon-green/10 px-2 py-0.5 rounded">
          ALIVE RE-CALC
        </span>
      </div>

      {/* Control Bar (Round Tabs & Filters) */}
      <div className="glass-card rounded-2xl p-4 border border-white/5 flex flex-col gap-4">
        
        {/* Carousel / Dropdown Round Selector */}
        {!isSearchActive ? (
          <div className="flex items-center justify-between w-full max-w-md mx-auto py-1">
            {/* Back Button */}
            <button
              disabled={selectedRoundIdx === 0}
              onClick={() => setSelectedRoundIdx((prev) => prev - 1)}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:border-gold-premium/30 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              title="Rodada Anterior"
              id="btn-prev-round"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Styled Selector Dropdown */}
            <div className="relative flex-1 mx-3">
              <select
                value={selectedRoundIdx}
                onChange={(e) => setSelectedRoundIdx(parseInt(e.target.value, 10))}
                className="w-full bg-slate-950/80 border border-white/5 rounded-xl px-4 py-2.5 text-xs font-black text-center text-gold-premium tracking-widest uppercase hover:border-gold-premium/45 focus:outline-none focus:border-gold-premium transition-all appearance-none cursor-pointer pr-10"
                id="round-selector-dropdown"
              >
                {rounds.map((round, idx) => (
                  <option key={round.name} value={idx} className="bg-slate-950 text-white font-bold text-left">
                    {round.name}
                  </option>
                ))}
              </select>
              {/* Styled Arrow Icon */}
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <ChevronDown size={14} />
              </div>
            </div>

            {/* Next Button */}
            <button
              disabled={selectedRoundIdx === rounds.length - 1}
              onClick={() => setSelectedRoundIdx((prev) => prev + 1)}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:border-gold-premium/30 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              title="Próxima Rodada"
              id="btn-next-round"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        ) : (
          <div className="w-full max-w-md mx-auto text-center py-2">
            <span className="text-[10px] font-black tracking-widest text-gold-premium bg-gold-premium/5 border border-gold-premium/15 px-4 py-2 rounded-xl block">
              MOSTRANDO RESULTADOS DA BUSCA GLOBAL
            </span>
          </div>
        )}

        {/* Filter controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-white/5 pt-3">
          {/* Search Box */}
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 text-slate-500" size={15} />
            <input
              type="text"
              placeholder="Buscar seleção (busca global)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-premium/50 transition-all placeholder:text-slate-600"
              id="match-search"
            />
          </div>

          {/* Group Filter Selector */}
          <div className="relative">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full bg-slate-950/80 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-premium/50 transition-all cursor-pointer appearance-none"
              id="group-filter-select"
            >
              {groups.map((g) => (
                <option key={g} value={g} className="bg-slate-950 text-white">
                  {g === "Todos" ? "Todos os Grupos" : g}
                </option>
              ))}
            </select>
            {/* Group Arrow Icon */}
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              <ChevronDown size={14} />
            </div>
          </div>

          {/* Helper hint */}
          <div className="flex items-center justify-center md:justify-end text-[9px] font-black text-slate-500 tracking-wider uppercase">
            Altere os placares para simular a tabela
          </div>
        </div>
      </div>

      {/* Matches Grid */}
      {displayMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayMatches.map(({ match, roundIdx, matchIdx }) => (
            <div
              key={match.num || `${roundIdx}-${matchIdx}`}
              className="glass-card rounded-2xl p-5 border border-white/5 bg-slate-900/10 hover:border-gold-premium/20 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Header Info */}
              <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-black text-slate-500 tracking-widest uppercase border-b border-white/5 pb-2 mb-3">
                <span className="text-gold-premium">
                  {match.group ? `${match.group} • ${rounds[roundIdx].name}` : rounds[roundIdx].name}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={10} />
                  {match.date} &bull; {match.time}
                </span>
              </div>

              {/* Score Simulator Area */}
              <div className="flex items-center justify-between my-2">
                {/* Team 1 */}
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <MiniFlag code={match.team1.code} className="w-6 h-4.5" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-white uppercase tracking-wide truncate">
                      {match.team1.name}
                    </span>
                    <span className="text-[8px] font-black text-slate-500 tracking-wider uppercase leading-none">
                      {match.team1.code}
                    </span>
                  </div>
                </div>

                {/* Score inputs */}
                <div className="flex items-center gap-1.5 px-3">
                  <input
                    type="text"
                    maxLength={2}
                    value={match.score1 === null ? "" : match.score1}
                    onChange={(e) => handleScoreChange(roundIdx, matchIdx, e.target.value, 1)}
                    className="w-10 bg-slate-950/80 border border-white/5 rounded-lg text-center text-xs font-extrabold text-white py-1 focus:outline-none focus:border-neon-green/50 placeholder:text-slate-700"
                    placeholder="—"
                  />
                  <span className="text-slate-600 text-xs font-bold">:</span>
                  <input
                    type="text"
                    maxLength={2}
                    value={match.score2 === null ? "" : match.score2}
                    onChange={(e) => handleScoreChange(roundIdx, matchIdx, e.target.value, 2)}
                    className="w-10 bg-slate-950/80 border border-white/5 rounded-lg text-center text-xs font-extrabold text-white py-1 focus:outline-none focus:border-neon-green/50 placeholder:text-slate-700"
                    placeholder="—"
                  />
                </div>

                {/* Team 2 */}
                <div className="flex items-center gap-2.5 flex-1 min-w-0 justify-end text-right">
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-white uppercase tracking-wide truncate">
                      {match.team2.name}
                    </span>
                    <span className="text-[8px] font-black text-slate-500 tracking-wider uppercase leading-none">
                      {match.team2.code}
                    </span>
                  </div>
                  <MiniFlag code={match.team2.code} className="w-6 h-4.5" />
                </div>
              </div>

              {/* Card Footer Stadium */}
              {match.stadium && (
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-1.5 text-[8px] font-bold text-slate-500 uppercase tracking-wider">
                  <MapPin size={9} className="text-gold-premium" />
                  <span>{match.stadium.name}, {match.stadium.city}</span>
                </div>
              )}

            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-8 border border-white/5 text-center text-slate-500 text-xs uppercase tracking-widest">
          Nenhuma partida encontrada para os filtros.
        </div>
      )}

    </div>
  );
}

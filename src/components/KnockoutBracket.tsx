import { useState } from "react";
import { Round, Match } from "../types/worldcup";
import MiniFlag from "./MiniFlag";
import { Award, Calendar, MapPin, ChevronRight, Check } from "lucide-react";

interface KnockoutBracketProps {
  rounds: Round[];
  knockoutWinners: { [matchNum: number]: 1 | 2 };
  onMatchScoreChange: (roundIdx: number, matchIdx: number, s1: number | null, s2: number | null) => void;
  onSelectKnockoutWinner: (matchNum: number, winnerNum: 1 | 2) => void;
}

export default function KnockoutBracket({
  rounds,
  knockoutWinners,
  onMatchScoreChange,
  onSelectKnockoutWinner,
}: KnockoutBracketProps) {
  // Active sub-tab inside the bracket view (for responsive mobile switching)
  const [activeStage, setActiveStage] = useState<"R32" | "R16" | "QF" | "SF" | "F">("R32");

  const getRoundIdxAndMatchIdx = (matchNum: number): { rIdx: number; mIdx: number } => {
    for (let r = 0; r < rounds.length; r++) {
      const idx = rounds[r].matches.findIndex((m) => m.num === matchNum);
      if (idx !== -1) {
        return { rIdx: r, mIdx: idx };
      }
    }
    return { rIdx: -1, mIdx: -1 };
  };

  const handleScoreChange = (matchNum: number, val: string, teamNum: 1 | 2) => {
    const { rIdx, mIdx } = getRoundIdxAndMatchIdx(matchNum);
    if (rIdx === -1 || mIdx === -1) return;

    const parsed = val.trim() === "" ? null : parseInt(val, 10);
    const match = rounds[rIdx].matches[mIdx];

    if (teamNum === 1) {
      onMatchScoreChange(rIdx, mIdx, parsed, match.score2);
    } else {
      onMatchScoreChange(rIdx, mIdx, match.score1, parsed);
    }
  };

  // Filter matches belonging to each phase
  const getMatchesByNumRange = (start: number, end: number): Match[] => {
    const matches: Match[] = [];
    rounds.forEach((r) => {
      r.matches.forEach((m) => {
        if (m.num && m.num >= start && m.num <= end) {
          matches.push(m);
        }
      });
    });
    // Sort matches by num to ensure correct layout order
    return matches.sort((a, b) => (a.num || 0) - (b.num || 0));
  };

  const matchesR32 = getMatchesByNumRange(73, 88);
  const matchesR16 = getMatchesByNumRange(89, 96);
  const matchesQF = getMatchesByNumRange(97, 100);
  const matchesSF = getMatchesByNumRange(101, 102);
  const matchThird = getMatchesByNumRange(103, 103)[0];
  const matchFinal = getMatchesByNumRange(104, 104)[0];

  // Helper to check if a team is a placeholder
  const isPlaceholder = (code: string) => {
    return code.startsWith("W") || code.startsWith("L") || code.includes("UNK") || code.includes("3RD");
  };

  // Helper to render a match card in the bracket
  const renderMatchCard = (match: Match) => {
    if (!match) return null;
    const mNum = match.num || 0;
    const isDraw = match.score1 !== null && match.score2 !== null && match.score1 === match.score2;
    const penWinner = knockoutWinners[mNum] || 1; // Defaults to team 1

    const isTeam1Winner =
      match.score1 !== null &&
      match.score2 !== null &&
      (match.score1 > match.score2 || (isDraw && penWinner === 1));

    const isTeam2Winner =
      match.score1 !== null &&
      match.score2 !== null &&
      (match.score2 > match.score1 || (isDraw && penWinner === 2));

    return (
      <div
        key={mNum}
        className="glass-card rounded-2xl p-4 border border-white/5 bg-slate-900/10 hover:border-gold-premium/20 transition-all duration-300 w-full max-w-[280px] shrink-0 text-left relative flex flex-col justify-between shadow-md"
      >
        {/* Card Header */}
        <div className="flex justify-between items-center text-[7px] font-black text-slate-500 tracking-wider uppercase border-b border-white/5 pb-1.5 mb-2.5">
          <span className="text-gold-premium font-black">JOGO {mNum}</span>
          <span className="truncate max-w-[120px]">{match.date} &bull; {match.time}</span>
        </div>

        {/* Teams Area */}
        <div className="flex flex-col gap-2">
          {/* Team 1 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <MiniFlag code={match.team1.code} className="w-5 h-3.5 shrink-0" />
              <span
                className={`text-xs font-bold truncate uppercase tracking-wide ${
                  isPlaceholder(match.team1.code)
                    ? "text-slate-500 font-normal italic"
                    : isTeam1Winner
                    ? "text-white glow-text-gold font-extrabold"
                    : "text-slate-400"
                }`}
                title={match.team1.name}
              >
                {match.team1.name}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5">
              {isDraw && (
                <button
                  onClick={() => onSelectKnockoutWinner(mNum, 1)}
                  className={`w-4 h-4 rounded flex items-center justify-center border text-[8px] font-black transition-all cursor-pointer ${
                    penWinner === 1
                      ? "bg-gold-premium border-gold-premium text-slate-950 shadow-md"
                      : "border-white/10 hover:border-gold-premium/40 text-slate-400"
                  }`}
                  title="Marcar como vencedor por Pênaltis"
                >
                  <Check size={8} strokeWidth={3} />
                </button>
              )}
              <input
                type="text"
                maxLength={2}
                value={match.score1 === null ? "" : match.score1}
                onChange={(e) => handleScoreChange(mNum, e.target.value, 1)}
                className="w-8 bg-slate-950/80 border border-white/5 rounded text-center text-xs font-black text-white py-0.5 focus:outline-none focus:border-neon-green/50 placeholder:text-slate-800"
                placeholder="—"
              />
            </div>
          </div>

          {/* Team 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <MiniFlag code={match.team2.code} className="w-5 h-3.5 shrink-0" />
              <span
                className={`text-xs font-bold truncate uppercase tracking-wide ${
                  isPlaceholder(match.team2.code)
                    ? "text-slate-500 font-normal italic"
                    : isTeam2Winner
                    ? "text-white glow-text-gold font-extrabold"
                    : "text-slate-400"
                }`}
                title={match.team2.name}
              >
                {match.team2.name}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {isDraw && (
                <button
                  onClick={() => onSelectKnockoutWinner(mNum, 2)}
                  className={`w-4 h-4 rounded flex items-center justify-center border text-[8px] font-black transition-all cursor-pointer ${
                    penWinner === 2
                      ? "bg-gold-premium border-gold-premium text-slate-950 shadow-md"
                      : "border-white/10 hover:border-gold-premium/40 text-slate-400"
                  }`}
                  title="Marcar como vencedor por Pênaltis"
                >
                  <Check size={8} strokeWidth={3} />
                </button>
              )}
              <input
                type="text"
                maxLength={2}
                value={match.score2 === null ? "" : match.score2}
                onChange={(e) => handleScoreChange(mNum, e.target.value, 2)}
                className="w-8 bg-slate-950/80 border border-white/5 rounded text-center text-xs font-black text-white py-0.5 focus:outline-none focus:border-neon-green/50 placeholder:text-slate-800"
                placeholder="—"
              />
            </div>
          </div>
        </div>

        {/* Stadium Info */}
        {match.stadium && (
          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center gap-1 text-[7px] font-bold text-slate-500 uppercase tracking-wider">
            <MapPin size={8} className="text-gold-premium shrink-0" />
            <span className="truncate">{match.stadium.city}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-6" id="knockout-bracket-container">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award size={18} className="text-gold-premium" />
          <h2 className="text-lg font-black uppercase tracking-wider text-white">
            Chaves do Mata-Mata (Segunda Fase)
          </h2>
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
          32 SELEÇÕES &bull; SIMULAÇÃO DIRETA
        </span>
      </div>

      {/* Stage switches (For responsiveness) */}
      <div className="flex flex-wrap p-1 bg-slate-900/60 border border-white/5 rounded-2xl relative shadow-inner w-full max-w-lg mx-auto">
        {[
          { id: "R32", label: "R32" },
          { id: "R16", label: "Oitavas" },
          { id: "QF", label: "Quartas" },
          { id: "SF", label: "Semis" },
          { id: "F", label: "Finais" },
        ].map((stage) => (
          <button
            key={stage.id}
            onClick={() => setActiveStage(stage.id as any)}
            className={`flex-1 text-center py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeStage === stage.id
                ? "bg-gold-premium text-slate-950 shadow-md font-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {stage.label}
          </button>
        ))}
      </div>

      {/* Responsive View Switcher */}
      <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-800">
        
        {/* 1. Mobile Stage View */}
        <div className="md:hidden flex flex-col items-center gap-4 py-2">
          {activeStage === "R32" && (
            <div className="flex flex-col gap-4 w-full items-center">
              <h3 className="text-xs font-black tracking-widest uppercase text-gold-premium mb-1">Dezesseis-avos de Final (32 Times)</h3>
              {matchesR32.map((m) => renderMatchCard(m))}
            </div>
          )}
          {activeStage === "R16" && (
            <div className="flex flex-col gap-4 w-full items-center">
              <h3 className="text-xs font-black tracking-widest uppercase text-gold-premium mb-1">Oitavas de Final</h3>
              {matchesR16.map((m) => renderMatchCard(m))}
            </div>
          )}
          {activeStage === "QF" && (
            <div className="flex flex-col gap-4 w-full items-center">
              <h3 className="text-xs font-black tracking-widest uppercase text-gold-premium mb-1">Quartas de Final</h3>
              {matchesQF.map((m) => renderMatchCard(m))}
            </div>
          )}
          {activeStage === "SF" && (
            <div className="flex flex-col gap-4 w-full items-center">
              <h3 className="text-xs font-black tracking-widest uppercase text-gold-premium mb-1">Semifinais</h3>
              {matchesSF.map((m) => renderMatchCard(m))}
            </div>
          )}
          {activeStage === "F" && (
            <div className="flex flex-col gap-4 w-full items-center">
              <h3 className="text-xs font-black tracking-widest uppercase text-gold-premium mb-1">Decisão do 3º Lugar & Grande Final</h3>
              {matchThird && renderMatchCard(matchThird)}
              {matchFinal && (
                <div className="border border-gold-premium/40 rounded-3xl p-1 bg-gold-premium/5 mt-2">
                  <span className="text-[8px] font-black text-center text-gold-premium block py-1 uppercase tracking-widest">
                    Grande Final
                  </span>
                  {renderMatchCard(matchFinal)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 2. Desktop Full Bracket Tree View */}
        <div className="hidden md:flex justify-between gap-6 min-w-[1200px] px-4 py-6 relative">
          
          {/* Round of 32 Column */}
          <div className="flex flex-col justify-around gap-4 w-64">
            <div className="text-center pb-2 border-b border-white/5">
              <h3 className="text-[10px] font-black text-white tracking-widest uppercase">Round of 32</h3>
            </div>
            {matchesR32.map((m) => renderMatchCard(m))}
          </div>

          {/* Round of 16 Column */}
          <div className="flex flex-col justify-around gap-4 w-64">
            <div className="text-center pb-2 border-b border-white/5">
              <h3 className="text-[10px] font-black text-white tracking-widest uppercase">Oitavas de Final</h3>
            </div>
            {matchesR16.map((m) => renderMatchCard(m))}
          </div>

          {/* Quarter-finals Column */}
          <div className="flex flex-col justify-around gap-4 w-64">
            <div className="text-center pb-2 border-b border-white/5">
              <h3 className="text-[10px] font-black text-white tracking-widest uppercase">Quartas de Final</h3>
            </div>
            {matchesQF.map((m) => renderMatchCard(m))}
          </div>

          {/* Semi-finals Column */}
          <div className="flex flex-col justify-around gap-4 w-64">
            <div className="text-center pb-2 border-b border-white/5">
              <h3 className="text-[10px] font-black text-white tracking-widest uppercase">Semifinais</h3>
            </div>
            {matchesSF.map((m) => renderMatchCard(m))}
          </div>

          {/* Finals Column (Final and 3rd Place) */}
          <div className="flex flex-col justify-around gap-6 w-64">
            <div className="flex flex-col gap-4">
              <div className="text-center pb-2 border-b border-white/5">
                <h3 className="text-[10px] font-black text-gold-premium tracking-widest uppercase">Decisão 3º Lugar</h3>
              </div>
              {matchThird && renderMatchCard(matchThird)}
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-center pb-2 border-b border-gold-premium/20">
                <h3 className="text-[10px] font-black text-gold-premium tracking-widest uppercase flex items-center justify-center gap-1">
                  <Award size={10} />
                  Grande Final
                </h3>
              </div>
              {matchFinal && (
                <div className="border border-gold-premium/40 rounded-3xl p-1 bg-gold-premium/5">
                  {renderMatchCard(matchFinal)}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      <div className="glass-card rounded-2xl p-4 border border-white/5 text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-gold-premium inline-block"></span>
        <span>
          Em caso de empate nas chaves do mata-mata, clique no botão <strong>✓</strong> do lado do placar para definir qual time passa na disputa de pênaltis.
        </span>
      </div>

    </div>
  );
}

import { useState } from "react";
import { GroupStandings } from "../utils/standingsCalculator";
import MiniFlag from "./MiniFlag";
import { ChevronRight, AwardIcon } from "lucide-react";

interface StandingsGridProps {
  standings: GroupStandings;
}

export default function StandingsGrid({ standings }: StandingsGridProps) {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  // Get sorted list of groups A to L
  const groupNames = Object.keys(standings).sort((a, b) => a.localeCompare(b));

  return (
    <div className="w-full flex flex-col gap-6" id="standings-grid-container">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AwardIcon size={18} className="text-gold-premium" />
          <h2 className="text-lg font-black uppercase tracking-wider text-white">
            Classificação das Chaves (Bento Grid)
          </h2>
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
          12 GRUPOS &bull; 2 SEDES DE CLASSIFICAÇÃO
        </span>
      </div>

      {/* Grid Layout of Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {groupNames.map((groupName) => {
          const teamsStats = standings[groupName];

          return (
            <div
              key={groupName}
              onClick={() => setSelectedGroup(selectedGroup === groupName ? null : groupName)}
              className={`glass-card rounded-2xl p-5 border transition-all duration-300 cursor-pointer ${
                selectedGroup === groupName
                  ? "border-neon-green/30 bg-slate-900/40 shadow-[0_15px_30px_rgba(0,255,135,0.08)]"
                  : "border-white/5 bg-slate-900/10 hover:border-white/10"
              }`}
            >
              {/* Group Header */}
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                <span className="text-xs font-black tracking-widest uppercase text-white">
                  {groupName}
                </span>
                <span className="text-[8px] font-black tracking-wider text-gold-premium bg-gold-premium/5 border border-gold-premium/10 px-2 py-0.5 rounded">
                  GARANTIDOS NO TOP 2
                </span>
              </div>

              {/* Standings Table */}
              <div className="flex flex-col gap-3">
                {/* Table Header */}
                <div className="flex justify-between items-center text-[7px] font-black text-slate-600 tracking-wider uppercase mb-1 px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-4 text-center">POS</span>
                    <span>SELEÇÃO</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-4 text-center">J</span>
                    <span className="w-4 text-center">SG</span>
                    <span className="w-6 text-center">PTS</span>
                  </div>
                </div>

                {/* Table Rows */}
                {teamsStats.map((stat, idx) => {
                  const isQualified = idx < 2; // Top 2 qualify
                  
                  return (
                    <div
                      key={stat.team.code}
                      className="flex justify-between items-center py-0.5 px-1 rounded transition-colors"
                    >
                      {/* Left: Position and Name */}
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Position Indicator dot & index */}
                        <div className="flex items-center gap-1.5 w-4 justify-center">
                          <span className={`text-[9px] font-extrabold tabular-nums ${isQualified ? "text-neon-green" : "text-slate-500"}`}>
                            {idx + 1}
                          </span>
                        </div>
                        
                        <MiniFlag code={stat.team.code} className="w-5 h-3.5" />
                        
                        <span className="text-xs font-bold text-white uppercase tracking-wide truncate">
                          {stat.team.name}
                        </span>
                      </div>

                      {/* Right: Stats values */}
                      <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 tabular-nums">
                        <span className="w-4 text-center">{stat.played}</span>
                        <span className={`w-4 text-center ${stat.goalDifference > 0 ? "text-neon-green" : stat.goalDifference < 0 ? "text-red-500/80" : ""}`}>
                          {stat.goalDifference > 0 ? `+${stat.goalDifference}` : stat.goalDifference}
                        </span>
                        <span className={`w-6 text-center text-xs font-black ${isQualified ? "text-white glow-text-gold" : "text-slate-400"}`}>
                          {stat.points}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Micro details at bottom */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[8px] font-black text-slate-500 tracking-widest uppercase">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-green inline-block animate-pulse"></span>
                  Garantido playoffs
                </span>
                <ChevronRight size={10} className="text-slate-400" />
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useState, useMemo } from "react";
import MiniFlag from "./MiniFlag";
import { Award, Search, Star, Footprints, Flame } from "lucide-react";

interface PlayerScorer {
  rank: number;
  name: string;
  teamName: string;
  teamCode: string;
  goals: number;
  assists: number;
  played: number;
  penalties: number;
  position: string;
}

export default function TopScorers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubTab, setActiveSubTab] = useState<"goals" | "assists">("goals");

  const scorersList: PlayerScorer[] = [
    { rank: 1, name: "Kylian Mbappé", teamName: "França", teamCode: "FRA", goals: 8, assists: 3, played: 7, penalties: 2, position: "Atacante" },
    { rank: 2, name: "Vinícius Júnior", teamName: "Brasil", teamCode: "BRA", goals: 7, assists: 4, played: 7, penalties: 1, position: "Atacante" },
    { rank: 3, name: "Jude Bellingham", teamName: "Inglaterra", teamCode: "ENG", goals: 6, assists: 3, played: 6, penalties: 0, position: "Meia" },
    { rank: 4, name: "Lionel Messi", teamName: "Argentina", teamCode: "ARG", goals: 5, assists: 4, played: 6, penalties: 2, position: "Atacante" },
    { rank: 5, name: "Cristiano Ronaldo", teamName: "Portugal", teamCode: "POR", goals: 5, assists: 1, played: 5, penalties: 1, position: "Atacante" },
    { rank: 6, name: "Jamal Musiala", teamName: "Alemanha", teamCode: "GER", goals: 4, assists: 3, played: 5, penalties: 0, position: "Meia" },
    { rank: 7, name: "Darwin Núñez", teamName: "Uruguai", teamCode: "URU", goals: 4, assists: 2, played: 5, penalties: 0, position: "Atacante" },
    { rank: 8, name: "Luis Díaz", teamName: "Colômbia", teamCode: "COL", goals: 4, assists: 1, played: 6, penalties: 0, position: "Atacante" },
    { rank: 9, name: "Christian Pulisic", teamName: "Estados Unidos", teamCode: "USA", goals: 3, assists: 3, played: 4, penalties: 1, position: "Atacante" },
    { rank: 10, name: "Pedri", teamName: "Espanha", teamCode: "ESP", goals: 3, assists: 5, played: 6, penalties: 0, position: "Meia" },
    { rank: 11, name: "Lautaro Martínez", teamName: "Argentina", teamCode: "ARG", goals: 3, assists: 1, played: 6, penalties: 0, position: "Atacante" },
    { rank: 12, name: "Cody Gakpo", teamName: "Holanda", teamCode: "NED", goals: 3, assists: 2, played: 5, penalties: 0, position: "Atacante" },
  ];

  // Sort list for assists tab
  const assistsList = useMemo(() => {
    return [...scorersList]
      .sort((a, b) => {
        if (b.assists !== a.assists) return b.assists - a.assists;
        return b.goals - a.goals;
      })
      .map((player, index) => ({
        ...player,
        rank: index + 1,
      }));
  }, []);

  const currentList = activeSubTab === "goals" ? scorersList : assistsList;

  const filteredPlayers = useMemo(() => {
    return currentList.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.teamName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currentList, searchQuery]);

  return (
    <div className="w-full flex flex-col gap-6" id="top-scorers-container">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award size={18} className="text-gold-premium" />
          <h2 className="text-lg font-black uppercase tracking-wider text-white">
            Artilharia & Assistências
          </h2>
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
          LÍDERES DE PERFORMANCE
        </span>
      </div>

      {/* Control / Filter Bar */}
      <div className="glass-card rounded-2xl p-4 border border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Sub-tabs switch */}
        <div className="flex p-1 bg-slate-950 border border-white/5 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveSubTab("goals")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeSubTab === "goals"
                ? "bg-gold-premium text-slate-950 font-black shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Flame size={13} />
            Gols
          </button>
          <button
            onClick={() => setActiveSubTab("assists")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeSubTab === "assists"
                ? "bg-gold-premium text-slate-950 font-black shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Footprints size={13} />
            Assistências
          </button>
        </div>

        {/* Search */}
        <div className="relative flex items-center w-full sm:w-64">
          <Search className="absolute left-3 text-slate-500" size={14} />
          <input
            type="text"
            placeholder="Buscar jogador ou país..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-white/5 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-gold-premium/50 transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Scorers Grid & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top 3 Visual Highlights */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <h3 className="text-xs font-black tracking-widest uppercase text-slate-400">
            Destaques de Elite
          </h3>

          <div className="flex flex-col gap-4">
            {filteredPlayers.slice(0, 3).map((player, idx) => (
              <div
                key={player.name}
                className="glass-card rounded-2xl p-4 border border-white/5 bg-slate-900/10 hover:border-gold-premium/30 transition-all duration-300 relative overflow-hidden flex items-center gap-4"
              >
                {/* Visual rank circle */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                  idx === 0 
                    ? "bg-gold-premium/10 border-gold-premium/30 text-gold-premium shadow-[0_0_15px_rgba(229,184,66,0.15)]"
                    : idx === 1
                    ? "bg-slate-300/10 border-slate-300/20 text-slate-300"
                    : "bg-amber-600/10 border-amber-600/20 text-amber-600"
                }`}>
                  <Star size={20} className={idx === 0 ? "fill-gold-premium/20 animate-pulse" : ""} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <MiniFlag code={player.teamCode} className="w-5 h-3.5" />
                    <span className="text-[8px] font-black text-slate-500 tracking-wider uppercase">
                      {player.teamName} &bull; {player.position}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wide truncate mt-0.5">
                    {player.name}
                  </h4>
                </div>

                <div className="text-right">
                  <span className="text-xl font-black text-white glow-text-gold tabular-nums block leading-none">
                    {activeSubTab === "goals" ? player.goals : player.assists}
                  </span>
                  <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest block mt-0.5">
                    {activeSubTab === "goals" ? "Gols" : "Assistências"}
                  </span>
                </div>
              </div>
            ))}

            {filteredPlayers.length === 0 && (
              <div className="glass-card rounded-2xl p-6 border border-white/5 text-center text-slate-500 text-xs uppercase tracking-widest">
                Nenhum jogador correspondente.
              </div>
            )}
          </div>
        </div>

        {/* Full Stats Table */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-5 border border-white/5 bg-slate-900/10 flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[8px] font-black text-slate-600 tracking-widest uppercase">
                  <th className="pb-3 pl-2 w-10 text-center">POS</th>
                  <th className="pb-3 pl-2">JOGADOR</th>
                  <th className="pb-3 text-center w-14">JOGOS</th>
                  <th className="pb-3 text-center w-14">ASSIST.</th>
                  <th className="pb-3 text-center w-14">PÊNALTIS</th>
                  <th className="pb-3 text-right pr-4 w-16">GOLS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPlayers.map((player) => (
                  <tr
                    key={player.name}
                    className="hover:bg-white/[0.02] transition-colors text-xs font-bold text-slate-300 uppercase tracking-wide"
                  >
                    {/* Rank */}
                    <td className="py-3 text-center tabular-nums text-slate-500 font-extrabold">
                      #{player.rank}
                    </td>
                    
                    {/* Player Info */}
                    <td className="py-3 pl-2">
                      <div className="flex items-center gap-3">
                        <MiniFlag code={player.teamCode} className="w-5.5 h-4 shadow-sm" />
                        <div className="flex flex-col">
                          <span className="text-white font-extrabold tracking-wide">{player.name}</span>
                          <span className="text-[7.5px] font-black text-slate-500 tracking-wider uppercase mt-0.5">
                            {player.teamName} &bull; {player.position}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Games Played */}
                    <td className="py-3 text-center tabular-nums text-slate-400">
                      {player.played}
                    </td>

                    {/* Assists */}
                    <td className={`py-3 text-center tabular-nums ${activeSubTab === "assists" ? "text-white font-black" : "text-slate-400"}`}>
                      {player.assists}
                    </td>

                    {/* Penalty Goals */}
                    <td className="py-3 text-center tabular-nums text-slate-400">
                      {player.penalties}
                    </td>

                    {/* Total Goals */}
                    <td className={`py-3 text-right pr-4 tabular-nums text-sm ${activeSubTab === "goals" ? "text-white glow-text-gold font-black" : "text-slate-400"}`}>
                      {player.goals}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredPlayers.length === 0 && (
              <div className="py-8 text-center text-slate-500 text-xs uppercase tracking-widest">
                Nenhum resultado para exibir.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

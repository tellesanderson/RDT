import React, { useState } from "react";
import { CLUBS, Club } from "../mocks/clubs";
import { ClubBadge } from "./ClubBadge";
import { Search, Trophy, Users, Star } from "lucide-react";

interface ClubSelectorProps {
  onSelect: (club: Club) => void;
  currentClubId?: string;
}

type FilterRegion = "all" | "sp" | "rj" | "mg" | "other";

const getClubRegion = (id: string): FilterRegion => {
  if (["cor", "pal", "sao", "san"].includes(id)) return "sp";
  if (["fla", "vas", "bot", "flu"].includes(id)) return "rj";
  if (["cam", "cru"].includes(id)) return "mg";
  return "other";
};

const getActiveUsers = (id: string): string => {
  const counts: Record<string, string> = {
    fla: "48.2k", cor: "42.1k", pal: "35.8k", sao: "31.4k",
    vas: "28.5k", gre: "24.1k", int: "22.9k", cam: "21.6k",
    cru: "20.3k", san: "18.5k", bot: "17.9k", flu: "16.8k",
    cap: "14.2k", cfc: "11.5k", bah: "15.7k", for: "13.9k"
  };
  return counts[id] || "10.0k";
};

export const ClubSelector: React.FC<ClubSelectorProps> = ({ onSelect, currentClubId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRegion, setActiveRegion] = useState<FilterRegion>("all");

  const filteredClubs = CLUBS.filter((club) => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.shortName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = activeRegion === "all" || getClubRegion(club.id) === activeRegion;
    
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 flex flex-col items-center">
      {/* Header Info */}
      <div className="text-center mb-6 animate-fade-in">
        <div className="inline-flex items-center justify-center p-3.5 rounded-full bg-slate-900/80 border border-slate-800 text-yellow-500 mb-3 shadow-lg shadow-yellow-500/10">
          <Trophy size={32} className="animate-pulse text-yellow-400" />
        </div>
        <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          Radar da Torcida
        </h1>
        <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto font-medium">
          Escolha seu time do coração para ver placares, cornetar a rodada e debater com outros torcedores.
        </p>
      </div>

      {/* Search Bar */}
      <div className="w-full relative mb-4">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
          <Search size={16} />
        </span>
        <input
          type="text"
          placeholder="Buscar seu time..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-white/5 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-700 focus:border-slate-600 transition-all text-xs font-semibold"
        />
      </div>

      {/* Filter Tags */}
      <div className="w-full flex gap-1.5 overflow-x-auto pb-4 scrollbar-none snap-x">
        {(
          [
            { id: "all", label: "Todos" },
            { id: "sp", label: "São Paulo" },
            { id: "rj", label: "Rio" },
            { id: "mg", label: "Minas" },
            { id: "other", label: "Outros" }
          ] as const
        ).map((region) => (
          <button
            key={region.id}
            onClick={() => setActiveRegion(region.id)}
            className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 border snap-center ${
              activeRegion === region.id
                ? "bg-slate-100 text-slate-950 border-white shadow-md shadow-white/5 scale-102"
                : "bg-slate-950/60 text-slate-400 border-white/5 hover:text-white hover:bg-slate-900"
            }`}
          >
            {region.label}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <div className="w-full grid grid-cols-2 gap-3.5 max-h-[360px] overflow-y-auto pr-1 pb-4">
        {filteredClubs.length > 0 ? (
          filteredClubs.map((club) => {
            const isSelected = currentClubId === club.id;
            return (
              <button
                key={club.id}
                onClick={() => onSelect(club)}
                className={`flex flex-col items-center justify-center p-4 rounded-3xl glass-card glass-card-hover transition-all duration-300 relative overflow-hidden group active:scale-97 border ${
                  isSelected
                    ? "border-transparent"
                    : "border-white/5"
                }`}
                style={{
                  boxShadow: isSelected
                    ? `0 10px 25px -5px ${club.primaryColor}40, 0 0 0 2px ${club.primaryColor}`
                    : "none"
                }}
              >
                {/* Background Accent glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: club.primaryColor }}
                />

                <ClubBadge
                  clubId={club.id}
                  size={52}
                  className="mb-2 transform group-hover:scale-108 transition-transform duration-300 filter drop-shadow-md"
                />
                
                <span className="text-xs font-black text-white text-center tracking-wide block truncate w-full group-hover:text-slate-100">
                  {club.name}
                </span>
                
                <span className="text-[9px] text-slate-400 font-bold mt-0.5 tracking-widest uppercase opacity-80">
                  {club.shortName}
                </span>

                {/* Active users statistic */}
                <div className="flex items-center gap-1 mt-2 text-[9px] text-slate-500 font-bold tracking-tight">
                  <Users size={10} className="text-slate-600" />
                  <span>{getActiveUsers(club.id)} ativos</span>
                </div>

                {isSelected && (
                  <div
                    className="absolute top-3 right-3 w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: club.accentColor, boxShadow: `0 0 8px ${club.accentColor}` }}
                  />
                )}
              </button>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-10 text-slate-500 text-xs font-bold uppercase tracking-wider">
            Nenhum clube encontrado.
          </div>
        )}
      </div>
    </div>
  );
};


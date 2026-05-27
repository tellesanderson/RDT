"use client";

import React, { useState, useEffect } from "react";
import { CLUBS, Club, getClubById } from "../mocks/clubs";
import { getMatchDataForClub } from "../mocks/matchGenerator";
import { MatchData } from "../mocks/mockData";
import { ClubSelector } from "../components/ClubSelector";
import { MatchSummaryCard } from "../components/MatchSummaryCard";
import { WhereToWatchBadge } from "../components/WhereToWatchBadge";
import { FanRatings } from "../components/FanRatings";
import { ClubBadge } from "../components/ClubBadge";
import { Settings, ShieldAlert, Award, MessageSquareText, Radio, Info, ChevronRight, Heart } from "lucide-react";

export default function Home() {
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [showClubSelector, setShowClubSelector] = useState(true);
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [activeTab, setActiveTab] = useState<"resumo" | "corneta">("resumo");
  const [isClient, setIsClient] = useState(false);

  // Mark client hydration complete
  useEffect(() => {
    setIsClient(true);
    const savedClubId = localStorage.getItem("favorite_club_id");
    if (savedClubId) {
      const club = getClubById(savedClubId);
      if (club) {
        setSelectedClub(club);
        setShowClubSelector(false);
        setMatchData(getMatchDataForClub(club.id));
        applyTheme(club);
      }
    }
  }, []);

  const applyTheme = (club: Club) => {
    const root = document.documentElement;
    root.style.setProperty("--club-primary", club.primaryColor);
    root.style.setProperty("--club-secondary", club.secondaryColor);
    root.style.setProperty("--club-text", club.textColor);
    root.style.setProperty("--club-accent", club.accentColor);
    root.style.setProperty("--club-accent-glow", `${club.accentColor}26`);
  };

  const handleSelectClub = (club: Club) => {
    setSelectedClub(club);
    localStorage.setItem("favorite_club_id", club.id);
    setMatchData(getMatchDataForClub(club.id));
    applyTheme(club);
    setShowClubSelector(false);
  };

  const getOpponentClub = (): Club => {
    if (!selectedClub || !matchData) return CLUBS[0];
    const opponentShort = matchData.teams.home.short_name === selectedClub.shortName
      ? matchData.teams.away.short_name
      : matchData.teams.home.short_name;
    return CLUBS.find(c => c.shortName === opponentShort) || CLUBS[0];
  };

  // Safe client-side rendering container check
  if (!isClient) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#06070a] text-white">
        <div className="w-8 h-8 border-4 border-slate-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Next Saturday 16:00
  const getNextMatchDate = () => {
    const today = new Date();
    const nextSaturday = new Date(today);
    nextSaturday.setDate(today.getDate() + ((6 - today.getDay() + 7) % 7 || 7));
    nextSaturday.setHours(16, 0, 0, 0);

    const formatter = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });

    const matchDateStr = formatter.format(nextSaturday);
    return {
      str: matchDateStr.charAt(0).toUpperCase() + matchDateStr.slice(1),
      iso: nextSaturday.toISOString()
    };
  };

  const nextMatch = getNextMatchDate();

  return (
    <div className="flex-1 flex flex-col bg-[#06070a] text-slate-100 min-h-screen">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 glass-panel border-b border-white/5 px-4 py-3.5 flex items-center justify-between">
        <div 
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => setShowClubSelector(true)}
        >
          {selectedClub ? (
            <div className="flex items-center gap-2 bg-slate-950/60 border border-white/5 pl-2 pr-3 py-1 rounded-2xl shadow-inner group-hover:border-slate-800 transition-all duration-300">
              <ClubBadge 
                clubId={selectedClub.id} 
                size={26} 
                className="transform group-hover:scale-105 transition-transform duration-300 filter drop-shadow-sm" 
              />
              <div className="text-left">
                <h2 className="text-xs font-black text-white tracking-wide leading-none group-hover:text-club-accent transition-colors">
                  {selectedClub.name}
                </h2>
                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block mt-0.5">
                  Time do Coração
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-black shadow-md">⚽</div>
              <div className="text-left">
                <h2 className="text-xs font-black text-white tracking-wide leading-none">
                  Radar da Torcida
                </h2>
                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block mt-0.5">
                  A Voz da Arquibancada
                </span>
              </div>
            </div>
          )}
        </div>

        {selectedClub && (
          <button
            onClick={() => setShowClubSelector(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 border border-white/5 hover:bg-slate-900 transition-colors text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-wider cursor-pointer"
            title="Alterar time do coração"
          >
            <Heart size={12} className="text-rose-500 fill-rose-500/20" />
            <span>Trocar Time</span>
          </button>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-5 flex flex-col gap-5">
        {showClubSelector ? (
          <div className="animate-fade-in flex flex-col gap-2">
            <ClubSelector onSelect={handleSelectClub} currentClubId={selectedClub?.id} />
          </div>
        ) : selectedClub && matchData ? (
          <>
            {/* Tab Selector */}
            <div className="flex p-1.5 bg-slate-950 border border-white/5 rounded-2xl relative shadow-inner">
              <button
                onClick={() => setActiveTab("resumo")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 relative z-10 cursor-pointer ${
                  activeTab === "resumo"
                    ? "bg-club-primary text-white shadow-lg shadow-club-primary/25 border border-white/10"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Radio size={13} className={activeTab === "resumo" ? "animate-pulse" : ""} />
                Último Jogo
              </button>
              <button
                onClick={() => setActiveTab("corneta")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 relative z-10 cursor-pointer ${
                  activeTab === "corneta"
                    ? "bg-club-primary text-white shadow-lg shadow-club-primary/25 border border-white/10"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <MessageSquareText size={13} />
                Corneta
              </button>
            </div>

            {/* Content Areas */}
            {activeTab === "resumo" ? (
              <div className="flex flex-col gap-5 animate-fade-in">
                {/* 1. Módulo: Resumo em 1 Minuto */}
                <MatchSummaryCard data={matchData} selectedClubId={selectedClub.id} />

                {/* 3. Módulo: Onde Assistir */}
                <WhereToWatchBadge
                  currentClub={selectedClub}
                  opponent={getOpponentClub()}
                  matchDateStr={nextMatch.str}
                  dateISO={nextMatch.iso}
                  channels={matchData.onde_assistir.map(c => c.platform_name)}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-5 animate-fade-in">
                {/* 2. Módulo: Central da Corneta, Mural & Enquete */}
                <FanRatings
                  matchData={matchData}
                  currentClub={selectedClub}
                  onVoteSubmitted={() => {
                    setMatchData(getMatchDataForClub(selectedClub.id));
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-20 animate-fade-in">
            <Info size={36} className="text-slate-600 mb-4" />
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Nenhum clube selecionado</h3>
            <button
              onClick={() => setShowClubSelector(true)}
              className="mt-4 px-6 py-3 bg-slate-950 border border-white/5 text-[11px] font-black uppercase tracking-wider rounded-2xl text-white hover:bg-slate-900 transition-all cursor-pointer"
            >
              Escolher Time
            </button>
          </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="py-8 text-center text-[9px] font-black text-slate-600 uppercase tracking-widest border-t border-white/5 mt-auto bg-slate-950/20">
        Radar da Torcida &copy; {new Date().getFullYear()} &bull; Desenvolvido para Torcedores
      </footer>
    </div>
  );
}

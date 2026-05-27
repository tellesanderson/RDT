import React, { useState } from "react";
import { Club } from "../mocks/clubs";
import { ClubBadge } from "./ClubBadge";
import { Calendar, Play, Tv, Check, MapPin } from "lucide-react";

interface WhereToWatchBadgeProps {
  currentClub: Club;
  opponent: Club;
  matchDateStr: string; // e.g. "Sábado, 30/05/2026 às 16:00"
  dateISO: string;      // e.g. "2026-05-30T16:00:00"
  channels: string[];   // e.g. ["Premiere", "Globo", "CazéTV"]
}

const getStadiumName = (clubId: string): string => {
  const stadiums: Record<string, string> = {
    fla: "Maracanã", cor: "Neo Química Arena", pal: "Allianz Parque",
    sao: "MorumBIS", vas: "São Januário", gre: "Arena do Grêmio",
    int: "Beira-Rio", cam: "Arena MRV", cru: "Mineirão",
    san: "Vila Belmiro", bot: "Estádio Nilton Santos", flu: "Maracanã",
    cap: "Ligga Arena", cfc: "Couto Pereira", bah: "Arena Fonte Nova",
    for: "Arena Castelão"
  };
  return stadiums[clubId] || "Estádio Nacional";
};

export const WhereToWatchBadge: React.FC<WhereToWatchBadgeProps> = ({
  currentClub,
  opponent,
  matchDateStr,
  dateISO,
  channels
}) => {
  const [addedToCalendar, setAddedToCalendar] = useState(false);
  
  const stadium = getStadiumName(currentClub.id);

  const generateICS = () => {
    // 2 hours match duration
    const startDate = new Date(dateISO);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const formatICSDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const description = `Acompanhe o jogo ${currentClub.name} x ${opponent.name} ao vivo! Transmissão programada para: ${channels.join(", ")}. Gerado pelo Radar da Torcida.`;
    const summary = `⚽ ${currentClub.shortName} x ${opponent.shortName} - Brasileirão`;

    const calendarEvent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Radar da Torcida//NONSGML Calendar Event//PT-BR",
      "BEGIN:VEVENT",
      `UID:match_${currentClub.id}_${opponent.id}_${startDate.getTime()}`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${stadium}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([calendarEvent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `jogo_${currentClub.shortName}_x_${opponent.shortName}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCalendarClick = () => {
    generateICS();
    setAddedToCalendar(true);
    setTimeout(() => {
      setAddedToCalendar(false);
    }, 2500);
  };

  const getChannelBadgeStyle = (channel: string) => {
    const name = channel.toLowerCase();
    if (name.includes("cazetv")) {
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/25 shadow-[0_0_8px_rgba(234,179,8,0.05)]";
    }
    if (name.includes("premiere")) {
      return "bg-amber-500/10 text-amber-500 border-amber-500/25 shadow-[0_0_8px_rgba(245,158,11,0.05)]";
    }
    if (name.includes("globo")) {
      return "bg-blue-500/10 text-blue-400 border-blue-500/25 shadow-[0_0_8px_rgba(59,130,246,0.05)]";
    }
    if (name.includes("furacão") || name.includes("redefuracao")) {
      return "bg-red-500/10 text-red-500 border-red-500/25 shadow-[0_0_8px_rgba(239,68,68,0.05)]";
    }
    return "bg-slate-900/80 text-slate-300 border-slate-800";
  };

  return (
    <div className="w-full ticket-panel p-5 relative overflow-hidden border border-white/5">
      {/* Ticket Header Label */}
      <div className="flex justify-between items-center text-[8px] font-black uppercase text-slate-500 tracking-widest mb-3 border-b border-white/5 pb-2">
        <span>Transmissão & Agenda</span>
        <span className="font-mono text-slate-600">Nº RDT-{currentClub.shortName}-{opponent.shortName}</span>
      </div>

      {/* Row containing Match Details (Matchup + Date) */}
      <div className="flex flex-col items-center justify-center bg-slate-950/40 rounded-2xl p-4 border border-white/5 relative">
        
        {/* Shields & VS */}
        <div className="flex items-center justify-center gap-7 mb-3">
          <div className="flex flex-col items-center">
            <ClubBadge clubId={currentClub.id} size={44} className="filter drop-shadow-md" />
            <span className="text-[10px] font-black text-slate-300 mt-1 uppercase tracking-wider">{currentClub.shortName}</span>
          </div>

          <span className="text-xs font-black text-slate-600 uppercase tracking-widest bg-slate-900/60 px-2.5 py-1 rounded-full border border-white/5">VS</span>

          <div className="flex flex-col items-center">
            <ClubBadge clubId={opponent.id} size={44} className="filter drop-shadow-md" />
            <span className="text-[10px] font-black text-slate-300 mt-1 uppercase tracking-wider">{opponent.shortName}</span>
          </div>
        </div>

        {/* Date, Time, and Stadium badge */}
        <div className="text-center">
          <p className="text-[10px] font-bold text-club-accent uppercase tracking-wider">Campeonato Brasileiro</p>
          <p className="text-sm font-black text-white mt-1 tracking-tight">
            {matchDateStr}
          </p>
          <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 mt-1.5 font-bold uppercase tracking-wider">
            <MapPin size={10} className="text-slate-600" />
            <span>{stadium}</span>
          </div>
        </div>
      </div>

      {/* The Ticket Cutout Divider line */}
      <div className="ticket-divider" />

      {/* Broadcasting channel logos (High Contrast) */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider">
            <Tv size={13} className="text-club-accent" />
            <span>Canais:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-end">
            {channels.map((chan, idx) => (
              <span
                key={idx}
                className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-lg border tracking-wider ${getChannelBadgeStyle(
                  chan
                )}`}
              >
                {chan}
              </span>
            ))}
          </div>
        </div>

        {/* Calendar Trigger Button */}
        <button
          onClick={handleCalendarClick}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md border active:scale-97 cursor-pointer ${
            addedToCalendar
              ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/20 border-emerald-400/20"
              : "bg-club-primary hover:bg-club-primary/95 text-white shadow-club-primary/20 border-white/10"
          }`}
        >
          {addedToCalendar ? (
            <>
              <Check size={14} className="animate-bounce" />
              Adicionado ao Calendário!
            </>
          ) : (
            <>
              <Calendar size={14} />
              Adicionar ao Meu Calendário
            </>
          )}
        </button>
      </div>

      {/* Simulated barcode at the bottom */}
      <div className="mt-4 flex flex-col items-center opacity-25">
        <div className="h-6 w-48 bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 [mask-image:repeating-linear-gradient(to_right,black_0px,black_2px,transparent_2px,transparent_6px)]" />
        <span className="text-[7px] font-mono text-slate-500 mt-1 uppercase tracking-widest">RDT-TICKET-OFFICIAL-VALID</span>
      </div>
    </div>
  );
};

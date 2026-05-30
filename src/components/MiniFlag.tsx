// SVG flag badges

interface MiniFlagProps {
  code: string;
  className?: string;
}

export default function MiniFlag({ code, className = "w-5 h-4" }: MiniFlagProps) {
  const normCode = code.toUpperCase();

  // Custom vector colors and layouts for all 48 participating countries
  switch (normCode) {
    case "BRA": // Brazil
      return (
        <svg className={`${className} rounded shadow-sm border border-emerald-500/10`} viewBox="0 0 720 504">
          <rect width="720" height="504" fill="#009C3B" />
          <path d="M360 54L666 252L360 450L54 252L360 54Z" fill="#FFDF00" />
          <circle cx="360" cy="252" r="112.5" fill="#002776" />
        </svg>
      );
    case "ARG": // Argentina
      return (
        <svg className={`${className} rounded shadow-sm border border-sky-400/10`} viewBox="0 0 300 200">
          <rect width="300" height="200" fill="#74ACDF" />
          <rect y="66.6" width="300" height="66.6" fill="white" />
          <circle cx="150" cy="100" r="12" fill="#F8B319" />
        </svg>
      );
    case "USA": // USA
      return (
        <svg className={`${className} rounded shadow-sm border border-red-500/10`} viewBox="0 0 190 100">
          <rect width="190" height="100" fill="#B22234" />
          <rect y="7.69" width="190" height="7.69" fill="white" />
          <rect y="23.07" width="190" height="7.69" fill="white" />
          <rect y="38.46" width="190" height="7.69" fill="white" />
          <rect y="53.84" width="190" height="7.69" fill="white" />
          <rect y="69.23" width="190" height="7.69" fill="white" />
          <rect y="84.61" width="190" height="7.69" fill="white" />
          <rect width="76" height="53.8" fill="#3C3B6E" />
        </svg>
      );
    case "MEX": // Mexico
      return (
        <svg className={`${className} rounded shadow-sm border border-emerald-500/10`} viewBox="0 0 3 2">
          <rect width="1" height="2" fill="#006847" />
          <rect x="1" width="1" height="2" fill="#FFFFFF" />
          <rect x="2" width="1" height="2" fill="#CE1126" />
          <circle cx="1.5" cy="1" r="0.15" fill="#B22234" />
        </svg>
      );
    case "CAN": // Canada
      return (
        <svg className={`${className} rounded shadow-sm border border-red-500/10`} viewBox="0 0 2 1">
          <rect width="2" height="1" fill="#FF0000" />
          <rect x="0.5" width="1" height="1" fill="#FFFFFF" />
          <path d="M1 0.3L0.9 0.45L0.75 0.4L0.85 0.55L0.7 0.65L0.9 0.65L1 0.85L1.1 0.65L1.3 0.65L1.15 0.55L1.25 0.4L1.1 0.45L1 0.3Z" fill="#FF0000" />
        </svg>
      );
    case "FRA": // France
      return (
        <svg className={`${className} rounded shadow-sm border border-blue-500/10`} viewBox="0 0 3 2">
          <rect width="1" height="2" fill="#002395" />
          <rect x="1" width="1" height="2" fill="#FFFFFF" />
          <rect x="2" width="1" height="2" fill="#ED2939" />
        </svg>
      );
    case "ITA": // Italy
      return (
        <svg className={`${className} rounded shadow-sm border border-emerald-500/10`} viewBox="0 0 3 2">
          <rect width="1" height="2" fill="#009246" />
          <rect x="1" width="1" height="2" fill="#F1F2F1" />
          <rect x="2" width="1" height="2" fill="#CE2B37" />
        </svg>
      );
    case "GER": // Germany
      return (
        <svg className={`${className} rounded shadow-sm border border-slate-700/10`} viewBox="0 0 5 3">
          <rect width="5" height="3" fill="#000000" />
          <rect y="1" width="5" height="1" fill="#DD0000" />
          <rect y="2" width="5" height="1" fill="#FFCC00" />
        </svg>
      );
    case "ENG": // England
      return (
        <svg className={`${className} rounded shadow-sm border border-slate-300`} viewBox="0 0 5 3">
          <rect width="5" height="3" fill="#FFFFFF" />
          <rect x="2" width="1" height="3" fill="#CE1124" />
          <rect y="1" width="5" height="1" fill="#CE1124" />
        </svg>
      );
    case "ESP": // Spain
      return (
        <svg className={`${className} rounded shadow-sm border border-red-500/10`} viewBox="0 0 3 2">
          <rect width="3" height="2" fill="#C60B1E" />
          <rect y="0.5" width="3" height="1" fill="#FBE122" />
          <circle cx="0.8" cy="1" r="0.25" fill="#C60B1E" />
        </svg>
      );
    case "POR": // Portugal
      return (
        <svg className={`${className} rounded shadow-sm border border-emerald-500/10`} viewBox="0 0 3 2">
          <rect width="1.2" height="2" fill="#006600" />
          <rect x="1.2" width="1.8" height="2" fill="#FF0000" />
          <circle cx="1.2" cy="1" r="0.3" fill="#FFFF00" />
        </svg>
      );
    case "URU": // Uruguay
      return (
        <svg className={`${className} rounded shadow-sm border border-sky-400/10`} viewBox="0 0 9 6">
          <rect width="9" height="6" fill="#FFFFFF" />
          <rect y="0.66" width="9" height="0.66" fill="#0081C6" />
          <rect y="2.00" width="9" height="0.66" fill="#0081C6" />
          <rect y="3.33" width="9" height="0.66" fill="#0081C6" />
          <rect y="4.66" width="9" height="0.66" fill="#0081C6" />
          <rect width="3" height="2.66" fill="#FFFFFF" />
          <circle cx="1.5" cy="1.33" r="0.5" fill="#F8D117" />
        </svg>
      );
    case "NED": // Netherlands
      return (
        <svg className={`${className} rounded shadow-sm border border-slate-300`} viewBox="0 0 3 2">
          <rect width="3" height="2" fill="#AE1C28" />
          <rect y="0.66" width="3" height="0.66" fill="#FFFFFF" />
          <rect y="1.33" width="3" height="0.66" fill="#21468B" />
        </svg>
      );
    case "BEL": // Belgium
      return (
        <svg className={`${className} rounded shadow-sm border border-slate-300`} viewBox="0 0 3 2">
          <rect width="1" height="2" fill="#000000" />
          <rect x="1" width="1" height="2" fill="#FDDA24" />
          <rect x="2" width="1" height="2" fill="#EF3340" />
        </svg>
      );
    case "CRO": // Croatia
      return (
        <svg className={`${className} rounded shadow-sm border border-red-500/10`} viewBox="0 0 2 1">
          <rect width="2" height="1" fill="#FF0000" />
          <rect y="0.33" width="2" height="0.33" fill="#FFFFFF" />
          <rect y="0.66" width="2" height="0.33" fill="#0000FF" />
          <polygon points="1,0.3 0.9,0.5 1.1,0.5" fill="#FF0000" />
        </svg>
      );
    case "MAR": // Morocco
      return (
        <svg className={`${className} rounded shadow-sm border border-red-600/10`} viewBox="0 0 3 2">
          <rect width="3" height="2" fill="#C1272D" />
          <polygon points="1.5,0.7 1.6,1.0 1.9,1.0 1.6,1.2 1.7,1.5 1.5,1.3 1.3,1.5 1.4,1.2 1.1,1.0 1.4,1.0" fill="#006233" />
        </svg>
      );
    case "JPN": // Japan
      return (
        <svg className={`${className} rounded shadow-sm border border-slate-200`} viewBox="0 0 3 2">
          <rect width="3" height="2" fill="#FFFFFF" />
          <circle cx="1.5" cy="1" r="0.6" fill="#BC002D" />
        </svg>
      );
    case "KOR": // South Korea
      return (
        <svg className={`${className} rounded shadow-sm border border-slate-200`} viewBox="0 0 3 2">
          <rect width="3" height="2" fill="#FFFFFF" />
          <circle cx="1.5" cy="1" r="0.5" fill="#CD2E3A" />
          <circle cx="1.5" cy="1" r="0.25" fill="#0A308F" />
        </svg>
      );
    case "COL": // Colombia
      return (
        <svg className={`${className} rounded shadow-sm border border-yellow-500/10`} viewBox="0 0 3 2">
          <rect width="3" height="1" fill="#FCD116" />
          <rect y="1" width="3" height="0.5" fill="#003893" />
          <rect y="1.5" width="3" height="0.5" fill="#CE1126" />
        </svg>
      );
    case "CHI": // Chile
      return (
        <svg className={`${className} rounded shadow-sm border border-red-500/10`} viewBox="0 0 3 2">
          <rect width="3" height="2" fill="#D52B1E" />
          <rect width="3" height="1" fill="#FFFFFF" />
          <rect width="1" height="2" fill="#0039A6" />
          <polygon points="0.5,0.7 0.6,0.9 0.8,0.9 0.6,1.0 0.7,1.2 0.5,1.1 0.3,1.2 0.4,1.0 0.2,0.9 0.4,0.9" fill="#FFFFFF" />
        </svg>
      );
    case "SUI": // Switzerland
      return (
        <svg className={`${className} rounded shadow-sm border border-red-500/10`} viewBox="0 0 1 1">
          <rect width="1" height="1" fill="#DA291C" />
          <rect x="0.4" y="0.2" width="0.2" height="0.6" fill="#FFFFFF" />
          <rect x="0.2" y="0.4" width="0.6" height="0.2" fill="#FFFFFF" />
        </svg>
      );
    case "SWE": // Sweden
      return (
        <svg className={`${className} rounded shadow-sm border border-blue-500/10`} viewBox="0 0 16 10">
          <rect width="16" height="10" fill="#006AA7" />
          <rect x="5" width="2" height="10" fill="#FECC00" />
          <rect y="4" width="16" height="2" fill="#FECC00" />
        </svg>
      );
    case "SEN": // Senegal
      return (
        <svg className={`${className} rounded shadow-sm border border-emerald-500/10`} viewBox="0 0 3 2">
          <rect width="1" height="2" fill="#00853F" />
          <rect x="1" width="1" height="2" fill="#FDEF42" />
          <rect x="2" width="1" height="2" fill="#E31B23" />
          <polygon points="1.5,0.8 1.57,1.05 1.8,1.05 1.6,1.2 1.67,1.45 1.5,1.3 1.33,1.45 1.4,1.2 1.2,1.05 1.43,1.05" fill="#00853F" />
        </svg>
      );
    case "ECU": // Ecuador
      return (
        <svg className={`${className} rounded shadow-sm border border-yellow-500/10`} viewBox="0 0 3 2">
          <rect width="3" height="1" fill="#FFD200" />
          <rect y="1" width="3" height="0.5" fill="#0035AD" />
          <rect y="1.5" width="3" height="0.5" fill="#D51E2D" />
          <circle cx="1.5" cy="1" r="0.18" fill="#FCE300" />
        </svg>
      );
    case "CMR": // Cameroon
      return (
        <svg className={`${className} rounded shadow-sm border border-emerald-600/10`} viewBox="0 0 3 2">
          <rect width="1" height="2" fill="#007A5E" />
          <rect x="1" width="1" height="2" fill="#CE1126" />
          <rect x="2" width="1" height="2" fill="#FCD116" />
          <polygon points="1.5,0.8 1.57,1.05 1.8,1.05 1.6,1.2 1.67,1.45 1.5,1.3 1.33,1.45 1.4,1.2 1.2,1.05 1.43,1.05" fill="#FCD116" />
        </svg>
      );
    case "KSA": // Saudi Arabia
      return (
        <svg className={`${className} rounded shadow-sm border border-emerald-600/10`} viewBox="0 0 3 2">
          <rect width="3" height="2" fill="#006C35" />
          <rect x="0.5" y="1.3" width="2" height="0.15" fill="#FFFFFF" />
          <path d="M1 0.8L1.3 0.6L1.5 0.8L1.3 1L1 0.8Z" fill="#FFFFFF" />
        </svg>
      );
    case "POL": // Poland
      return (
        <svg className={`${className} rounded shadow-sm border border-slate-200`} viewBox="0 0 8 5">
          <rect width="8" height="5" fill="#FFFFFF" />
          <rect y="2.5" width="8" height="2.5" fill="#DC143C" />
        </svg>
      );
    case "AUS": // Australia
      return (
        <svg className={`${className} rounded shadow-sm border border-blue-800/10`} viewBox="0 0 2 1">
          <rect width="2" height="1" fill="#00008B" />
          <rect width="0.8" height="0.5" fill="#B22234" />
          <circle cx="1.4" cy="0.6" r="0.15" fill="#FFFFFF" />
        </svg>
      );
    case "WAL": // Wales
      return (
        <svg className={`${className} rounded shadow-sm border border-emerald-600/10`} viewBox="0 0 3 2">
          <rect width="3" height="1" fill="#FFFFFF" />
          <rect y="1" width="3" height="1" fill="#00AD43" />
          <circle cx="1.5" cy="1" r="0.3" fill="#D40000" />
        </svg>
      );
    case "IRN": // Iran
      return (
        <svg className={`${className} rounded shadow-sm border border-emerald-600/10`} viewBox="0 0 22 15">
          <rect width="22" height="5" fill="#239F40" />
          <rect y="5" width="22" height="5" fill="#FFFFFF" />
          <rect y="10" width="22" height="5" fill="#DA121A" />
          <circle cx="11" cy="7.5" r="1.2" fill="#DA121A" />
        </svg>
      );
    case "GHA": // Ghana
      return (
        <svg className={`${className} rounded shadow-sm border border-red-500/10`} viewBox="0 0 3 2">
          <rect width="3" height="0.66" fill="#DA291C" />
          <rect y="0.66" width="3" height="0.66" fill="#FCD116" />
          <rect y="1.33" width="3" height="0.66" fill="#007A5E" />
          <polygon points="1.5,0.85 1.57,1.05 1.78,1.05 1.6,1.18 1.67,1.38 1.5,1.25 1.33,1.38 1.4,1.18 1.22,1.05 1.43,1.05" fill="#000000" />
        </svg>
      );
    case "TUN": // Tunisia
      return (
        <svg className={`${className} rounded shadow-sm border border-red-500/10`} viewBox="0 0 3 2">
          <rect width="3" height="2" fill="#E20E17" />
          <circle cx="1.5" cy="1" r="0.5" fill="#FFFFFF" />
          <circle cx="1.5" cy="1" r="0.35" fill="#E20E17" />
          <circle cx="1.6" cy="1" r="0.35" fill="#FFFFFF" />
        </svg>
      );
    case "CRC": // Costa Rica
      return (
        <svg className={`${className} rounded shadow-sm border border-blue-600/10`} viewBox="0 0 5 3">
          <rect width="5" height="3" fill="#002F6C" />
          <rect y="0.5" width="5" height="2" fill="#FFFFFF" />
          <rect y="0.9" width="5" height="1.2" fill="#D21034" />
        </svg>
      );
    case "SRB": // Serbia
      return (
        <svg className={`${className} rounded shadow-sm border border-red-500/10`} viewBox="0 0 3 2">
          <rect width="3" height="2" fill="#C6363C" />
          <rect y="0.66" width="3" height="0.66" fill="#0C4076" />
          <rect y="1.33" width="3" height="0.66" fill="#FFFFFF" />
        </svg>
      );
    case "PER": // Peru
      return (
        <svg className={`${className} rounded shadow-sm border border-red-500/10`} viewBox="0 0 3 2">
          <rect width="1" height="2" fill="#D91414" />
          <rect x="1" width="1" height="2" fill="#FFFFFF" />
          <rect x="2" width="1" height="2" fill="#D91414" />
        </svg>
      );
    case "VEN": // Venezuela
      return (
        <svg className={`${className} rounded shadow-sm border border-red-800/10`} viewBox="0 0 3 2">
          <rect width="3" height="2" fill="#7B142A" />
          <circle cx="0.5" cy="0.5" r="0.25" fill="#F1C40F" />
        </svg>
      );
    case "CIV": // Ivory Coast
      return (
        <svg className={`${className} rounded shadow-sm border border-orange-500/10`} viewBox="0 0 3 2">
          <rect width="1" height="2" fill="#F77F00" />
          <rect x="1" width="1" height="2" fill="#FFFFFF" />
          <rect x="2" width="1" height="2" fill="#009B48" />
        </svg>
      );
    case "NZL": // New Zealand
      return (
        <svg className={`${className} rounded shadow-sm border border-blue-900/10`} viewBox="0 0 2 1">
          <rect width="2" height="1" fill="#00247D" />
          <rect width="0.8" height="0.5" fill="#CC143C" />
        </svg>
      );
    default:
      // Neutral default flag for any generic/unmapped team code
      return (
        <div className={`${className} rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-[7px] font-black text-slate-500`}>
          {normCode}
        </div>
      );
  }
}

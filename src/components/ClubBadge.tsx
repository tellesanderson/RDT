import React, { useState, useEffect } from "react";

interface ClubBadgeProps {
  clubId: string;
  className?: string;
  size?: number;
}

// Map clubId to official ESPN CDN Team ID for high-res transparent PNGs
const CLUB_LOGO_IDS: Record<string, string> = {
  cap: "3458",
  cam: "7632",
  bah: "9967",
  bot: "6086",
  cha: "9318",
  cor: "874",
  cfc: "3456",
  cru: "2022",
  fla: "819",
  flu: "3445",
  gre: "6273",
  int: "1936",
  mir: "9169",
  pal: "2029",
  bra: "6079",
  rem: "4936",
  san: "2674",
  sao: "2026",
  vas: "3454",
  vit: "3457",
  amg: "6154",
  ath: "20851",
  ago: "10357",
  ava: "9966",
  bfc: "10281",
  crb: "9970",
  cea: "9969",
  cri: "9971",
  cui: "17313",
  for: "6272",
  goi: "3395",
  juv: "6270",
  lon: "17333",
  nov: "18127",
  nau: "7633",
  ope: "18187",
  pon: "3459",
  spo: "7635",
  ber: "11268",
  vil: "9973",
};

export const ClubBadge: React.FC<ClubBadgeProps> = ({ clubId, className = "", size = 48 }) => {
  const [logoState, setLogoState] = useState<"default" | "dark" | "fallback">("default");

  // Reset logo state when clubId changes
  useEffect(() => {
    setLogoState("default");
  }, [clubId]);

  const logoId = CLUB_LOGO_IDS[clubId];

  // Render official SVG shields as fallback
  const renderShieldFallback = () => {
    switch (clubId) {
      case "fla": // Flamengo
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path d="M10,10 L90,10 L90,55 C90,80 50,95 50,95 C50,95 10,80 10,55 Z" fill="#E30613" />
            <rect x="10" y="20" width="80" height="10" fill="#000000" />
            <rect x="10" y="40" width="80" height="10" fill="#000000" />
            <rect x="10" y="60" width="80" height="10" fill="#000000" />
            <text x="50" y="55" fill="#FFD700" fontSize="24" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" fontFamily="sans-serif">CRF</text>
          </svg>
        );
      case "cor": // Corinthians
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="45" fill="#111111" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="50" cy="50" r="35" fill="#FFFFFF" stroke="#E30613" strokeWidth="2" />
            <path d="M35,25 L65,25 L65,75 L35,75 Z" fill="none" stroke="#111111" strokeWidth="3" />
            <path d="M50,15 L50,85" stroke="#E30613" strokeWidth="3" />
            <text x="50" y="50" fill="#111111" fontSize="10" fontWeight="extrabold" textAnchor="middle" dominantBaseline="middle" fontFamily="sans-serif">SCCP</text>
          </svg>
        );
      case "pal": // Palmeiras
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="45" fill="#006437" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3,3" />
            <text x="50" y="50" fill="#FFFFFF" fontSize="32" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" fontFamily="sans-serif">P</text>
            <circle cx="50" cy="22" r="3" fill="#FFFFFF" />
            <circle cx="50" cy="78" r="3" fill="#FFFFFF" />
            <circle cx="22" cy="50" r="3" fill="#FFFFFF" />
            <circle cx="78" cy="50" r="3" fill="#FFFFFF" />
          </svg>
        );
      case "sao": // São Paulo
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path d="M10,10 L90,10 L90,40 C90,75 50,95 50,95 C50,95 10,75 10,40 Z" fill="#FFFFFF" stroke="#111111" strokeWidth="2" />
            <rect x="10" y="10" width="80" height="20" fill="#111111" />
            <text x="50" y="24" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SPFC</text>
            <path d="M15,40 L50,90 L50,40 Z" fill="#FE0000" />
            <path d="M50,40 L50,90 L85,40 Z" fill="#111111" />
          </svg>
        );
      case "vas": // Vasco
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path d="M10,10 L90,10 L90,55 C90,80 50,95 50,95 C50,95 10,80 10,55 Z" fill="#111111" stroke="#FFFFFF" strokeWidth="2" />
            <path d="M80,20 L20,80" stroke="#FFFFFF" strokeWidth="12" />
            <path d="M43,38 L57,38 M50,30 L50,60 M43,52 L57,52" stroke="#E30613" strokeWidth="4" strokeLinecap="square" />
          </svg>
        );
      case "gre": // Grêmio
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="45" fill="#0D80BF" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="50" cy="50" r="38" fill="#111111" />
            <circle cx="50" cy="50" r="30" fill="#FFFFFF" />
            <path d="M20,50 L80,50" stroke="#111111" strokeWidth="8" />
            <text x="50" y="50" fill="#FFFFFF" fontSize="12" fontWeight="black" textAnchor="middle" dominantBaseline="middle" fontFamily="sans-serif">GREMIO</text>
          </svg>
        );
      case "int": // Internacional
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="45" fill="#DD0000" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="#FFFFFF" strokeWidth="2" />
            <text x="50" y="50" fill="#FFFFFF" fontSize="24" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" fontFamily="sans-serif">SCI</text>
          </svg>
        );
      case "cam": // Atlético-MG
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path d="M10,15 L90,15 L90,55 C90,80 50,95 50,95 C50,95 10,80 10,55 Z" fill="#FFFFFF" stroke="#111111" strokeWidth="3" />
            <rect x="22" y="15" width="10" height="60" fill="#111111" />
            <rect x="45" y="15" width="10" height="75" fill="#111111" />
            <rect x="68" y="15" width="10" height="60" fill="#111111" />
            <path d="M50,2 L57,12 L43,12 Z" fill="#FFD700" />
            <text x="50" y="42" fill="#FFFFFF" stroke="#111111" strokeWidth="2" fontSize="20" fontWeight="bold" textAnchor="middle" paintOrder="stroke fill" fontFamily="sans-serif">CAM</text>
          </svg>
        );
      case "cru": // Cruzeiro
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="45" fill="#0033A0" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="50" cy="22" r="4" fill="#FFFFFF" />
            <circle cx="50" cy="72" r="4" fill="#FFFFFF" />
            <circle cx="28" cy="47" r="4" fill="#FFFFFF" />
            <circle cx="72" cy="47" r="4" fill="#FFFFFF" />
            <circle cx="61" cy="58" r="3" fill="#FFFFFF" />
          </svg>
        );
      case "san": // Santos
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path d="M10,15 L90,15 L90,55 C90,80 50,95 50,95 C50,95 10,80 10,55 Z" fill="#FFFFFF" stroke="#111111" strokeWidth="2" />
            <path d="M10,15 L50,95 L50,15 Z" fill="#FFFFFF" />
            <path d="M50,15 L90,55 L90,15 Z" fill="#111111" />
            <path d="M10,40 L90,40" stroke="#111111" strokeWidth="8" />
            <text x="50" y="32" fill="#FFD700" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SFC</text>
          </svg>
        );
      case "bot": // Botafogo
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path d="M10,10 L90,10 L90,55 C90,80 50,95 50,95 C50,95 10,80 10,55 Z" fill="#111111" stroke="#FFFFFF" strokeWidth="4" />
            <polygon points="50,25 55,40 70,40 58,50 62,65 50,55 38,65 42,50 30,40 45,40" fill="#FFFFFF" />
          </svg>
        );
      case "flu": // Fluminense
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path d="M10,15 L90,15 L90,55 C90,80 50,95 50,95 C50,95 10,80 10,55 Z" fill="#8A1538" stroke="#FFFFFF" strokeWidth="2" />
            <path d="M10,15 C40,40 60,40 90,15" stroke="#006F3C" strokeWidth="8" fill="none" />
            <path d="M10,55 C40,80 60,80 90,55" stroke="#006F3C" strokeWidth="8" fill="none" />
            <text x="50" y="55" fill="#F5D48B" fontSize="22" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" fontFamily="sans-serif">FFC</text>
          </svg>
        );
      case "cap": // Athletico-PR
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path d="M15,10 L85,15 L70,85 L30,85 Z" fill="#E30613" />
            <path d="M28,25 L75,30" stroke="#111111" strokeWidth="8" />
            <path d="M25,45 L68,48" stroke="#111111" strokeWidth="8" />
            <path d="M22,65 L60,67" stroke="#111111" strokeWidth="8" />
            <text x="48" y="48" fill="#FFFFFF" fontSize="24" fontWeight="black" transform="rotate(-5, 48, 48)" textAnchor="middle" fontFamily="sans-serif">CAP</text>
          </svg>
        );
      case "cfc": // Coritiba
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="45" fill="#006437" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="50" cy="50" r="35" fill="#FFFFFF" />
            <rect x="15" y="40" width="70" height="20" fill="#006437" />
            <text x="50" y="50" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" fontFamily="sans-serif">CFC</text>
          </svg>
        );
      case "bah": // Bahia
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="45" fill="#0033A0" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="50" cy="50" r="38" fill="#FFFFFF" stroke="#E30613" strokeWidth="3" />
            <rect x="25" y="42" width="50" height="16" fill="#0033A0" />
            <rect x="25" y="32" width="50" height="10" fill="#E30613" />
            <text x="50" y="70" fill="#111111" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ECB</text>
          </svg>
        );
      case "for": // Fortaleza
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path d="M10,10 L90,10 L80,75 C80,75 50,95 50,95 C50,95 20,75 20,75 Z" fill="#104E8B" stroke="#FFFFFF" strokeWidth="2" />
            <path d="M15,40 L85,40 L78,70 C78,70 50,90 50,90 C50,90 22,70 22,70 Z" fill="#E30613" stroke="#FFFFFF" strokeWidth="2" />
            <text x="50" y="30" fill="#FFFFFF" fontSize="18" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">FEC</text>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path d="M10,10 L90,10 L90,55 C90,80 50,95 50,95 C50,95 10,80 10,55 Z" fill="#555" />
            <text x="50" y="50" fill="#fff" fontSize="16" textAnchor="middle" dominantBaseline="middle">FC</text>
          </svg>
        );
    }
  };

  if (logoId && logoState !== "fallback") {
    const imageUrl = logoState === "default"
      ? `https://a.espncdn.com/i/teamlogos/soccer/500/${logoId}.png`
      : `https://a.espncdn.com/i/teamlogos/soccer/500-dark/${logoId}.png`;

    const handleImageError = () => {
      if (logoState === "default") {
        setLogoState("dark");
      } else {
        setLogoState("fallback");
      }
    };

    return (
      <div 
        className={`inline-block ${className}`} 
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={`Logo ${clubId}`}
          className="w-full h-full object-contain"
          onError={handleImageError}
        />
      </div>
    );
  }

  return (
    <div className={`inline-block ${className}`} style={{ width: size, height: size }}>
      {renderShieldFallback()}
    </div>
  );
};

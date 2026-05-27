export interface Club {
  id: string;
  name: string;
  shortName: string;
  primaryColor: string;     // Hex color
  secondaryColor: string;   // Hex color
  textColor: string;        // Contrasting text color
  accentColor: string;      // Neon highlight color
}

export const CLUBS: Club[] = [
  {
    id: "cap",
    name: "Athletico-PR",
    shortName: "CAP",
    primaryColor: "#E30613",
    secondaryColor: "#111111",
    textColor: "#FFFFFF",
    accentColor: "#00FFFF"
  },
  {
    id: "cam",
    name: "Atlético-MG",
    shortName: "CAM",
    primaryColor: "#111111",
    secondaryColor: "#FFFFFF",
    textColor: "#FFFFFF",
    accentColor: "#FFD700"
  },
  {
    id: "bah",
    name: "Bahia",
    shortName: "BAH",
    primaryColor: "#0033A0",
    secondaryColor: "#E30613",
    textColor: "#FFFFFF",
    accentColor: "#FFFFFF"
  },
  {
    id: "bot",
    name: "Botafogo",
    shortName: "BOT",
    primaryColor: "#111111",
    secondaryColor: "#FFFFFF",
    textColor: "#FFFFFF",
    accentColor: "#FFFFFF"
  },
  {
    id: "cha",
    name: "Chapecoense",
    shortName: "CHA",
    primaryColor: "#417505",
    secondaryColor: "#fafafc",
    textColor: "#FFFFFF",
    accentColor: "#00FFFF"
  },
  {
    id: "cor",
    name: "Corinthians",
    shortName: "COR",
    primaryColor: "#111111",
    secondaryColor: "#FFFFFF",
    textColor: "#FFFFFF",
    accentColor: "#C0C0C0"
  },
  {
    id: "cfc",
    name: "Coritiba",
    shortName: "CFC",
    primaryColor: "#006437",
    secondaryColor: "#FFFFFF",
    textColor: "#FFFFFF",
    accentColor: "#00FFFF"
  },
  {
    id: "cru",
    name: "Cruzeiro",
    shortName: "CRU",
    primaryColor: "#0033A0",
    secondaryColor: "#FFFFFF",
    textColor: "#FFFFFF",
    accentColor: "#E2F0FF"
  },
  {
    id: "fla",
    name: "Flamengo",
    shortName: "FLA",
    primaryColor: "#E30613",
    secondaryColor: "#000000",
    textColor: "#FFFFFF",
    accentColor: "#FFD700"
  },
  {
    id: "flu",
    name: "Fluminense",
    shortName: "FLU",
    primaryColor: "#8A1538",
    secondaryColor: "#006F3C",
    textColor: "#FFFFFF",
    accentColor: "#F5D48B"
  },
  {
    id: "gre",
    name: "Grêmio",
    shortName: "GRE",
    primaryColor: "#0D80BF",
    secondaryColor: "#111111",
    textColor: "#FFFFFF",
    accentColor: "#9DFF84"
  },
  {
    id: "int",
    name: "Internacional",
    shortName: "INT",
    primaryColor: "#DD0000",
    secondaryColor: "#FFFFFF",
    textColor: "#FFFFFF",
    accentColor: "#FFFFFF"
  },
  {
    id: "mir",
    name: "Mirassol",
    shortName: "MIR",
    primaryColor: "#FEDC00",
    secondaryColor: "#417505",
    textColor: "#000000",
    accentColor: "#FEDC00"
  },
  {
    id: "pal",
    name: "Palmeiras",
    shortName: "PAL",
    primaryColor: "#006437",
    secondaryColor: "#FFFFFF",
    textColor: "#FFFFFF",
    accentColor: "#9DFF84"
  },
  {
    id: "bra",
    name: "Red Bull Bragantino",
    shortName: "BRA",
    primaryColor: "#000000",
    secondaryColor: "#fafafc",
    textColor: "#FFFFFF",
    accentColor: "#00FFFF"
  },
  {
    id: "rem",
    name: "Remo",
    shortName: "REMO",
    primaryColor: "#265891",
    secondaryColor: "#fafafa",
    textColor: "#FFFFFF",
    accentColor: "#00FFFF"
  },
  {
    id: "san",
    name: "Santos",
    shortName: "SAN",
    primaryColor: "#FFFFFF",
    secondaryColor: "#111111",
    textColor: "#000000",
    accentColor: "#FFD700"
  },
  {
    id: "sao",
    name: "São Paulo",
    shortName: "SAO",
    primaryColor: "#FE0000",
    secondaryColor: "#111111",
    textColor: "#FFFFFF",
    accentColor: "#FFFFFF"
  },
  {
    id: "vas",
    name: "Vasco da Gama",
    shortName: "VAS",
    primaryColor: "#222222",
    secondaryColor: "#FFFFFF",
    textColor: "#FFFFFF",
    accentColor: "#E30613"
  },
  {
    id: "vit",
    name: "Vitória",
    shortName: "VIT",
    primaryColor: "#C6101C",
    secondaryColor: "#C60000",
    textColor: "#FFFFFF",
    accentColor: "#C60000"
  },
  {
    id: "amg",
    name: "América Mineiro",
    shortName: "AMG",
    primaryColor: "#417505",
    secondaryColor: "#fafafc",
    textColor: "#FFFFFF",
    accentColor: "#00FFFF"
  },
  {
    id: "ath",
    name: "Athletic",
    shortName: "ACMG",
    primaryColor: "#000000",
    secondaryColor: "#FFFFFF",
    textColor: "#FFFFFF",
    accentColor: "#00FFFF"
  },
  {
    id: "ago",
    name: "Atlético Goianiense",
    shortName: "AGO",
    primaryColor: "#FF0000",
    secondaryColor: "#C60000",
    textColor: "#FFFFFF",
    accentColor: "#C60000"
  },
  {
    id: "ava",
    name: "Avaí",
    shortName: "AVA",
    primaryColor: "#0093EC",
    secondaryColor: "#fafafc",
    textColor: "#FFFFFF",
    accentColor: "#00FFFF"
  },
  {
    id: "bfc",
    name: "Botafogo-SP",
    shortName: "BFC",
    primaryColor: "#000000",
    secondaryColor: "#C60000",
    textColor: "#FFFFFF",
    accentColor: "#C60000"
  },
  {
    id: "crb",
    name: "CRB",
    shortName: "CRB",
    primaryColor: "#C60000",
    secondaryColor: "#fafafc",
    textColor: "#FFFFFF",
    accentColor: "#00FFFF"
  },
  {
    id: "cea",
    name: "Ceará",
    shortName: "CEA",
    primaryColor: "#010101",
    secondaryColor: "#fafafc",
    textColor: "#FFFFFF",
    accentColor: "#00FFFF"
  },
  {
    id: "cri",
    name: "Criciúma",
    shortName: "CRI",
    primaryColor: "#F8E71C",
    secondaryColor: "#000000",
    textColor: "#000000",
    accentColor: "#F8E71C"
  },
  {
    id: "cui",
    name: "Cuiabá",
    shortName: "CUI",
    primaryColor: "#004526",
    secondaryColor: "#FFD65A",
    textColor: "#FFFFFF",
    accentColor: "#FFD65A"
  },
  {
    id: "for",
    name: "Fortaleza",
    shortName: "FOR",
    primaryColor: "#104E8B",
    secondaryColor: "#E30613",
    textColor: "#FFFFFF",
    accentColor: "#FFFFFF"
  },
  {
    id: "goi",
    name: "Goiás",
    shortName: "GOI",
    primaryColor: "#417505",
    secondaryColor: "#fafafc",
    textColor: "#FFFFFF",
    accentColor: "#00FFFF"
  },
  {
    id: "juv",
    name: "Juventude",
    shortName: "JUV",
    primaryColor: "#417505",
    secondaryColor: "#fafafc",
    textColor: "#FFFFFF",
    accentColor: "#00FFFF"
  },
  {
    id: "lon",
    name: "Londrina",
    shortName: "LON",
    primaryColor: "#0093EC",
    secondaryColor: "#fafafc",
    textColor: "#FFFFFF",
    accentColor: "#00FFFF"
  },
  {
    id: "nov",
    name: "Novorizontino",
    shortName: "NOV",
    primaryColor: "#000000",
    secondaryColor: "#FFD704",
    textColor: "#FFFFFF",
    accentColor: "#FFD704"
  },
  {
    id: "nau",
    name: "Náutico",
    shortName: "NAU",
    primaryColor: "#C60000",
    secondaryColor: "#fafafc",
    textColor: "#FFFFFF",
    accentColor: "#00FFFF"
  },
  {
    id: "ope",
    name: "Operário PR",
    shortName: "OPE",
    primaryColor: "#000000",
    secondaryColor: "#C60000",
    textColor: "#FFFFFF",
    accentColor: "#C60000"
  },
  {
    id: "pon",
    name: "Ponte Preta",
    shortName: "PON",
    primaryColor: "#000000",
    secondaryColor: "#fafafc",
    textColor: "#FFFFFF",
    accentColor: "#00FFFF"
  },
  {
    id: "spo",
    name: "Sport",
    shortName: "SPO",
    primaryColor: "#C60000",
    secondaryColor: "#000000",
    textColor: "#FFFFFF",
    accentColor: "#000000"
  },
  {
    id: "ber",
    name: "São Bernardo",
    shortName: "BER",
    primaryColor: "#000000",
    secondaryColor: "#C60000",
    textColor: "#FFFFFF",
    accentColor: "#C60000"
  },
  {
    id: "vil",
    name: "Vila Nova",
    shortName: "VIL",
    primaryColor: "#C60000",
    secondaryColor: "#fafafc",
    textColor: "#FFFFFF",
    accentColor: "#00FFFF"
  }
];

export const getClubById = (id: string): Club | undefined => {
  return CLUBS.find(c => c.id === id);
};

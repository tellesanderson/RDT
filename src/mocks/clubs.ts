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
    id: "fla",
    name: "Flamengo",
    shortName: "FLA",
    primaryColor: "#E30613",
    secondaryColor: "#000000",
    textColor: "#FFFFFF",
    accentColor: "#FFD700"
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
    id: "pal",
    name: "Palmeiras",
    shortName: "PAL",
    primaryColor: "#006437",
    secondaryColor: "#FFFFFF",
    textColor: "#FFFFFF",
    accentColor: "#9DFF84"
  },
  {
    id: "sao",
    name: "São Paulo",
    shortName: "SPFC",
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
    id: "cam",
    name: "Atlético-MG",
    shortName: "CAM",
    primaryColor: "#111111",
    secondaryColor: "#FFFFFF",
    textColor: "#FFFFFF",
    accentColor: "#FFD700"
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
    id: "san",
    name: "Santos",
    shortName: "SAN",
    primaryColor: "#FFFFFF",
    secondaryColor: "#111111",
    textColor: "#000000",
    accentColor: "#FFD700"
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
    id: "flu",
    name: "Fluminense",
    shortName: "FLU",
    primaryColor: "#8A1538",
    secondaryColor: "#006F3C",
    textColor: "#FFFFFF",
    accentColor: "#F5D48B"
  },
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
    id: "cfc",
    name: "Coritiba",
    shortName: "CFC",
    primaryColor: "#006437",
    secondaryColor: "#FFFFFF",
    textColor: "#FFFFFF",
    accentColor: "#00FFFF"
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
    id: "for",
    name: "Fortaleza",
    shortName: "FOR",
    primaryColor: "#104E8B",
    secondaryColor: "#E30613",
    textColor: "#FFFFFF",
    accentColor: "#FFFFFF"
  }
];

export const getClubById = (id: string): Club | undefined => {
  return CLUBS.find(c => c.id === id);
};

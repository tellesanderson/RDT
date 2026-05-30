import { WorldCupData } from "../types/worldcup";

export const mockWorldCupData: WorldCupData = {
  name: "Copa do Mundo FIFA 2026",
  rounds: [
    {
      name: "Rodada 1",
      matches: [
        // Grupo A
        {
          num: 1,
          date: "2026-06-11",
          time: "17:00",
          team1: { name: "México", code: "MEX" },
          team2: { name: "Equador", code: "ECU" },
          score1: 2,
          score2: 1,
          group: "Grupo A",
          stadium: { name: "Estádio Azteca", city: "Cidade do México" }
        },
        {
          num: 2,
          date: "2026-06-11",
          time: "20:00",
          team1: { name: "Itália", code: "ITA" },
          team2: { name: "Camarões", code: "CMR" },
          score1: 1,
          score2: 1,
          group: "Grupo A",
          stadium: { name: "Estádio Azteca", city: "Cidade do México" }
        },
        // Grupo B
        {
          num: 3,
          date: "2026-06-12",
          time: "14:00",
          team1: { name: "Estados Unidos", code: "USA" },
          team2: { name: "Gales", code: "WAL" },
          score1: 2,
          score2: 0,
          group: "Grupo B",
          stadium: { name: "MetLife Stadium", city: "Nova York" }
        },
        {
          num: 4,
          date: "2026-06-12",
          time: "17:00",
          team1: { name: "Inglaterra", code: "ENG" },
          team2: { name: "Irã", code: "IRN" },
          score1: 3,
          score2: 0,
          group: "Grupo B",
          stadium: { name: "MetLife Stadium", city: "Nova York" }
        },
        // Grupo C
        {
          num: 5,
          date: "2026-06-13",
          time: "15:00",
          team1: { name: "Argentina", code: "ARG" },
          team2: { name: "Arábia Saudita", code: "KSA" },
          score1: 1,
          score2: 2,
          group: "Grupo C",
          stadium: { name: "Mercedes-Benz Stadium", city: "Atlanta" }
        },
        {
          num: 6,
          date: "2026-06-13",
          time: "18:00",
          team1: { name: "Polônia", code: "POL" },
          team2: { name: "Austrália", code: "AUS" },
          score1: 1,
          score2: 0,
          group: "Grupo C",
          stadium: { name: "Mercedes-Benz Stadium", city: "Atlanta" }
        },
        // Grupo G (Brasil)
        {
          num: 7,
          date: "2026-06-14",
          time: "16:00",
          team1: { name: "Brasil", code: "BRA" },
          team2: { name: "Suíça", code: "SUI" },
          score1: 3,
          score2: 1,
          group: "Grupo G",
          stadium: { name: "SoFi Stadium", city: "Los Angeles" }
        },
        {
          num: 8,
          date: "2026-06-14",
          time: "19:00",
          team1: { name: "Sérvia", code: "SRB" },
          team2: { name: "Gana", code: "GHA" },
          score1: 1,
          score2: 1,
          group: "Grupo G",
          stadium: { name: "SoFi Stadium", city: "Los Angeles" }
        }
      ]
    },
    {
      name: "Rodada 2",
      matches: [
        // Grupo A
        {
          num: 9,
          date: "2026-06-17",
          time: "15:00",
          team1: { name: "México", code: "MEX" },
          team2: { name: "Itália", code: "ITA" },
          score1: null,
          score2: null,
          group: "Grupo A",
          stadium: { name: "Estádio Azteca", city: "Cidade do México" }
        },
        {
          num: 10,
          date: "2026-06-17",
          time: "18:00",
          team1: { name: "Equador", code: "ECU" },
          team2: { name: "Camarões", code: "CMR" },
          score1: null,
          score2: null,
          group: "Grupo A",
          stadium: { name: "Estádio Azteca", city: "Cidade do México" }
        },
        // Grupo B
        {
          num: 11,
          date: "2026-06-18",
          time: "14:00",
          team1: { name: "Estados Unidos", code: "USA" },
          team2: { name: "Inglaterra", code: "ENG" },
          score1: null,
          score2: null,
          group: "Grupo B",
          stadium: { name: "Gillette Stadium", city: "Boston" }
        },
        // Grupo G (Brasil)
        {
          num: 12,
          date: "2026-06-20",
          time: "20:00",
          team1: { name: "Brasil", code: "BRA" },
          team2: { name: "Sérvia", code: "SRB" },
          score1: null,
          score2: null,
          group: "Grupo G",
          stadium: { name: "Hard Rock Stadium", city: "Miami" }
        }
      ]
    }
  ]
};

export const groupsMetadata = {
  "Grupo A": ["MEX", "ITA", "ECU", "CMR"],
  "Grupo B": ["USA", "ENG", "IRN", "WAL"],
  "Grupo C": ["ARG", "POL", "KSA", "AUS"],
  "Grupo D": ["FRA", "DEN", "TUN", "CAN"],
  "Grupo E": ["ESP", "GER", "JPN", "CRC"],
  "Grupo F": ["BEL", "CRO", "MAR", "CHI"],
  "Grupo G": ["BRA", "SUI", "SRB", "GHA"],
  "Grupo H": ["POR", "URU", "KOR", "JAM"],
  "Grupo I": ["NED", "COL", "SEN", "PER"],
  "Grupo J": ["UKR", "SWE", "SCO", "ROU"],
  "Grupo K": ["NGA", "ALG", "EGY", "RSA"],
  "Grupo L": ["PAR", "VEN", "CIV", "NZL"]
};

// Initial full list of 48 teams mapped by code for easy reference
export const allTeamsList: { [code: string]: string } = {
  MEX: "México",
  ITA: "Itália",
  ECU: "Equador",
  CMR: "Camarões",
  USA: "Estados Unidos",
  ENG: "Inglaterra",
  IRN: "Irã",
  WAL: "Gales",
  ARG: "Argentina",
  POL: "Polônia",
  KSA: "Arábia Saudita",
  AUS: "Austrália",
  FRA: "França",
  DEN: "Dinamarca",
  TUN: "Tunísia",
  CAN: "Canadá",
  ESP: "Espanha",
  GER: "Alemanha",
  JPN: "Japão",
  CRC: "Costa Rica",
  BEL: "Bélgica",
  CRO: "Croácia",
  MAR: "Marrocos",
  CHI: "Chile",
  BRA: "Brasil",
  SUI: "Suíça",
  SRB: "Sérvia",
  GHA: "Gana",
  POR: "Portugal",
  URU: "Uruguai",
  KOR: "Coreia do Sul",
  JAM: "Jamaica",
  NED: "Holanda",
  COL: "Colômbia",
  SEN: "Senegal",
  PER: "Peru",
  UKR: "Ucrânia",
  SWE: "Suécia",
  SCO: "Escócia",
  ROU: "Romênia",
  NGA: "Nigéria",
  ALG: "Argélia",
  EGY: "Egito",
  RSA: "África do Sul",
  PAR: "Paraguai",
  VEN: "Venezuela",
  CIV: "Costa do Marfim",
  NZL: "Nova Zelândia"
};

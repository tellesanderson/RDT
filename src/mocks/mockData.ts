export interface Goal {
  minute: number;
  player: string;
  team: "home" | "away";
}

export interface Editorial {
  title: string;
  description: string;
}

export interface PlayerRating {
  id: string;
  name: string;
  position: string;
  rating_average: number;
  image_url: string;
}

export interface WatchPlatform {
  platform_name: string;
  type: string;
  icon_url: string;
}

export interface MatchData {
  match_info: {
    id: string;
    status: "FINISHED" | "LIVE" | "SCHEDULED";
    date: string;
    tournament: string;
  };
  teams: {
    home: {
      id: string;
      name: string;
      short_name: string;
      logo_url: string;
      score: number;
    };
    away: {
      id: string;
      name: string;
      short_name: string;
      logo_url: string;
      score: number;
    };
  };
  highlights_1_minuto: {
    goals: Goal[];
    editorial_positive: Editorial;
    editorial_negative: Editorial;
  };
  central_da_corneta: {
    total_votes: number;
    average_coach_rating: number;
    average_referee_rating: number;
    top_players: PlayerRating[];
    flop_players: PlayerRating[];
  };
  onde_assistir: WatchPlatform[];
}

export const mockMatchData: MatchData = {
  match_info: {
    id: "match_98765",
    status: "FINISHED", // Pode ser "LIVE", "SCHEDULED" ou "FINISHED"
    date: "2026-05-26T21:30:00Z",
    tournament: "Campeonato Brasileiro - Rodada 10"
  },
  teams: {
    home: {
      id: "team_CAP",
      name: "Athletico-PR",
      short_name: "CAP",
      logo_url: "https://media.api-sports.io/football/teams/134.png",
      score: 2
    },
    away: {
      id: "team_FLA",
      name: "Flamengo",
      short_name: "FLA",
      logo_url: "https://media.api-sports.io/football/teams/127.png",
      score: 1
    }
  },
  highlights_1_minuto: {
    goals: [
      { minute: 14, player: "Canobbio", team: "home" },
      { minute: 45, player: "Pedro", team: "away" },
      { minute: 88, player: "Zapelli", team: "home" }
    ],
    editorial_positive: {
      title: "Resiliência no fim",
      description: "O Furacão pressionou até o último minuto e garantiu a vitória em casa."
    },
    editorial_negative: {
      title: "Apagão defensivo",
      description: "A zaga visitante falhou feio no posicionamento do segundo gol."
    }
  },
  central_da_corneta: {
    total_votes: 14502,
    average_coach_rating: 8.5,
    average_referee_rating: 3.2,
    top_players: [
      { id: "p1", name: "Canobbio", position: "ATA", rating_average: 9.2, image_url: "/players/canobbio.png" },
      { id: "p2", name: "Zapelli", position: "MEI", rating_average: 8.8, image_url: "/players/zapelli.png" }
    ],
    flop_players: [
      { id: "p3", name: "Zagueiro X", position: "ZAG", rating_average: 4.1, image_url: "/players/zag.png" }
    ]
  },
  onde_assistir: [
    { platform_name: "CazéTV", type: "streaming", icon_url: "/icons/cazetv.png" },
    { platform_name: "Rede Furacão", type: "streaming", icon_url: "/icons/redefuracao.png" }
  ]
};

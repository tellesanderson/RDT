import { MatchData, mockMatchData } from "./mockData";
import { CLUBS, getClubById } from "./clubs";

// Predefined classic matchups for a premium localized experience
const MATCHUPS: Record<string, { opponentId: string; homeScore: number; awayScore: number; goals: { minute: number; player: string; isHome: boolean }[]; positive: { title: string; description: string }; negative: { title: string; description: string }; players: { home: { name: string; pos: string }[]; away: { name: string; pos: string }[] } }> = {
  fla: {
    opponentId: "vas",
    homeScore: 2,
    awayScore: 1,
    goals: [
      { minute: 12, player: "Vegetti", isHome: false },
      { minute: 45, player: "Pedro", isHome: true },
      { minute: 82, player: "Arrascaeta", isHome: true }
    ],
    positive: {
      title: "Poder do elenco",
      description: "O Rubro-Negro buscou a virada no clássico com atuação inspirada dos meias."
    },
    negative: {
      title: "Desatenção no início",
      description: "O sistema defensivo cedeu espaços logo no começo da partida e sofreu gol aéreo."
    },
    players: {
      home: [
        { name: "Pedro", pos: "ATA" },
        { name: "Arrascaeta", pos: "MEI" },
        { name: "Gerson", pos: "VOL" },
        { name: "Léo Pereira", pos: "ZAG" },
        { name: "Rossi", pos: "GOL" }
      ],
      away: [
        { name: "Vegetti", pos: "ATA" },
        { name: "Payet", pos: "MEI" },
        { name: "Léo", pos: "ZAG" }
      ]
    }
  },
  cor: {
    opponentId: "pal",
    homeScore: 2,
    awayScore: 0,
    goals: [
      { minute: 34, player: "Rodrigo Garro", isHome: true },
      { minute: 78, player: "Depay", isHome: true }
    ],
    positive: {
      title: "Arena Pulsando",
      description: "Atuação tática impecável e controle total do meio campo contra o maior rival."
    },
    negative: {
      title: "Falta de capricho",
      description: "Apesar do domínio, a equipe desperdiçou chances de aplicar uma goleada histórica."
    },
    players: {
      home: [
        { name: "Rodrigo Garro", pos: "MEI" },
        { name: "Depay", pos: "ATA" },
        { name: "André Ramalho", pos: "ZAG" },
        { name: "Hugo Souza", pos: "GOL" },
        { name: "Breno Bidon", pos: "VOL" }
      ],
      away: [
        { name: "Estêvão", pos: "ATA" },
        { name: "Raphael Veiga", pos: "MEI" },
        { name: "Weverton", pos: "GOL" }
      ]
    }
  },
  pal: {
    opponentId: "cor",
    homeScore: 3,
    awayScore: 1,
    goals: [
      { minute: 15, player: "Flaco López", isHome: true },
      { minute: 40, player: "Yuri Alberto", isHome: false },
      { minute: 62, player: "Raphael Veiga", isHome: true },
      { minute: 89, player: "Estêvão", isHome: true }
    ],
    positive: {
      title: "Mentalidade de campeão",
      description: "Força física e repertório tático garantiram mais três pontos no Derby paulista."
    },
    negative: {
      title: "Susto na defesa",
      description: "Um vacilo na transição defensiva permitiu o gol de empate temporário."
    },
    players: {
      home: [
        { name: "Raphael Veiga", pos: "MEI" },
        { name: "Estêvão", pos: "ATA" },
        { name: "Flaco López", pos: "ATA" },
        { name: "Gustavo Gómez", pos: "ZAG" },
        { name: "Aníbal Moreno", pos: "VOL" }
      ],
      away: [
        { name: "Yuri Alberto", pos: "ATA" },
        { name: "Garro", pos: "MEI" },
        { name: "Hugo Souza", pos: "GOL" }
      ]
    }
  },
  sao: {
    opponentId: "cor",
    homeScore: 1,
    awayScore: 0,
    goals: [
      { minute: 58, player: "Jonathan Calleri", isHome: true }
    ],
    positive: {
      title: "Soberano no MorumBIS",
      description: "A marcação sob pressão surtiu efeito e isolou as principais peças do rival."
    },
    negative: {
      title: "Pontaria descalibrada",
      description: "Muitas chances criadas pelas pontas que terminaram em finalizações sem perigo."
    },
    players: {
      home: [
        { name: "Calleri", pos: "ATA" },
        { name: "Lucas Moura", pos: "ATA" },
        { name: "Alisson", pos: "VOL" },
        { name: "Arboleda", pos: "ZAG" },
        { name: "Rafael", pos: "GOL" }
      ],
      away: [
        { name: "Yuri Alberto", pos: "ATA" },
        { name: "Garro", pos: "MEI" }
      ]
    }
  },
  vas: {
    opponentId: "fla",
    homeScore: 2,
    awayScore: 2,
    goals: [
      { minute: 15, player: "Vegetti", isHome: true },
      { minute: 32, player: "Pedro", isHome: false },
      { minute: 60, player: "Gerson", isHome: false },
      { minute: 90, player: "Coutinho", isHome: true }
    ],
    positive: {
      title: "Luta até o fim",
      description: "Empate heroico nos acréscimos com gol de Coutinho incendeia São Januário."
    },
    negative: {
      title: "Erros de transição",
      description: "O time cedeu o controle do meio campo no segundo tempo, permitindo a virada parcial."
    },
    players: {
      home: [
        { name: "Vegetti", pos: "ATA" },
        { name: "Philippe Coutinho", pos: "MEI" },
        { name: "Hugo Moura", pos: "VOL" },
        { name: "Léo Jardim", pos: "GOL" },
        { name: "João Victor", pos: "ZAG" }
      ],
      away: [
        { name: "Pedro", pos: "ATA" },
        { name: "Gerson", pos: "VOL" }
      ]
    }
  },
  gre: {
    opponentId: "int",
    homeScore: 1,
    awayScore: 0,
    goals: [
      { minute: 72, player: "Cristaldo", isHome: true }
    ],
    positive: {
      title: "Imortalidade tricolor",
      description: "Vitória cirúrgica no Gre-Nal com raça defensiva e contra-ataques precisos."
    },
    negative: {
      title: "Ansiedade na posse",
      description: "Muitos passes errados na intermediária geraram contra-ataques perigosos."
    },
    players: {
      home: [
        { name: "Cristaldo", pos: "MEI" },
        { name: "Villasanti", pos: "VOL" },
        { name: "Kannemann", pos: "ZAG" },
        { name: "Marchesín", pos: "GOL" },
        { name: "Soteldo", pos: "ATA" }
      ],
      away: [
        { name: "Alan Patrick", pos: "MEI" },
        { name: "Borré", pos: "ATA" }
      ]
    }
  },
  int: {
    opponentId: "gre",
    homeScore: 2,
    awayScore: 1,
    goals: [
      { minute: 15, player: "Borré", isHome: true },
      { minute: 45, player: "Soteldo", isHome: false },
      { minute: 70, player: "Alan Patrick", isHome: true }
    ],
    positive: {
      title: "Intensidade Colorada",
      description: "Pressão alta sufocante e ótima movimentação ofensiva na vitória clássica."
    },
    negative: {
      title: "Descuidou no fim",
      description: "Time recuou nos minutos finais e deu espaço para o rival pressionar na bola aérea."
    },
    players: {
      home: [
        { name: "Alan Patrick", pos: "MEI" },
        { name: "Rafael Borré", pos: "ATA" },
        { name: "Thiago Maia", pos: "VOL" },
        { name: "Rochet", pos: "GOL" },
        { name: "Vitão", pos: "ZAG" }
      ],
      away: [
        { name: "Soteldo", pos: "ATA" },
        { name: "Villasanti", pos: "VOL" }
      ]
    }
  },
  cam: {
    opponentId: "cru",
    homeScore: 3,
    awayScore: 1,
    goals: [
      { minute: 8, player: "Hulk", isHome: true },
      { minute: 23, player: "Paulinho", isHome: true },
      { minute: 45, player: "Matheus Pereira", isHome: false },
      { minute: 87, player: "Gustavo Scarpa", isHome: true }
    ],
    positive: {
      title: "Galão Imponente",
      description: "Dupla Hulk e Paulinho inspirada desmantela a zaga rival no primeiro tempo."
    },
    negative: {
      title: "Espaço no meio",
      description: "A zaga ficou muito exposta aos lançamentos longos do meio de campo adversário."
    },
    players: {
      home: [
        { name: "Hulk", pos: "ATA" },
        { name: "Paulinho", pos: "ATA" },
        { name: "Gustavo Scarpa", pos: "MEI" },
        { name: "Battaglia", pos: "ZAG" },
        { name: "Everson", pos: "GOL" }
      ],
      away: [
        { name: "Matheus Pereira", pos: "MEI" },
        { name: "Kaio Jorge", pos: "ATA" }
      ]
    }
  },
  cru: {
    opponentId: "cam",
    homeScore: 2,
    awayScore: 0,
    goals: [
      { minute: 40, player: "Matheus Pereira", isHome: true },
      { minute: 74, player: "Kaio Jorge", isHome: true }
    ],
    positive: {
      title: "Nação Azul em Festa",
      description: "Atuação madura, compacta defensivamente e letal nas poucas chances criadas."
    },
    negative: {
      title: "Precipitação",
      description: "Alguns passes de contra-ataque foram mal executados no segundo tempo."
    },
    players: {
      home: [
        { name: "Matheus Pereira", pos: "MEI" },
        { name: "Kaio Jorge", pos: "ATA" },
        { name: "Lucas Romero", pos: "VOL" },
        { name: "Cássio", pos: "GOL" },
        { name: "João Marcelo", pos: "ZAG" }
      ],
      away: [
        { name: "Hulk", pos: "ATA" },
        { name: "Scarpa", pos: "MEI" }
      ]
    }
  },
  san: {
    opponentId: "cor",
    homeScore: 1,
    awayScore: 0,
    goals: [
      { minute: 61, player: "Otero", isHome: true }
    ],
    positive: {
      title: "Mística da Vila",
      description: "Jogo brigado, com forte marcação e gol de falta decisivo para a vitória."
    },
    negative: {
      title: "Pouca criatividade",
      description: "Dificuldade em furar a retranca do adversário por meio de jogadas trabalhadas."
    },
    players: {
      home: [
        { name: "Otero", pos: "MEI" },
        { name: "João Schmidt", pos: "VOL" },
        { name: "Gil", pos: "ZAG" },
        { name: "Gabriel Brazão", pos: "GOL" },
        { name: "Guilherme", pos: "ATA" }
      ],
      away: [
        { name: "Yuri Alberto", pos: "ATA" },
        { name: "Garro", pos: "MEI" }
      ]
    }
  },
  bot: {
    opponentId: "flu",
    homeScore: 3,
    awayScore: 0,
    goals: [
      { minute: 15, player: "Luiz Henrique", isHome: true },
      { minute: 48, player: "Igor Jesus", isHome: true },
      { minute: 81, player: "Thiago Almada", isHome: true }
    ],
    positive: {
      title: "Estilo avassalador",
      description: "O Glorioso dominou amplamente com transições rápidas e forte pressão ofensiva."
    },
    negative: {
      title: "Relaxamento temporário",
      description: "Pequenos sustos na saída de bola no início do segundo tempo por puro excesso de confiança."
    },
    players: {
      home: [
        { name: "Luiz Henrique", pos: "ATA" },
        { name: "Igor Jesus", pos: "ATA" },
        { name: "Thiago Almada", pos: "MEI" },
        { name: "Alexander Barboza", pos: "ZAG" },
        { name: "John", pos: "GOL" }
      ],
      away: [
        { name: "Ganso", pos: "MEI" },
        { name: "Fábio", pos: "GOL" }
      ]
    }
  },
  flu: {
    opponentId: "bot",
    homeScore: 2,
    awayScore: 1,
    goals: [
      { minute: 20, player: "Jhon Arias", isHome: true },
      { minute: 55, player: "Ganso", isHome: true },
      { minute: 79, player: "Igor Jesus", isHome: false }
    ],
    positive: {
      title: "Posse e controle",
      description: "O Fluminense controlou o ritmo da partida através da troca de passes de Ganso e Arias."
    },
    negative: {
      title: "Vulnerabilidade no final",
      description: "Pressão na saída de bola gerou chances para o adversário diminuir o placar."
    },
    players: {
      home: [
        { name: "Jhon Arias", pos: "ATA" },
        { name: "Ganso", pos: "MEI" },
        { name: "Thiago Silva", pos: "ZAG" },
        { name: "Martinelli", pos: "VOL" },
        { name: "Fábio", pos: "GOL" }
      ],
      away: [
        { name: "Luiz Henrique", pos: "ATA" },
        { name: "Almada", pos: "MEI" }
      ]
    }
  },
  cap: {
    opponentId: "cfc",
    homeScore: 2,
    awayScore: 1,
    goals: [
      { minute: 14, player: "Canobbio", isHome: true },
      { minute: 45, player: "Robson", isHome: false },
      { minute: 88, player: "Zapelli", isHome: true }
    ],
    positive: {
      title: "Resiliência no Atletiba",
      description: "O Furacão pressionou até o último minuto e garantiu a vitória em casa no clássico."
    },
    negative: {
      title: "Apagão defensivo",
      description: "A zaga cedeu a igualdade na reta final do primeiro tempo por desatenção aérea."
    },
    players: {
      home: [
        { name: "Canobbio", pos: "ATA" },
        { name: "Zapelli", pos: "MEI" },
        { name: "Fernandinho", pos: "VOL" },
        { name: "Thiago Heleno", pos: "ZAG" },
        { name: "Mycael", pos: "GOL" }
      ],
      away: [
        { name: "Robson", pos: "ATA" },
        { name: "Matheus Frizzo", pos: "MEI" }
      ]
    }
  },
  cfc: {
    opponentId: "cap",
    homeScore: 1,
    awayScore: 1,
    goals: [
      { minute: 12, player: "Frizzo", isHome: true },
      { minute: 70, player: "Canobbio", isHome: false }
    ],
    positive: {
      title: "Postura aguerrida",
      description: "Coxa batalhou no meio campo e soube conter as investidas do rival fora de casa."
    },
    negative: {
      title: "Excesso de faltas",
      description: "Muitos cartões desnecessários geraram fragilidade defensiva na bola parada."
    },
    players: {
      home: [
        { name: "Matheus Frizzo", pos: "MEI" },
        { name: "Robson", pos: "ATA" },
        { name: "Sebastián Gómez", pos: "VOL" },
        { name: "Benevenuto", pos: "ZAG" },
        { name: "Pedro Morisco", pos: "GOL" }
      ],
      away: [
        { name: "Canobbio", pos: "ATA" },
        { name: "Zapelli", pos: "MEI" }
      ]
    }
  },
  bah: {
    opponentId: "for",
    homeScore: 2,
    awayScore: 1,
    goals: [
      { minute: 34, player: "Cauly", isHome: true },
      { minute: 50, player: "Lucero", isHome: false },
      { minute: 88, player: "Everaldo", isHome: true }
    ],
    positive: {
      title: "Poder da Fonte Nova",
      description: "A torcida empurrou e Cauly comandou o meio campo na vitória sobre o tricolor cearense."
    },
    negative: {
      title: "Lentidão nas pontas",
      description: "Dificuldade na recomposição defensiva rápida permitiu o gol de empate do rival."
    },
    players: {
      home: [
        { name: "Cauly", pos: "MEI" },
        { name: "Everaldo", pos: "ATA" },
        { name: "Everton Ribeiro", pos: "MEI" },
        { name: "Gabriel Xavier", pos: "ZAG" },
        { name: "Marcos Felipe", pos: "GOL" }
      ],
      away: [
        { name: "Lucero", pos: "ATA" },
        { name: "Pikachu", pos: "ATA" }
      ]
    }
  },
  for: {
    opponentId: "bah",
    homeScore: 2,
    awayScore: 0,
    goals: [
      { minute: 22, player: "Lucero", isHome: true },
      { minute: 75, player: "Yago Pikachu", isHome: true }
    ],
    positive: {
      title: "Força no Castelão",
      description: "Marcação por zona eficiente e transições letais com Pikachu e Lucero em sintonia."
    },
    negative: {
      title: "Recuo excessivo",
      description: "Time recuou demais no final da partida, dependendo de boas defesas para garantir o placar."
    },
    players: {
      home: [
        { name: "Juan Martín Lucero", pos: "ATA" },
        { name: "Yago Pikachu", pos: "ATA" },
        { name: "Hércules", pos: "VOL" },
        { name: "Titi", pos: "ZAG" },
        { name: "João Ricardo", pos: "GOL" }
      ],
      away: [
        { name: "Cauly", pos: "MEI" },
        { name: "Everton Ribeiro", pos: "MEI" }
      ]
    }
  }
};

export const getMatchDataForClub = (clubId: string): MatchData => {
  // If the club is Athletico-PR or Flamengo, we can just use the provided mockMatchData
  // but customize who is home/away to match selected club if applicable.
  // Or we can use our detailed MATCHUPS database.
  const matchup = MATCHUPS[clubId];
  if (!matchup) {
    return mockMatchData;
  }

  const homeClub = getClubById(clubId)!;
  const awayClub = getClubById(matchup.opponentId)!;

  // Generate dynamic goals based on matchup.goals
  const goals = matchup.goals.map(g => ({
    minute: g.minute,
    player: g.player,
    team: g.isHome ? "home" as const : "away" as const
  }));

  // Create mock top and flop players list dynamically
  const homePlayers = matchup.players.home.map((p, idx) => ({
    id: `hp-${idx}`,
    name: p.name,
    position: p.pos,
    rating_average: idx === 0 ? 8.9 : idx === 1 ? 8.3 : 7.2 - idx * 0.5,
    image_url: ""
  }));

  const awayPlayers = matchup.players.away.map((p, idx) => ({
    id: `ap-${idx}`,
    name: p.name,
    position: p.pos,
    rating_average: idx === 0 ? 7.8 : 6.0 - idx * 0.8,
    image_url: ""
  }));

  // Combine and sort to get top/flop lists
  const allPlayers = [...homePlayers, ...awayPlayers];
  const sortedPlayers = [...allPlayers].sort((a, b) => b.rating_average - a.rating_average);

  const top_players = sortedPlayers.slice(0, 2);
  const flop_players = sortedPlayers.reverse().slice(0, 1);

  return {
    match_info: {
      id: `match_${clubId}`,
      status: "FINISHED",
      date: new Date().toISOString(),
      tournament: "Campeonato Brasileiro - Rodada Atual"
    },
    teams: {
      home: {
        id: `team_${homeClub.shortName}`,
        name: homeClub.name,
        short_name: homeClub.shortName,
        logo_url: `club_logo_${homeClub.id}`, // Custom marker
        score: matchup.homeScore
      },
      away: {
        id: `team_${awayClub.shortName}`,
        name: awayClub.name,
        short_name: awayClub.shortName,
        logo_url: `club_logo_${awayClub.id}`, // Custom marker
        score: matchup.awayScore
      }
    },
    highlights_1_minuto: {
      goals,
      editorial_positive: matchup.positive,
      editorial_negative: matchup.negative
    },
    central_da_corneta: {
      total_votes: 8200 + Math.floor(Math.random() * 5000),
      average_coach_rating: parseFloat((6.5 + Math.random() * 2).toFixed(1)),
      average_referee_rating: parseFloat((3.0 + Math.random() * 1.5).toFixed(1)),
      top_players,
      flop_players
    },
    onde_assistir: [
      { platform_name: "Premiere", type: "ppv", icon_url: "/icons/premiere.png" },
      { platform_name: "Globo", type: "tv", icon_url: "/icons/globo.png" }
    ]
  };
};

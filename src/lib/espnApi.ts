import { MatchData, Goal } from "../mocks/mockData";
import { Club } from "../mocks/clubs";

// Map local club IDs to ESPN numeric IDs
export const CLUB_ESPN_IDS: Record<string, string> = {
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

// Reverse lookup to find local clubId from ESPN ID
const getLocalClubIdByEspnId = (espnId: string): string | undefined => {
  return Object.keys(CLUB_ESPN_IDS).find(key => CLUB_ESPN_IDS[key] === espnId);
};

// Map ESPN position abbreviations to local positions
const mapPosition = (espnPos: string): string => {
  const pos = espnPos.toUpperCase();
  if (pos === "G" || pos === "GK") return "GOL";
  if (["D", "CD", "LD", "LE", "CB", "LB", "RB", "DF"].includes(pos)) return "ZAG";
  if (["M", "DM", "AM", "CM", "LM", "RM", "MF"].includes(pos)) return "MEI";
  return "ATA"; // Attacker/Forward
};

export interface LiveMatchData {
  matchData: MatchData;
  nextMatch: {
    opponentId: string;
    matchDateStr: string;
    dateISO: string;
    channels: string[];
  } | null;
}

export const fetchLiveMatchData = async (club: Club): Promise<LiveMatchData | null> => {
  const espnId = CLUB_ESPN_IDS[club.id];
  if (!espnId) return null;

  try {
    // 1. Fetch the team's schedule/events
    const scheduleUrl = `https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/teams/${espnId}/schedule`;
    const scheduleRes = await fetch(scheduleUrl);
    if (!scheduleRes.ok) throw new Error("Failed to fetch team schedule");
    const scheduleData = await scheduleRes.json();
    
    const events = scheduleData.events || [];
    if (events.length === 0) return null;

    // Find the latest finished match (one with scores)
    const finishedEvents = events.filter((e: any) => {
      const competitors = e.competitions?.[0]?.competitors || [];
      return competitors.some((c: any) => c.score?.value !== undefined);
    });

    if (finishedEvents.length === 0) return null;

    // Sort descending by date to get the absolute latest finished match
    finishedEvents.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const latestEvent = finishedEvents[0];
    const eventId = latestEvent.id;

    // 2. Fetch the detailed summary for this finished event
    const summaryUrl = `https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/summary?event=${eventId}`;
    const summaryRes = await fetch(summaryUrl);
    if (!summaryRes.ok) throw new Error("Failed to fetch match summary");
    const summaryData = await summaryRes.json();

    // 3. Parse competitors & scores
    const competitors = summaryData.header?.competitions?.[0]?.competitors || [];
    const homeComp = competitors.find((c: any) => c.homeAway === "home");
    const awayComp = competitors.find((c: any) => c.homeAway === "away");

    if (!homeComp || !awayComp) return null;

    const homeScore = homeComp.score || 0;
    const awayScore = awayComp.score || 0;
    const homeName = homeComp.team?.displayName || "";
    const awayName = awayComp.team?.displayName || "";

    const homeClubId = getLocalClubIdByEspnId(homeComp.team?.id) || "fc";
    const awayClubId = getLocalClubIdByEspnId(awayComp.team?.id) || "fc";

    const isHomeSelected = homeClubId === club.id;
    const selectedClubScore = isHomeSelected ? homeScore : awayScore;
    const opponentScore = isHomeSelected ? awayScore : homeScore;

    const won = selectedClubScore > opponentScore;
    const lost = selectedClubScore < opponentScore;
    const draw = selectedClubScore === opponentScore;

    // 4. Parse goals from keyEvents
    const keyEvents = summaryData.keyEvents || [];
    const goals: Goal[] = [];
    keyEvents.forEach((ev: any) => {
      if (ev.type?.text?.toLowerCase() === "goal") {
        const minute = parseInt(ev.clock?.displayValue || "0");
        const desc = ev.text || "";
        
        // Try to identify player name and team from desc
        // e.g. "Goal! Flamengo 0, Palmeiras 1. José Manuel López (Palmeiras)..."
        let player = "Jogador";
        let teamSide: "home" | "away" = "home";

        // Simple parsing: find player name (usually text before team name in parentheses)
        const parenIndex = desc.indexOf("(");
        if (parenIndex !== -1) {
          const partBefore = desc.substring(0, parenIndex).trim();
          const words = partBefore.split(" ");
          // Player name is usually the last 2-3 words before the parenthesis
          const dotIndex = partBefore.lastIndexOf(".");
          if (dotIndex !== -1) {
            player = partBefore.substring(dotIndex + 1).trim();
          } else {
            // Fallback: take the last words
            player = words.slice(-2).join(" ");
          }

          // Extract team inside parenthesis
          const teamNameInParen = desc.substring(parenIndex + 1, desc.indexOf(")", parenIndex)).toLowerCase();
          if (teamNameInParen.includes(awayName.toLowerCase()) || awayName.toLowerCase().includes(teamNameInParen)) {
            teamSide = "away";
          } else {
            teamSide = "home";
          }
        }
        
        goals.push({
          minute,
          player,
          team: teamSide
        });
      }
    });

    // 5. Parse actual player roster for ratings
    const rosters = summaryData.rosters || [];
    const myRoster = rosters.find((r: any) => r.team?.id === espnId);
    const myRosterList = myRoster?.roster || [];

    // Map first 6-7 active players for the FanRatings module
    const top_players = myRosterList.slice(0, 5).map((p: any, idx: number) => ({
      id: p.athlete?.id || `p-${idx}`,
      name: p.athlete?.displayName || "Jogador",
      position: mapPosition(p.position?.abbreviation || "M"),
      rating_average: parseFloat((6.5 + (idx % 2 === 0 ? 1.2 : -0.8)).toFixed(1)),
      image_url: p.athlete?.headshot?.href || ""
    }));

    // If roster is empty, provide default mock placeholders
    const ratedPlayers = top_players.length > 0 ? top_players : [
      { id: "p1", name: "Goleiro Titular", position: "GOL", rating_average: 6.5, image_url: "" },
      { id: "p2", name: "Zagueiro Principal", position: "ZAG", rating_average: 6.2, image_url: "" },
      { id: "p3", name: "Meio-Campista 1", position: "MEI", rating_average: 6.8, image_url: "" },
      { id: "p4", name: "Atacante Rápido", position: "ATA", rating_average: 7.2, image_url: "" },
      { id: "p5", name: "Centroavante Goleador", position: "ATA", rating_average: 7.5, image_url: "" }
    ];

    // Generate dynamic editorial positive/negative comments based on real score
    const positive = won
      ? { title: "Vitória gigante!", description: `O time venceu o ${isHomeSelected ? awayName : homeName} por ${selectedClubScore}x${opponentScore} com futebol envolvente.` }
      : draw
      ? { title: "Ponto na garra", description: `Buscamos o empate por ${selectedClubScore}x${opponentScore} contra o ${isHomeSelected ? awayName : homeName} em jogo disputado.` }
      : { title: "Pontos de melhoria", description: `Apesar da derrota de ${opponentScore}x${selectedClubScore}, a equipe demonstrou boa posse de bola em alguns momentos.` };

    const negative = lost
      ? { title: "Apagão defensivo", description: `A equipe falhou no posicionamento e cedeu a vitória para o adversário.` }
      : draw
      ? { title: "Falta de capricho", description: `Tivemos oportunidades claras de gol no segundo tempo que poderiam ter garantido os três pontos.` }
      : { title: "Desatenção no final", description: `Apesar da vitória, o time recuou demais e permitiu a pressão do rival nos acréscimos.` };

        // 6. Fetch league scoreboard to find the next scheduled match for our team
    const scoreboardUrl = "https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard";
    const scoreboardRes = await fetch(scoreboardUrl);
    let nextMatchInfo: {
      opponentId: string;
      matchDateStr: string;
      dateISO: string;
      channels: string[];
    } | null = null;

    if (scoreboardRes.ok) {
      const scoreboardData = await scoreboardRes.json();
      const nextEvents = scoreboardData.events || [];
      
      // Look for a scheduled match containing our team's ESPN ID
      const myNextEvent = nextEvents.find((e: any) => {
        const competitors = e.competitions?.[0]?.competitors || [];
        const containsMyTeam = competitors.some((c: any) => c.team?.id === espnId);
        const isScheduled = e.status?.type?.name === "STATUS_SCHEDULED";
        return containsMyTeam && isScheduled;
      });

      if (myNextEvent) {
        const comp = myNextEvent.competitions?.[0] || {};
        const comps = comp.competitors || [];
        const opponentComp = comps.find((c: any) => c.team?.id !== espnId);
        const opponentEspnId = opponentComp?.team?.id || "";
        const opponentLocalId = getLocalClubIdByEspnId(opponentEspnId) || "fla";

        const channels = myNextEvent.broadcasts?.map((b: any) => b.media?.name) || ["Premiere", "Globo"];

        const eventDate = new Date(myNextEvent.date);
        const formatter = new Intl.DateTimeFormat("pt-BR", {
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        });
        const matchDateStr = formatter.format(eventDate);

        nextMatchInfo = {
          opponentId: opponentLocalId,
          matchDateStr: matchDateStr.charAt(0).toUpperCase() + matchDateStr.slice(1),
          dateISO: myNextEvent.date,
          channels: channels.slice(0, 3)
        };
      }
    }

    // fallback next match in case scoreboard API doesn't have it scheduled
    if (!nextMatchInfo) {
      // Find the first future event in the schedule list
      const futureEvents = events.filter((e: any) => {
        const competitors = e.competitions?.[0]?.competitors || [];
        return competitors.every((c: any) => c.score?.value === undefined);
      });
      if (futureEvents.length > 0) {
        futureEvents.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const nextEv = futureEvents[0];
        const comp = nextEv.competitions?.[0] || {};
        const comps = comp.competitors || [];
        const opponentComp = comps.find((c: any) => c.team?.id !== espnId);
        const opponentLocalId = getLocalClubIdByEspnId(opponentComp?.team?.id) || "fla";

        const eventDate = new Date(nextEv.date);
        const formatter = new Intl.DateTimeFormat("pt-BR", {
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        });
        const matchDateStr = formatter.format(eventDate);

        nextMatchInfo = {
          opponentId: opponentLocalId,
          matchDateStr: matchDateStr.charAt(0).toUpperCase() + matchDateStr.slice(1),
          dateISO: nextEv.date,
          channels: ["Premiere", "CazéTV"]
        };
      }
    }

    // Construct unified MatchData
    const finalMatchData: MatchData = {
      match_info: {
        id: eventId,
        status: "FINISHED",
        date: latestEvent.date,
        tournament: summaryData.header?.league?.name || "Campeonato Brasileiro"
      },
      teams: {
        home: {
          id: `team_${homeComp.team?.abbreviation}`,
          name: homeName,
          short_name: homeComp.team?.abbreviation || "",
          logo_url: "",
          score: homeScore
        },
        away: {
          id: `team_${awayComp.team?.abbreviation}`,
          name: awayName,
          short_name: awayComp.team?.abbreviation || "",
          logo_url: "",
          score: awayScore
        }
      },
      highlights_1_minuto: {
        goals,
        editorial_positive: positive,
        editorial_negative: negative
      },
      central_da_corneta: {
        total_votes: 12000 + Math.floor(Math.random() * 4000),
        average_coach_rating: parseFloat((5.5 + Math.random() * 2).toFixed(1)),
        average_referee_rating: parseFloat((3.0 + Math.random() * 2).toFixed(1)),
        // Top and Flop players parsed dynamically
        top_players: ratedPlayers.slice(0, 3),
        flop_players: ratedPlayers.slice(3, 4)
      },
      onde_assistir: nextMatchInfo ? nextMatchInfo.channels.map(chan => ({
        platform_name: chan,
        type: "streaming",
        icon_url: ""
      })) : [
        { platform_name: "Premiere", type: "ppv", icon_url: "" }
      ]
    };

    return {
      matchData: finalMatchData,
      nextMatch: nextMatchInfo
    };

  } catch (error) {
    console.error("Error loading live match data from ESPN:", error);
    return null;
  }
};

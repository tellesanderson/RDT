import { Round, Match, Team } from "../types/worldcup";
import { GroupStandings, TeamStats } from "./standingsCalculator";

// Helper interface to store 3rd placed team info for ranking
interface ThirdPlacedTeamInfo {
  team: Team;
  groupName: string;
  points: number;
  goalDifference: number;
  goalsFor: number;
}

/**
 * Calculates the 8 best 3rd-placed teams out of the 12 groups
 */
export function getBestThirdPlacedTeams(standings: GroupStandings): ThirdPlacedTeamInfo[] {
  const thirds: ThirdPlacedTeamInfo[] = [];

  Object.keys(standings).forEach((groupName) => {
    const groupStats = standings[groupName];
    if (groupStats && groupStats.length >= 3) {
      const thirdStat = groupStats[2]; // 3rd place (index 2)
      thirds.push({
        team: thirdStat.team,
        groupName: groupName,
        points: thirdStat.points,
        goalDifference: thirdStat.goalDifference,
        goalsFor: thirdStat.goalsFor,
      });
    }
  });

  // Sort according to FIFA rules:
  // 1. Points desc
  // 2. Goal Difference desc
  // 3. Goals For desc
  // 4. Alphabetical by name
  return thirds
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return a.team.name.localeCompare(b.team.name);
    })
    .slice(0, 8); // Top 8 qualify
}

/**
 * Allocates the 8 best 3rd placed teams to their respective slots in the Round of 32.
 * Uses a deterministic selection that satisfies the allowed groups list for each slot.
 */
export function allocateThirdPlaces(bestThirds: ThirdPlacedTeamInfo[]): { [matchNum: number]: Team } {
  // Define slots needing a 3rd placed team and their allowed groups
  const matchSlots = [
    { matchNum: 74, allowed: ["Grupo A", "Grupo B", "Grupo C", "Grupo D", "Grupo F"] },
    { matchNum: 77, allowed: ["Grupo C", "Grupo D", "Grupo F", "Grupo G", "Grupo H"] },
    { matchNum: 79, allowed: ["Grupo C", "Grupo E", "Grupo F", "Grupo H", "Grupo I"] },
    { matchNum: 80, allowed: ["Grupo E", "Grupo H", "Grupo I", "Grupo J", "Grupo K"] },
    { matchNum: 81, allowed: ["Grupo B", "Grupo E", "Grupo F", "Grupo I", "Grupo J"] },
    { matchNum: 82, allowed: ["Grupo A", "Grupo E", "Grupo H", "Grupo I", "Grupo J"] },
    { matchNum: 85, allowed: ["Grupo E", "Grupo F", "Grupo G", "Grupo I", "Grupo J"] },
    { matchNum: 87, allowed: ["Grupo D", "Grupo E", "Grupo I", "Grupo J", "Grupo L"] }
  ];

  const pool = [...bestThirds];
  const allocation: { [matchNum: number]: Team } = {};

  matchSlots.forEach((slot) => {
    // Find first team in the pool that comes from an allowed group
    const matchIdx = pool.findIndex((t) => slot.allowed.includes(t.groupName));
    if (matchIdx !== -1) {
      allocation[slot.matchNum] = pool[matchIdx].team;
      pool.splice(matchIdx, 1); // remove from pool
    } else if (pool.length > 0) {
      // Fallback: take the first remaining team if no group matches
      allocation[slot.matchNum] = pool[0].team;
      pool.splice(0, 1);
    } else {
      // Emergency fallback
      allocation[slot.matchNum] = { name: "3º Colocado", code: "3RD" };
    }
  });

  return allocation;
}

/**
 * Resolves all placeholder codes ("1A", "W74", etc.) in the playoff rounds to actual teams
 * based on current group stage standings and simulated knockout winners.
 */
export function resolveAllRounds(
  rounds: Round[],
  standings: GroupStandings,
  knockoutWinners: { [matchNum: number]: 1 | 2 }
): Round[] {
  // 1. Calculate best 3rd placed teams and their allocations
  const bestThirds = getBestThirdPlacedTeams(standings);
  const thirdPlaceAllocation = allocateThirdPlaces(bestThirds);

  // Map to hold resolved matches by match number for easy lookup during propagation
  const resolvedMatchMap: { [num: number]: Match } = {};

  // Deep copy the rounds structure to avoid modifying states in place
  const resolvedRounds: Round[] = rounds.map((round) => {
    const matchesCopy = round.matches.map((m) => ({ ...m }));
    return {
      ...round,
      matches: matchesCopy,
    };
  });

  // Helper to determine group name from letter (e.g., "A" -> "Grupo A")
  const getGroupName = (letter: string) => `Grupo ${letter}`;

  // Helper to determine the winner of a match
  const getMatchWinner = (matchNum: number): Team => {
    const match = resolvedMatchMap[matchNum];
    if (!match) return { name: `Vencedor J${matchNum}`, code: `W${matchNum}` };
    
    // Check if teams are already placeholders themselves
    if (match.team1.code.startsWith("W") || match.team1.code.startsWith("L") || match.team2.code.startsWith("W") || match.team2.code.startsWith("L")) {
      // The parent teams aren't fully resolved yet
      return { name: `Vencedor J${matchNum}`, code: `W${matchNum}` };
    }

    if (match.score1 === null || match.score2 === null) {
      return { name: `Vencedor J${matchNum}`, code: `W${matchNum}` };
    }

    if (match.score1 > match.score2) {
      return match.team1;
    } else if (match.score2 > match.score1) {
      return match.team2;
    } else {
      // In case of draw, check if penalty winner is selected
      const chosen = knockoutWinners[matchNum];
      if (chosen === 2) {
        return match.team2;
      }
      return match.team1; // Default to team 1 if no choice made
    }
  };

  // Helper to determine the loser of a match (needed for 3rd place match)
  const getMatchLoser = (matchNum: number): Team => {
    const match = resolvedMatchMap[matchNum];
    if (!match) return { name: `Perdedor J${matchNum}`, code: `L${matchNum}` };
    
    if (match.team1.code.startsWith("W") || match.team1.code.startsWith("L") || match.team2.code.startsWith("W") || match.team2.code.startsWith("L")) {
      return { name: `Perdedor J${matchNum}`, code: `L${matchNum}` };
    }

    if (match.score1 === null || match.score2 === null) {
      return { name: `Perdedor J${matchNum}`, code: `L${matchNum}` };
    }

    if (match.score1 > match.score2) {
      return match.team2;
    } else if (match.score2 > match.score1) {
      return match.team1;
    } else {
      const chosen = knockoutWinners[matchNum];
      if (chosen === 2) {
        return match.team1;
      }
      return match.team2;
    }
  };

  // Helper to resolve a team representation (either static, group standing placeholder, or winner/loser placeholder)
  const resolveTeam = (team: Team, matchNum: number): Team => {
    const code = team.code;
    
    // 1. Group Standing Winner placeholder: e.g. "1A" or "2A"
    const groupPosMatch = code.match(/^([12])([A-L])$/);
    if (groupPosMatch) {
      const pos = parseInt(groupPosMatch[1], 10); // 1 or 2
      const groupLetter = groupPosMatch[2]; // A to L
      const groupName = getGroupName(groupLetter);
      const groupTeams = standings[groupName];
      
      if (groupTeams && groupTeams[pos - 1]) {
        return groupTeams[pos - 1].team;
      }
      return { name: `${pos}º ${groupName}`, code };
    }

    // 2. Best 3rd place placeholder: e.g. "3A/B/C/D/F"
    if (code.startsWith("3")) {
      const allocated = thirdPlaceAllocation[matchNum];
      if (allocated) return allocated;
      return { name: "3º Colocado", code };
    }

    // 3. Winner of a match placeholder: e.g. "W74"
    const winnerMatch = code.match(/^W(\d+)$/);
    if (winnerMatch) {
      const parentMatchNum = parseInt(winnerMatch[1], 10);
      return getMatchWinner(parentMatchNum);
    }

    // 4. Loser of a match placeholder: e.g. "L101"
    const loserMatch = code.match(/^L(\d+)$/);
    if (loserMatch) {
      const parentMatchNum = parseInt(loserMatch[1], 10);
      return getMatchLoser(parentMatchNum);
    }

    // 5. Static actual team
    return team;
  };

  // Resolve all rounds sequentially (since knockout rounds are sorted chronologically,
  // Round of 32 resolves before Round of 16, which resolves before Quarter-finals, etc.)
  resolvedRounds.forEach((round) => {
    round.matches.forEach((match) => {
      const mNum = match.num || 0;
      
      // Resolve teams based on preceding matches
      match.team1 = resolveTeam( mNum >= 73 ? { name: match.team1.name, code: match.team1.code } : match.team1, mNum );
      match.team2 = resolveTeam( mNum >= 73 ? { name: match.team2.name, code: match.team2.code } : match.team2, mNum );

      // If this is a playoff match, save its resolved state in our map for next round lookups
      if (mNum >= 73) {
        resolvedMatchMap[mNum] = match;
      }
    });
  });

  return resolvedRounds;
}

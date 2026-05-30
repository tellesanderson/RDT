import { Match, Team } from "../types/worldcup";

export interface TeamStats {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface GroupStandings {
  [groupName: string]: TeamStats[];
}

export function calculateStandings(matches: Match[]): GroupStandings {
  const standings: { [groupName: string]: { [teamCode: string]: TeamStats } } = {};

  // Helper to ensure team has stats initialized
  const initTeamStats = (group: string, team: Team) => {
    if (!standings[group]) {
      standings[group] = {};
    }
    if (!standings[group][team.code]) {
      standings[group][team.code] = {
        team,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      };
    }
  };

  matches.forEach((match) => {
    const groupName = match.group;
    if (!groupName) return; // Ignore playoff matches for group standings

    const team1 = match.team1;
    const team2 = match.team2;

    initTeamStats(groupName, team1);
    initTeamStats(groupName, team2);

    const score1 = match.score1;
    const score2 = match.score2;

    // Only calculate if scores are present (not null)
    if (score1 !== null && score2 !== null) {
      const stats1 = standings[groupName][team1.code];
      const stats2 = standings[groupName][team2.code];

      stats1.played += 1;
      stats2.played += 1;

      stats1.goalsFor += score1;
      stats2.goalsFor += score2;

      stats1.goalsAgainst += score2;
      stats2.goalsAgainst += score1;

      if (score1 > score2) {
        stats1.won += 1;
        stats1.points += 3;
        stats2.lost += 1;
      } else if (score1 < score2) {
        stats2.won += 1;
        stats2.points += 3;
        stats1.lost += 1;
      } else {
        stats1.drawn += 1;
        stats1.points += 1;
        stats2.drawn += 1;
        stats2.points += 1;
      }
    }
  });

  // Convert to sorted lists per group
  const finalStandings: GroupStandings = {};

  Object.keys(standings).forEach((groupName) => {
    const groupTeams = Object.values(standings[groupName]);

    // Calculate goal difference for all
    groupTeams.forEach((stats) => {
      stats.goalDifference = stats.goalsFor - stats.goalsAgainst;
    });

    // Sort by FIFA rules: Points desc, Goal Difference desc, Goals For desc, name asc
    groupTeams.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return a.team.name.localeCompare(b.team.name);
    });

    finalStandings[groupName] = groupTeams;
  });

  return finalStandings;
}

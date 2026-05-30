export interface Team {
  name: string;
  code: string;
}

export interface Stadium {
  key?: string;
  name: string;
  city: string;
}

export interface Match {
  num?: number;
  date: string; // YYYY-MM-DD
  time?: string; // HH:MM
  team1: Team;
  team2: Team;
  score1: number | null;
  score2: number | null;
  score1i?: number | null; // score halftime
  score2i?: number | null; // score halftime
  group?: string; // e.g. "Group A"
  stadium?: Stadium;
  playoff?: boolean;
}

export interface Round {
  name: string;
  matches: Match[];
}

export interface WorldCupData {
  name: string;
  rounds: Round[];
}

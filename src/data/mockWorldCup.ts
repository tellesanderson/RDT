import rawWorldCupData from "./worldcup_2026.json";
import { translateTeam } from "../utils/teamMapper";
import { WorldCupData, Match, Round } from "../types/worldcup";

// 1. Group matches by round name and trace group metadata
const roundsMap: { [name: string]: Match[] } = {};
const groupsSet: { [groupName: string]: Set<string> } = {};

rawWorldCupData.matches.forEach((rawMatch) => {
  const t1 = translateTeam(rawMatch.team1);
  const t2 = translateTeam(rawMatch.team2);
  
  // Normalize group name: translate English "Group A" to Portuguese "Grupo A"
  let ptGroup = rawMatch.group;
  if (ptGroup && ptGroup.startsWith("Group ")) {
    ptGroup = ptGroup.replace("Group ", "Grupo ");
  }
  
  const match: Match = {
    num: rawMatch.num,
    date: rawMatch.date,
    time: rawMatch.time,
    team1: t1,
    team2: t2,
    score1: null,
    score2: null,
    group: ptGroup || undefined,
    stadium: { name: rawMatch.ground, city: rawMatch.ground }
  };
  
  // Translate round names if necessary
  let ptRound = rawMatch.round;
  if (ptRound.startsWith("Matchday ")) {
    ptRound = ptRound.replace("Matchday ", "Rodada ");
  } else if (ptRound === "Round of 32") {
    ptRound = "Dezesseis-avos de Final";
  } else if (ptRound === "Round of 16") {
    ptRound = "Oitavas de Final";
  } else if (ptRound === "Quarter-final") {
    ptRound = "Quartas de Final";
  } else if (ptRound === "Semi-final") {
    ptRound = "Semifinal";
  } else if (ptRound === "Match for third place") {
    ptRound = "Disputa do 3º Lugar";
  } else if (ptRound === "Final") {
    ptRound = "Final";
  }

  if (!roundsMap[ptRound]) {
    roundsMap[ptRound] = [];
  }
  roundsMap[ptRound].push(match);
  
  // Track group metadata
  if (ptGroup) {
    if (!groupsSet[ptGroup]) {
      groupsSet[ptGroup] = new Set<string>();
    }
    groupsSet[ptGroup].add(t1.code);
    groupsSet[ptGroup].add(t2.code);
  }
});

// 2. Convert roundsMap to an array of Round sorted chronologically
const getRoundOrder = (name: string): number => {
  if (name.startsWith("Rodada ")) {
    const num = parseInt(name.replace("Rodada ", ""), 10);
    return isNaN(num) ? 999 : num;
  }
  switch (name) {
    case "Dezesseis-avos de Final": return 100;
    case "Oitavas de Final": return 101;
    case "Quartas de Final": return 102;
    case "Semifinal": return 103;
    case "Disputa do 3º Lugar": return 104;
    case "Final": return 105;
    default: return 999;
  }
};

const rounds: Round[] = Object.keys(roundsMap)
  .map((name) => ({
    name,
    matches: roundsMap[name]
  }))
  .sort((a, b) => getRoundOrder(a.name) - getRoundOrder(b.name));

export const mockWorldCupData: WorldCupData = {
  name: "Copa do Mundo FIFA 2026",
  rounds
};

// 3. Convert groupsSet to a record of string[]
export const groupsMetadata: { [groupName: string]: string[] } = {};
Object.keys(groupsSet).forEach((groupName) => {
  groupsMetadata[groupName] = Array.from(groupsSet[groupName]);
});

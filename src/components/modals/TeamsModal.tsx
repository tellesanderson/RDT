import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Users, Award, ShieldAlert } from "lucide-react";
import MiniFlag from "../MiniFlag";
import { groupsMetadata } from "../../data/mockWorldCup";
import { teamCodeToPortuguese } from "../../utils/teamMapper";

interface TeamsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Player {
  number: number;
  name: string;
  position: "Goleiro" | "Defensor" | "Meio-Campo" | "Atacante";
  posShort: string;
}

// Key stars data for the top teams
const realStars: { [code: string]: Player[] } = {
  BRA: [
    { number: 1, name: "Alisson", position: "Goleiro", posShort: "GK" },
    { number: 2, name: "Danilo", position: "Defensor", posShort: "RB" },
    { number: 3, name: "Marquinhos", position: "Defensor", posShort: "CB" },
    { number: 4, name: "G. Magalhães", position: "Defensor", posShort: "CB" },
    { number: 6, name: "Guilherme Arana", position: "Defensor", posShort: "LB" },
    { number: 5, name: "B. Guimarães", position: "Meio-Campo", posShort: "CM" },
    { number: 8, name: "Lucas Paquetá", position: "Meio-Campo", posShort: "CM" },
    { number: 10, name: "Rodrygo", position: "Meio-Campo", posShort: "AM" },
    { number: 7, name: "Vinicius Jr.", position: "Atacante", posShort: "LW" },
    { number: 9, name: "Endrick", position: "Atacante", posShort: "CF" },
    { number: 11, name: "Raphinha", position: "Atacante", posShort: "RW" },
    // Subs
    { number: 12, name: "Ederson", position: "Goleiro", posShort: "Sub" },
    { number: 13, name: "Eder Militão", position: "Defensor", posShort: "Sub" },
    { number: 14, name: "Douglas Luiz", position: "Meio-Campo", posShort: "Sub" },
    { number: 15, name: "Gabriel Martinelli", position: "Atacante", posShort: "Sub" },
    { number: 16, name: "Savinho", position: "Atacante", posShort: "Sub" },
    { number: 17, name: "João Gomes", position: "Meio-Campo", posShort: "Sub" },
    { number: 18, name: "Andreas Pereira", position: "Meio-Campo", posShort: "Sub" }
  ],
  ARG: [
    { number: 23, name: "Dibu Martínez", position: "Goleiro", posShort: "GK" },
    { number: 26, name: "Nahuel Molina", position: "Defensor", posShort: "RB" },
    { number: 13, name: "Cristian Romero", position: "Defensor", posShort: "CB" },
    { number: 19, name: "Nicolás Otamendi", position: "Defensor", posShort: "CB" },
    { number: 3, name: "N. Tagliafico", position: "Defensor", posShort: "LB" },
    { number: 7, name: "Rodrigo De Paul", position: "Meio-Campo", posShort: "CM" },
    { number: 24, name: "Enzo Fernández", position: "Meio-Campo", posShort: "CM" },
    { number: 20, name: "A. Mac Allister", position: "Meio-Campo", posShort: "AM" },
    { number: 10, name: "Lionel Messi", position: "Atacante", posShort: "RW" },
    { number: 22, name: "Lautaro Martínez", position: "Atacante", posShort: "CF" },
    { number: 9, name: "Julián Álvarez", position: "Atacante", posShort: "LW" },
    // Subs
    { number: 1, name: "Gerónimo Rulli", position: "Goleiro", posShort: "Sub" },
    { number: 25, name: "L. Martínez", position: "Defensor", posShort: "Sub" },
    { number: 4, name: "Gonzalo Montiel", position: "Defensor", posShort: "Sub" },
    { number: 5, name: "Leandro Paredes", position: "Meio-Campo", posShort: "Sub" },
    { number: 16, name: "Giovani Lo Celso", position: "Meio-Campo", posShort: "Sub" },
    { number: 17, name: "Alejandro Garnacho", position: "Atacante", posShort: "Sub" },
    { number: 15, name: "Nicolás González", position: "Atacante", posShort: "Sub" }
  ],
  FRA: [
    { number: 16, name: "Mike Maignan", position: "Goleiro", posShort: "GK" },
    { number: 5, name: "Jules Koundé", position: "Defensor", posShort: "RB" },
    { number: 4, name: "William Saliba", position: "Defensor", posShort: "CB" },
    { number: 15, name: "Dayot Upamecano", position: "Defensor", posShort: "CB" },
    { number: 22, name: "Theo Hernández", position: "Defensor", posShort: "LB" },
    { number: 8, name: "A. Tchouaméni", position: "Meio-Campo", posShort: "CM" },
    { number: 6, name: "E. Camavinga", position: "Meio-Campo", posShort: "CM" },
    { number: 7, name: "Antoine Griezmann", position: "Meio-Campo", posShort: "AM" },
    { number: 11, name: "Ousmane Dembélé", position: "Atacante", posShort: "RW" },
    { number: 10, name: "Kylian Mbappé", position: "Atacante", posShort: "CF" },
    { number: 25, name: "Bradley Barcola", position: "Atacante", posShort: "LW" },
    // Subs
    { number: 1, name: "Brice Samba", position: "Goleiro", posShort: "Sub" },
    { number: 24, name: "Ibrahima Konaté", position: "Defensor", posShort: "Sub" },
    { number: 3, name: "Ferland Mendy", position: "Defensor", posShort: "Sub" },
    { number: 14, name: "Adrien Rabiot", position: "Meio-Campo", posShort: "Sub" },
    { number: 13, name: "N'Golo Kanté", position: "Meio-Campo", posShort: "Sub" },
    { number: 20, name: "Kingsley Coman", position: "Atacante", posShort: "Sub" },
    { number: 15, name: "Marcus Thuram", position: "Atacante", posShort: "Sub" }
  ],
  GER: [
    { number: 1, name: "M. Ter Stegen", position: "Goleiro", posShort: "GK" },
    { number: 6, name: "Joshua Kimmich", position: "Defensor", posShort: "RB" },
    { number: 2, name: "Antonio Rüdiger", position: "Defensor", posShort: "CB" },
    { number: 4, name: "Jonathan Tah", position: "Defensor", posShort: "CB" },
    { number: 22, name: "M. Mittelstädt", position: "Defensor", posShort: "LB" },
    { number: 23, name: "Robert Andrich", position: "Meio-Campo", posShort: "CM" },
    { number: 8, name: "Toni Kroos", position: "Meio-Campo", posShort: "CM" },
    { number: 10, name: "Jamal Musiala", position: "Meio-Campo", posShort: "AM" },
    { number: 17, name: "Florian Wirtz", position: "Atacante", posShort: "LW" },
    { number: 19, name: "Leroy Sané", position: "Atacante", posShort: "RW" },
    { number: 7, name: "Kai Havertz", position: "Atacante", posShort: "CF" },
    // Subs
    { number: 12, name: "Oliver Baumann", position: "Goleiro", posShort: "Sub" },
    { number: 15, name: "N. Schlotterbeck", position: "Defensor", posShort: "Sub" },
    { number: 3, name: "David Raum", position: "Defensor", posShort: "Sub" },
    { number: 5, name: "Pascal Gross", position: "Meio-Campo", posShort: "Sub" },
    { number: 13, name: "Thomas Müller", position: "Atacante", posShort: "Sub" },
    { number: 9, name: "Niclas Füllkrug", position: "Atacante", posShort: "Sub" },
    { number: 26, name: "Deniz Undav", position: "Atacante", posShort: "Sub" }
  ],
  ENG: [
    { number: 1, name: "Jordan Pickford", position: "Goleiro", posShort: "GK" },
    { number: 2, name: "Kyle Walker", position: "Defensor", posShort: "RB" },
    { number: 5, name: "John Stones", position: "Defensor", posShort: "CB" },
    { number: 6, name: "Marc Guéhi", position: "Defensor", posShort: "CB" },
    { number: 12, name: "Kieran Trippier", position: "Defensor", posShort: "LB" },
    { number: 4, name: "Declan Rice", position: "Meio-Campo", posShort: "CM" },
    { number: 26, name: "Kobbie Mainoo", position: "Meio-Campo", posShort: "CM" },
    { number: 10, name: "Jude Bellingham", position: "Meio-Campo", posShort: "AM" },
    { number: 7, name: "Bukayo Saka", position: "Atacante", posShort: "RW" },
    { number: 9, name: "Harry Kane", position: "Atacante", posShort: "CF" },
    { number: 11, name: "Phil Foden", position: "Atacante", posShort: "LW" },
    // Subs
    { number: 13, name: "Aaron Ramsdale", position: "Goleiro", posShort: "Sub" },
    { number: 14, name: "Ezri Konsa", position: "Defensor", posShort: "Sub" },
    { number: 3, name: "Luke Shaw", position: "Defensor", posShort: "Sub" },
    { number: 16, name: "Conor Gallagher", position: "Meio-Campo", posShort: "Sub" },
    { number: 24, name: "Cole Palmer", position: "Atacante", posShort: "Sub" },
    { number: 18, name: "Anthony Gordon", position: "Atacante", posShort: "Sub" },
    { number: 19, name: "Ollie Watkins", position: "Atacante", posShort: "Sub" }
  ],
  ESP: [
    { number: 23, name: "Unai Simón", position: "Goleiro", posShort: "GK" },
    { number: 2, name: "Dani Carvajal", position: "Defensor", posShort: "RB" },
    { number: 3, name: "R. Le Normand", position: "Defensor", posShort: "CB" },
    { number: 14, name: "Aymeric Laporte", position: "Defensor", posShort: "CB" },
    { number: 24, name: "Marc Cucurella", position: "Defensor", posShort: "LB" },
    { number: 16, name: "Rodri", position: "Meio-Campo", posShort: "CM" },
    { number: 8, name: "Fabián Ruiz", position: "Meio-Campo", posShort: "CM" },
    { number: 10, name: "Dani Olmo", position: "Meio-Campo", posShort: "AM" },
    { number: 19, name: "Lamine Yamal", position: "Atacante", posShort: "RW" },
    { number: 7, name: "Álvaro Morata", position: "Atacante", posShort: "CF" },
    { number: 17, name: "Nico Williams", position: "Atacante", posShort: "LW" },
    // Subs
    { number: 1, name: "David Raya", position: "Goleiro", posShort: "Sub" },
    { number: 5, name: "Daniel Vivian", position: "Defensor", posShort: "Sub" },
    { number: 12, name: "Alex Grimaldo", position: "Defensor", posShort: "Sub" },
    { number: 18, name: "M. Zubimendi", position: "Meio-Campo", posShort: "Sub" },
    { number: 20, name: "Pedri", position: "Meio-Campo", posShort: "Sub" },
    { number: 11, name: "Ferran Torres", position: "Atacante", posShort: "Sub" },
    { number: 21, name: "Mikel Oyarzabal", position: "Atacante", posShort: "Sub" }
  ],
  POR: [
    { number: 22, name: "Diogo Costa", position: "Goleiro", posShort: "GK" },
    { number: 2, name: "Diogo Dalot", position: "Defensor", posShort: "RB" },
    { number: 4, name: "Rúben Dias", position: "Defensor", posShort: "CB" },
    { number: 14, name: "Gonçalo Inácio", position: "Defensor", posShort: "CB" },
    { number: 19, name: "Nuno Mendes", position: "Defensor", posShort: "LB" },
    { number: 6, name: "João Palhinha", position: "Meio-Campo", posShort: "CM" },
    { number: 23, name: "Vitinha", position: "Meio-Campo", posShort: "CM" },
    { number: 8, name: "Bruno Fernandes", position: "Meio-Campo", posShort: "AM" },
    { number: 10, name: "Bernardo Silva", position: "Atacante", posShort: "RW" },
    { number: 7, name: "C. Ronaldo", position: "Atacante", posShort: "CF" },
    { number: 17, name: "Rafael Leão", position: "Atacante", posShort: "LW" },
    // Subs
    { number: 12, name: "José Sá", position: "Goleiro", posShort: "Sub" },
    { number: 3, name: "Pepe", position: "Defensor", posShort: "Sub" },
    { number: 20, name: "João Cancelo", position: "Defensor", posShort: "Sub" },
    { number: 15, name: "João Neves", position: "Meio-Campo", posShort: "Sub" },
    { number: 21, name: "Diogo Jota", position: "Atacante", posShort: "Sub" },
    { number: 11, name: "João Félix", position: "Atacante", posShort: "Sub" },
    { number: 9, name: "Gonçalo Ramos", position: "Atacante", posShort: "Sub" }
  ],
  USA: [
    { number: 1, name: "Matt Turner", position: "Goleiro", posShort: "GK" },
    { number: 22, name: "Joe Scally", position: "Defensor", posShort: "RB" },
    { number: 3, name: "Chris Richards", position: "Defensor", posShort: "CB" },
    { number: 13, name: "Tim Ream", position: "Defensor", posShort: "CB" },
    { number: 5, name: "Antonee Robinson", position: "Defensor", posShort: "LB" },
    { number: 8, name: "Weston McKennie", position: "Meio-Campo", posShort: "CM" },
    { number: 4, name: "Tyler Adams", position: "Meio-Campo", posShort: "CM" },
    { number: 6, name: "Yunus Musah", position: "Meio-Campo", posShort: "AM" },
    { number: 21, name: "Timothy Weah", position: "Atacante", posShort: "RW" },
    { number: 20, name: "Folarin Balogun", position: "Atacante", posShort: "CF" },
    { number: 10, name: "Christian Pulisic", position: "Atacante", posShort: "LW" },
    // Subs
    { number: 18, name: "Ethan Horvath", position: "Goleiro", posShort: "Sub" },
    { number: 2, name: "C. Carter-Vickers", position: "Defensor", posShort: "Sub" },
    { number: 7, name: "Gio Reyna", position: "Meio-Campo", posShort: "Sub" },
    { number: 15, name: "Johnny Cardoso", position: "Meio-Campo", posShort: "Sub" },
    { number: 9, name: "Ricardo Pepi", position: "Atacante", posShort: "Sub" },
    { number: 11, name: "Brenden Aaronson", position: "Atacante", posShort: "Sub" },
    { number: 19, name: "Haji Wright", position: "Atacante", posShort: "Sub" }
  ],
  MEX: [
    { number: 1, name: "Luis Malagón", position: "Goleiro", posShort: "GK" },
    { number: 2, name: "Jorge Sánchez", position: "Defensor", posShort: "RB" },
    { number: 3, name: "César Montes", position: "Defensor", posShort: "CB" },
    { number: 5, name: "Johan Vásquez", position: "Defensor", posShort: "CB" },
    { number: 6, name: "Gerardo Arteaga", position: "Defensor", posShort: "LB" },
    { number: 4, name: "Edson Álvarez", position: "Meio-Campo", posShort: "CM" },
    { number: 24, name: "Luis Chávez", position: "Meio-Campo", posShort: "CM" },
    { number: 17, name: "Orbelín Pineda", position: "Meio-Campo", posShort: "AM" },
    { number: 15, name: "Uriel Antuna", position: "Atacante", posShort: "RW" },
    { number: 11, name: "Santi Giménez", position: "Atacante", posShort: "CF" },
    { number: 9, name: "Julián Quiñones", position: "Atacante", posShort: "LW" },
    // Subs
    { number: 12, name: "Julio González", position: "Goleiro", posShort: "Sub" },
    { number: 19, name: "Israel Reyes", position: "Defensor", posShort: "Sub" },
    { number: 8, name: "Charly Rodríguez", position: "Meio-Campo", posShort: "Sub" },
    { number: 7, name: "Luis Romo", position: "Meio-Campo", posShort: "Sub" },
    { number: 10, name: "Alexis Vega", position: "Atacante", posShort: "Sub" },
    { number: 21, name: "Cesar Huerta", position: "Atacante", posShort: "Sub" },
    { number: 14, name: "Erick Sánchez", position: "Meio-Campo", posShort: "Sub" }
  ],
  CAN: [
    { number: 16, name: "Maxime Crépeau", position: "Goleiro", posShort: "GK" },
    { number: 2, name: "Alistair Johnston", position: "Defensor", posShort: "RB" },
    { number: 15, name: "Moïse Bombito", position: "Defensor", posShort: "CB" },
    { number: 13, name: "Derek Cornelius", position: "Defensor", posShort: "CB" },
    { number: 19, name: "Alphonso Davies", position: "Defensor", posShort: "LB" },
    { number: 8, name: "Ismaël Koné", position: "Meio-Campo", posShort: "CM" },
    { number: 7, name: "Stephen Eustáquio", position: "Meio-Campo", posShort: "CM" },
    { number: 21, name: "Jonathan Osorio", position: "Meio-Campo", posShort: "AM" },
    { number: 14, name: "Jacob Shaffelburg", position: "Atacante", posShort: "RW" },
    { number: 20, name: "Jonathan David", position: "Atacante", posShort: "CF" },
    { number: 9, name: "Cyle Larin", position: "Atacante", posShort: "LW" },
    // Subs
    { number: 1, name: "Dayne St. Clair", position: "Goleiro", posShort: "Sub" },
    { number: 4, name: "Kamal Miller", position: "Defensor", posShort: "Sub" },
    { number: 3, name: "Luc de Fougerolles", position: "Defensor", posShort: "Sub" },
    { number: 6, name: "Samuel Piette", position: "Meio-Campo", posShort: "Sub" },
    { number: 10, name: "Junior Hoilett", position: "Atacante", posShort: "Sub" },
    { number: 11, name: "Liam Millar", position: "Atacante", posShort: "Sub" },
    { number: 22, name: "Jacen Russell-Rowe", position: "Atacante", posShort: "Sub" }
  ]
};

// Procedural Roster Name Generator components
const firstNamesList: { [category: string]: string[] } = {
  latam: ["Luis", "Carlos", "José", "Juan", "Diego", "Andrés", "Santiago", "Mateo", "Sebastián", "Alejandro", "Gabriel", "Hernán", "Felipe", "Hugo", "Gustavo", "Ramon"],
  arabic: ["Mohamed", "Ahmed", "Youssef", "Ali", "Mustafa", "Karim", "Omar", "Hamza", "Tarek", "Khalid", "Amine", "Yassine", "Saïd", "Rachid", "Hakim", "Sofiane"],
  euro: ["Erik", "Lukas", "Jan", "Jakub", "Stefan", "Filip", "David", "Alexander", "Marcus", "Oliver", "Krzysztof", "Thomas", "Michael", "Peter", "Christoph", "Marc"],
  asian: ["Min-jae", "Heung-min", "Hiroki", "Daichi", "Jaloliddin", "Eldor", "Takumi", "Shogo", "Kang-in", "Woo-young", "Junya", "Kohei", "Otabek", "Jasur", "Shinji"],
  african: ["Sadio", "Krépin", "Sébastien", "Wilfried", "Vincent", "André", "Thomas", "Kofi", "Sipho", "Thabo", "Ryan", "Moussa", "Cheikh", "Boulaye", "Eric", "Victor"],
  generic: ["John", "David", "Robert", "Michael", "William", "Richard", "Thomas", "Charles", "Christopher", "Daniel", "Matthew", "James", "Joseph", "Kevin", "Jason", "Brian"]
};

const lastNamesList: { [category: string]: string[] } = {
  latam: ["Gómez", "Rodríguez", "González", "Hernández", "López", "Martínez", "Pérez", "Sánchez", "Romero", "Díaz", "Torres", "Silva", "Cardozo", "Ortiz", "Flores", "Ríos"],
  arabic: ["Hassan", "Ali", "Ibrahim", "Mansour", "Morad", "Saidi", "Zaki", "Hakimi", "Bennacer", "Mahrez", "Slimani", "Harit", "El-Neny", "Salah", "Atta", "Gomaa"],
  euro: ["Hansen", "Larsson", "Kowalski", "Novak", "Müller", "Dzeko", "Olsen", "Andersson", "Pajak", "Svoboda", "Gruber", "Weber", "Schmidt", "Fischer", "Pospisil", "Linhart"],
  asian: ["Kim", "Lee", "Park", "Tanaka", "Sato", "Watanabe", "Shomurodov", "Masharipov", "Suzuki", "Yoshida", "Choi", "Han", "Ito", "Nakajima", "Khamdamov", "Urunov"],
  african: ["Mane", "Diallo", "Haller", "Kessié", "Aboubakar", "Onana", "Thomas", "Mensah", "Mokoena", "Khumalo", "Mendes", "Sarr", "Koulibaly", "Gueye", "Singo", "N'Diaye"],
  generic: ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "White", "Harris"]
};

function getCultureCategory(code: string): string {
  // Map country code to culture category
  const latam = ["COL", "ECU", "PAR", "VEN", "CRC", "PAN", "URU", "CHI", "PER"];
  const arabic = ["KSA", "EGY", "MAR", "TUN", "IRQ", "JOR", "ALG"];
  const euro = ["SUI", "CZE", "BIH", "TUR", "SWE", "BEL", "ESP", "FRA", "GER", "POR", "ENG", "CRO", "NOR", "AUT"];
  const asian = ["KOR", "JPN", "UZB"];
  const african = ["RSA", "CIV", "CPV", "SEN", "COD", "GHA", "CMR"];

  if (latam.includes(code)) return "latam";
  if (arabic.includes(code)) return "arabic";
  if (euro.includes(code)) return "euro";
  if (asian.includes(code)) return "asian";
  if (african.includes(code)) return "african";
  return "generic";
}

// Procedural generator helper
function generateSquad(code: string): Player[] {
  if (realStars[code]) {
    return realStars[code];
  }

  const category = getCultureCategory(code);
  const firstNames = firstNamesList[category];
  const lastNames = lastNamesList[category];

  const positions: { pos: string; type: "Goleiro" | "Defensor" | "Meio-Campo" | "Atacante" }[] = [
    { pos: "GK", type: "Goleiro" },
    { pos: "RB", type: "Defensor" },
    { pos: "CB", type: "Defensor" },
    { pos: "CB", type: "Defensor" },
    { pos: "LB", type: "Defensor" },
    { pos: "CM", type: "Meio-Campo" },
    { pos: "CM", type: "Meio-Campo" },
    { pos: "AM", type: "Meio-Campo" },
    { pos: "RW", type: "Atacante" },
    { pos: "CF", type: "Atacante" },
    { pos: "LW", type: "Atacante" },
    // Subs
    { pos: "Sub", type: "Goleiro" },
    { pos: "Sub", type: "Defensor" },
    { pos: "Sub", type: "Defensor" },
    { pos: "Sub", type: "Meio-Campo" },
    { pos: "Sub", type: "Meio-Campo" },
    { pos: "Sub", type: "Atacante" },
    { pos: "Sub", type: "Atacante" }
  ];

  const players: Player[] = [];
  const usedNames = new Set<string>();

  // Helper to generate a unique random player name
  const getRandomName = () => {
    let attempts = 0;
    while (attempts < 100) {
      const first = firstNames[Math.floor(Math.random() * firstNames.length)];
      const last = lastNames[Math.floor(Math.random() * lastNames.length)];
      const fullName = `${first.charAt(0)}. ${last}`;
      if (!usedNames.has(fullName)) {
        usedNames.add(fullName);
        return fullName;
      }
      attempts++;
    }
    return `Player ${Math.floor(Math.random() * 100)}`;
  };

  // Numbers allocation
  const availableNumbers = Array.from({ length: 23 }, (_, i) => i + 1);
  // Remove numbers 1 to 11 to use them specifically for starters
  const starterNumbers = [1, 2, 3, 4, 6, 5, 8, 10, 7, 9, 11];
  const subNumbers = availableNumbers.filter(n => !starterNumbers.includes(n));

  positions.forEach((p, idx) => {
    const isStarter = idx < 11;
    const number = isStarter ? starterNumbers[idx] : subNumbers[idx - 11];
    
    players.push({
      number,
      name: getRandomName(),
      position: p.type,
      posShort: p.pos
    });
  });

  return players;
}

export default function TeamsModal({ isOpen, onClose }: TeamsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("Todos");
  const [selectedTeamCode, setSelectedTeamCode] = useState<string | null>(null);

  // Dynamically extract the list of 48 teams from metadata and translator
  const teamsList = useMemo(() => {
    return Object.entries(groupsMetadata).flatMap(([groupName, codes]) => {
      return codes.map(code => ({
        code,
        name: teamCodeToPortuguese[code] || code,
        group: groupName
      }));
    }).sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  }, []);

  const groups = useMemo(() => {
    const list = new Set(teamsList.map(t => t.group));
    return ["Todos", ...Array.from(list).sort()];
  }, [teamsList]);

  // Filtered teams list
  const filteredTeams = useMemo(() => {
    return teamsList.filter(team => {
      const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            team.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGroup = selectedGroup === "Todos" || team.group === selectedGroup;
      return matchesSearch && matchesGroup;
    });
  }, [teamsList, searchQuery, selectedGroup]);

  // Selected team data
  const selectedTeam = useMemo(() => {
    if (!selectedTeamCode) return null;
    return teamsList.find(t => t.code === selectedTeamCode) || null;
  }, [teamsList, selectedTeamCode]);

  // Dynamic squad generation (cached for performance)
  const squad = useMemo(() => {
    if (!selectedTeamCode) return [];
    return generateSquad(selectedTeamCode);
  }, [selectedTeamCode]);

  const starters = useMemo(() => squad.slice(0, 11), [squad]);
  const substitutes = useMemo(() => squad.slice(11), [squad]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-5xl glass-panel rounded-3xl overflow-hidden flex flex-col h-[90vh] md:h-[85vh] shadow-2xl relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-950/20">
          <div className="flex items-center gap-2">
            <Users className="text-gold-premium" size={20} />
            <div>
              <h3 className="text-base font-black uppercase tracking-wider text-white">
                Seleções Participantes & Escalações
              </h3>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">
                Explore os 48 países classificados para 2026
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-gold-premium/30 transition-all cursor-pointer"
            id="close-teams-modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Panel: Teams List Grid */}
          <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto border-r border-white/5">
            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
                <input
                  type="text"
                  placeholder="Buscar seleção..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/40 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-premium/50 transition-all placeholder:text-slate-600"
                />
              </div>
              {/* Group Selector Dropdown */}
              <div className="relative">
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="bg-slate-900/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-premium/50 transition-all cursor-pointer min-w-[140px]"
                >
                  {groups.map(g => (
                    <option key={g} value={g} className="bg-slate-950 text-white font-semibold">
                      {g === "Todos" ? "Todos os Grupos" : g}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid of Teams */}
            {filteredTeams.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredTeams.map((team) => {
                  const isSelected = selectedTeamCode === team.code;
                  return (
                    <div
                      key={team.code}
                      onClick={() => setSelectedTeamCode(team.code)}
                      className={`glass-card rounded-2xl p-3 border text-left cursor-pointer flex items-center justify-between transition-all duration-300 ${
                        isSelected
                          ? "border-gold-premium bg-gold-premium/10 shadow-[0_4px_20px_var(--gold-glow)]"
                          : "border-white/5 bg-slate-900/10 hover:border-gold-premium/20"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <MiniFlag code={team.code} className="w-6 h-4.5 rounded shadow-sm" />
                        <div className="min-w-0">
                          <span className="text-[11px] font-black text-white uppercase tracking-wide truncate block">
                            {team.name}
                          </span>
                          <span className="text-[7.5px] text-slate-500 font-bold uppercase tracking-wider block">
                            {team.group}
                          </span>
                        </div>
                      </div>
                      <span className="text-[8px] font-black text-gold-premium/60 bg-gold-premium/5 border border-gold-premium/10 px-1 rounded">
                        {team.code}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
                <ShieldAlert className="text-slate-600 mb-2" size={24} />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Nenhuma seleção encontrada
                </span>
              </div>
            )}
          </div>

          {/* Right Panel: Tactical Field and Squad View */}
          <div className="w-full md:w-[350px] p-6 bg-slate-950/40 flex flex-col overflow-y-auto">
            <AnimatePresence mode="wait">
              {selectedTeam ? (
                <motion.div
                  key={selectedTeam.code}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  className="flex flex-col gap-5 h-full"
                >
                  {/* Team details header */}
                  <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                    <MiniFlag code={selectedTeam.code} className="w-8 h-6 rounded shadow" />
                    <div>
                      <h4 className="text-base font-black text-white uppercase tracking-wide">
                        {selectedTeam.name}
                      </h4>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                        Código FIFA: <span className="text-gold-premium">{selectedTeam.code}</span> &bull; {selectedTeam.group}
                      </span>
                    </div>
                  </div>

                  {/* Tactical field container */}
                  <div>
                    <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest block mb-2 text-center">Campo de Jogo & Formação Tática (4-3-3)</span>
                    <div className="relative w-full aspect-[3/4] max-w-[280px] mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-inner bg-gradient-to-b from-[#14532d] to-[#166534]">
                      {/* Soccer Pitch Markings */}
                      <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                        {/* Outer border lines */}
                        <rect x="10" y="10" width="280" height="380" fill="none" stroke="white" strokeWidth="2" />
                        {/* Halfway line */}
                        <line x1="10" y1="200" x2="290" y2="200" stroke="white" strokeWidth="2" />
                        <circle cx="150" cy="200" r="35" fill="none" stroke="white" strokeWidth="2" />
                        {/* Top Goal Box */}
                        <rect x="70" y="10" width="160" height="50" fill="none" stroke="white" strokeWidth="2" />
                        <rect x="110" y="10" width="80" height="15" fill="none" stroke="white" strokeWidth="2" />
                        {/* Bottom Goal Box */}
                        <rect x="70" y="340" width="160" height="50" fill="none" stroke="white" strokeWidth="2" />
                        <rect x="110" y="375" width="80" height="15" fill="none" stroke="white" strokeWidth="2" />
                        {/* Penalty spots */}
                        <circle cx="150" cy="50" r="1.5" fill="white" />
                        <circle cx="150" cy="350" r="1.5" fill="white" />
                        {/* Penalty arcs */}
                        <path d="M 120 60 A 35 35 0 0 0 180 60" fill="none" stroke="white" strokeWidth="2" />
                        <path d="M 120 340 A 35 35 0 0 1 180 340" fill="none" stroke="white" strokeWidth="2" />
                      </svg>

                      {/* Tactical Positions Overlay */}
                      {/* GK: (150, 360) */}
                      {/* LB: (45, 285) | CB1: (110, 300) | CB2: (190, 300) | RB: (255, 285) */}
                      {/* CM1: (80, 190) | CM2: (220, 190) | AM: (150, 140) */}
                      {/* LW: (50, 70) | CF: (150, 55) | RW: (250, 70) */}
                      {[
                        { player: starters[0], x: 150, y: 360, pos: "GK" },
                        { player: starters[1], x: 250, y: 285, pos: "RB" },
                        { player: starters[2], x: 190, y: 300, pos: "CB" },
                        { player: starters[3], x: 110, y: 300, pos: "CB" },
                        { player: starters[4], x: 50, y: 285, pos: "LB" },
                        { player: starters[5], x: 90, y: 200, pos: "CM" },
                        { player: starters[6], x: 210, y: 200, pos: "CM" },
                        { player: starters[7], x: 150, y: 150, pos: "AM" },
                        { player: starters[8], x: 250, y: 75, pos: "RW" },
                        { player: starters[9], x: 150, y: 60, pos: "CF" },
                        { player: starters[10], x: 50, y: 75, pos: "LW" },
                      ].map(({ player, x, y, pos }) => {
                        if (!player) return null;
                        return (
                          <div
                            key={player.number}
                            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-default"
                            style={{ left: `${(x / 300) * 100}%`, top: `${(y / 400) * 100}%` }}
                          >
                            <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-gold-premium flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-300">
                              <span className="text-[9px] font-black text-gold-premium leading-none tabular-nums">
                                {player.number}
                              </span>
                              <span className="absolute -top-3.5 -right-3 text-[6px] font-black bg-neon-green/90 text-slate-950 px-1 rounded-sm uppercase scale-75 border border-slate-950/20">
                                {pos}
                              </span>
                            </div>
                            <span 
                              className="text-[7.5px] font-extrabold text-white bg-slate-950/70 border border-white/5 rounded px-1 mt-1 truncate max-w-[80px] drop-shadow-md select-none text-center"
                              title={player.name}
                            >
                              {player.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Roster & Substitutes List */}
                  <div className="flex-1 flex flex-col gap-3 min-h-0">
                    <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest block border-b border-white/5 pb-1">Banco de Reservas</span>
                    <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[140px] pr-1">
                      {substitutes.map((player) => (
                        <div
                          key={player.number}
                          className="flex items-center justify-between text-[10px] bg-white/5 border border-white/5 rounded-lg px-3 py-1.5"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 text-center font-black text-gold-premium tabular-nums bg-gold-premium/5 border border-gold-premium/10 rounded">
                              {player.number}
                            </span>
                            <span className="font-bold text-white uppercase tracking-wide truncate max-w-[160px]">
                              {player.name}
                            </span>
                          </div>
                          <span className="text-[7px] font-black text-slate-400 bg-white/5 border border-white/5 px-1.5 py-0.5 rounded uppercase">
                            {player.position}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-20 text-slate-500">
                  <Users className="mb-2 animate-pulse" size={28} />
                  <p className="text-xs font-bold uppercase tracking-wider">
                    Selecione uma seleção para ver a escalação e elenco tático
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

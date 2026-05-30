import { useState } from "react";
import { motion } from "framer-motion";
import { X, MapPin, Info, Trophy } from "lucide-react";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HostCity {
  name: string;
  country: "Canadá" | "Estados Unidos" | "México";
  stadium: string;
  capacity: string;
  games: string;
  description: string;
  x: number;
  y: number;
}

const hostCities: HostCity[] = [
  {
    name: "Vancouver",
    country: "Canadá",
    stadium: "BC Place",
    capacity: "54.500",
    games: "7 partidas (Fase de Grupos, 32-avos, Oitavas)",
    description: "Sede canadense na costa do Pacífico, famosa pelo seu teto retrátil e atmosfera espetacular.",
    x: 85,
    y: 190
  },
  {
    name: "Toronto",
    country: "Canadá",
    stadium: "BMO Field",
    capacity: "45.736",
    games: "6 partidas (incluindo a estreia da seleção canadense)",
    description: "Coração multicultural do Canadá, o estádio foi expandido para receber a elite do futebol mundial.",
    x: 440,
    y: 190
  },
  {
    name: "Seattle",
    country: "Estados Unidos",
    stadium: "Lumen Field",
    capacity: "69.000",
    games: "6 partidas (Fase de Grupos, 32-avos)",
    description: "Conhecido por ter uma das torcidas mais ruidosas do esporte americano.",
    x: 85,
    y: 205
  },
  {
    name: "San Francisco",
    country: "Estados Unidos",
    stadium: "Levi's Stadium",
    capacity: "68.500",
    games: "6 partidas (Fase de Grupos, 32-avos, Oitavas)",
    description: "Estádio ultra-tecnológico localizado no Vale do Silício, casa do 49ers.",
    x: 75,
    y: 240
  },
  {
    name: "Los Angeles",
    country: "Estados Unidos",
    stadium: "SoFi Stadium",
    capacity: "70.000",
    games: "8 partidas (incluindo estreia dos EUA e Quartas de Final)",
    description: "O estádio mais moderno e caro do planeta, obra-prima arquitetônica no sul da Califórnia.",
    x: 85,
    y: 265
  },
  {
    name: "Guadalajara",
    country: "México",
    stadium: "Estadio Akron",
    capacity: "48.000",
    games: "4 partidas (Fase de Grupos)",
    description: "Estádio em formato de vulcão com gramado impecável, um dos orgulhos do futebol mexicano.",
    x: 225,
    y: 345
  },
  {
    name: "Cidade do México",
    country: "México",
    stadium: "Estadio Azteca",
    capacity: "87.523",
    games: "5 partidas (Jogo de Abertura da Copa e 32-avos)",
    description: "Histórico! O primeiro estádio do mundo a sediar três Copas. Palco de Pelé e Maradona.",
    x: 250,
    y: 375
  },
  {
    name: "Monterrey",
    country: "México",
    stadium: "Estadio BBVA",
    capacity: "53.500",
    games: "4 partidas (Fase de Grupos, 32-avos)",
    description: "Apelidado de 'O Gigante de Aço', possui uma vista incrível para as montanhas locais.",
    x: 240,
    y: 320
  },
  {
    name: "Kansas City",
    country: "Estados Unidos",
    stadium: "Arrowhead Stadium",
    capacity: "76.416",
    games: "6 partidas (Fase de Grupos, 32-avos, Quartas de Final)",
    description: "Coração do Meio-Oeste americano, famoso pelo churrasco tradicional e barulho ensurdecedor.",
    x: 290,
    y: 240
  },
  {
    name: "Dallas",
    country: "Estados Unidos",
    stadium: "AT&T Stadium",
    capacity: "80.000",
    games: "9 partidas (Recorde da Copa, incluindo Semifinal)",
    description: "Templo gigante com tela central suspensa monumental e teto retrátil elétrico.",
    x: 290,
    y: 285
  },
  {
    name: "Houston",
    country: "Estados Unidos",
    stadium: "NRG Stadium",
    capacity: "72.220",
    games: "7 partidas (Fase de Grupos, 32-avos, Oitavas)",
    description: "Multiuso, climatizado e com teto móvel no estado do Texas.",
    x: 305,
    y: 305
  },
  {
    name: "Atlanta",
    country: "Estados Unidos",
    stadium: "Mercedes-Benz Stadium",
    capacity: "71.000",
    games: "8 partidas (incluindo Semifinal)",
    description: "Arquitetura futurista com teto retrátil em formato de diafragma de câmera fotográfica.",
    x: 380,
    y: 275
  },
  {
    name: "Miami",
    country: "Estados Unidos",
    stadium: "Hard Rock Stadium",
    capacity: "64.767",
    games: "7 partidas (incluindo Disputa de 3º Lugar e Quartas)",
    description: "Clima tropical e estádio multi-colorido, palco da final da Copa América 2024.",
    x: 440,
    y: 325
  },
  {
    name: "Filadélfia",
    country: "Estados Unidos",
    stadium: "Lincoln Financial Field",
    capacity: "69.796",
    games: "6 partidas (Fase de Grupos, 32-avos, Oitavas)",
    description: "Coração esportivo vibrante da Pensilvânia, estádio conhecido pelo vento desafiador.",
    x: 460,
    y: 215
  },
  {
    name: "Nova York / Nova Jersey",
    country: "Estados Unidos",
    stadium: "MetLife Stadium",
    capacity: "82.500",
    games: "8 partidas (incluindo a GRANDE FINAL da Copa 2026)",
    description: "Estádio monumental na região metropolitana de NY, palco do jogo de coroação do Campeão Mundial.",
    x: 475,
    y: 205
  },
  {
    name: "Boston",
    country: "Estados Unidos",
    stadium: "Gillette Stadium",
    capacity: "65.878",
    games: "7 partidas (Fase de Grupos, 32-avos, Quartas de Final)",
    description: "Localizado em Foxborough, casa lendária do New England Patriots.",
    x: 490,
    y: 195
  }
];

export default function MapModal({ isOpen, onClose }: MapModalProps) {
  const [selectedCity, setSelectedCity] = useState<HostCity | null>(hostCities.find(c => c.name === "Cidade do México") || null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-4xl glass-panel rounded-3xl overflow-hidden flex flex-col max-h-[90vh] md:max-h-[85vh] shadow-2xl relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-950/20">
          <div className="flex items-center gap-2">
            <MapPin className="text-gold-premium" size={20} />
            <div>
              <h3 className="text-base font-black uppercase tracking-wider text-white">
                Sedes & Estádios da Copa 2026
              </h3>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">
                América do Norte (Canadá, EUA e México)
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-gold-premium/30 transition-all cursor-pointer"
            id="close-map-modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col lg:flex-row gap-6">
          {/* Left Panel: SVG Map */}
          <div className="flex-1 flex flex-col justify-center bg-slate-950/40 border border-white/5 rounded-2xl p-2 md:p-4 min-h-[300px] md:min-h-[400px] relative">
            <div className="absolute top-3 left-3 flex gap-2">
              <span className={`text-[8px] font-black px-2 py-0.5 rounded transition-all uppercase ${hoveredCountry === "Canadá" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white/5 text-slate-400 border border-transparent"}`}>
                Canadá (2)
              </span>
              <span className={`text-[8px] font-black px-2 py-0.5 rounded transition-all uppercase ${hoveredCountry === "Estados Unidos" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-white/5 text-slate-400 border border-transparent"}`}>
                EUA (11)
              </span>
              <span className={`text-[8px] font-black px-2 py-0.5 rounded transition-all uppercase ${hoveredCountry === "México" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-white/5 text-slate-400 border border-transparent"}`}>
                México (3)
              </span>
            </div>

            <svg viewBox="0 0 600 500" className="w-full h-auto max-h-[380px] drop-shadow-2xl">
              <defs>
                <linearGradient id="canada-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.18" />
                </linearGradient>
                <linearGradient id="usa-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.18" />
                </linearGradient>
                <linearGradient id="mexico-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="0.18" />
                </linearGradient>
              </defs>

              {/* Canada Map Polygon */}
              <polygon
                points="100,50 180,40 280,60 380,40 480,50 520,70 550,110 570,160 500,180 470,190 440,180 390,200 250,200 150,200 70,200 80,140"
                fill="url(#canada-grad)"
                stroke="#059669"
                strokeWidth="1"
                className="transition-all duration-300 hover:fill-emerald-500/25 cursor-pointer"
                onMouseEnter={() => setHoveredCountry("Canadá")}
                onMouseLeave={() => setHoveredCountry(null)}
              />

              {/* USA Alaska Polygon */}
              <polygon
                points="20,50 80,50 80,120 40,120 20,80"
                fill="url(#usa-grad)"
                stroke="#3b82f6"
                strokeWidth="1"
                className="transition-all duration-300 hover:fill-blue-500/25 cursor-pointer"
                onMouseEnter={() => setHoveredCountry("Estados Unidos")}
                onMouseLeave={() => setHoveredCountry(null)}
              />

              {/* USA Continental Map Polygon */}
              <polygon
                points="70,200 150,200 250,200 390,200 440,180 470,190 500,180 525,180 545,210 520,290 540,310 515,350 495,350 455,300 400,300 350,320 300,320 250,290 200,290 170,270 140,270 100,270 60,250"
                fill="url(#usa-grad)"
                stroke="#3b82f6"
                strokeWidth="1"
                className="transition-all duration-300 hover:fill-blue-500/25 cursor-pointer"
                onMouseEnter={() => setHoveredCountry("Estados Unidos")}
                onMouseLeave={() => setHoveredCountry(null)}
              />

              {/* Mexico Map Polygon */}
              <polygon
                points="200,290 250,290 300,320 350,320 310,380 320,410 340,430 330,450 300,430 280,390 260,370 240,370 220,330 200,320"
                fill="url(#mexico-grad)"
                stroke="#f59e0b"
                strokeWidth="1"
                className="transition-all duration-300 hover:fill-amber-500/25 cursor-pointer"
                onMouseEnter={() => setHoveredCountry("México")}
                onMouseLeave={() => setHoveredCountry(null)}
              />

              {/* Host Cities Points */}
              {hostCities.map((city) => {
                const isSelected = selectedCity?.name === city.name;
                return (
                  <g
                    key={city.name}
                    className="cursor-pointer group"
                    onClick={() => setSelectedCity(city)}
                    transform={`translate(${city.x}, ${city.y})`}
                  >
                    {/* Ring ping */}
                    <circle r="8" className={`fill-neon-green/30 animate-ping ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                    {/* Solid circle */}
                    <circle
                      r={isSelected ? "5" : "3.5"}
                      className={`transition-all duration-300 stroke-slate-950 stroke-[1px] ${
                        isSelected 
                          ? "fill-gold-premium scale-110 shadow-[0_0_12px_var(--gold-glow)]" 
                          : "fill-neon-green group-hover:fill-gold-premium group-hover:scale-110"
                      }`}
                    />
                    {/* Label shadow and text */}
                    <text
                      y="-8"
                      textAnchor="middle"
                      fill="white"
                      stroke="#0a0f1d"
                      strokeWidth="2.5px"
                      paintOrder="stroke"
                      className={`text-[8.5px] font-black tracking-wide select-none transition-all duration-300 pointer-events-none ${
                        isSelected 
                          ? "opacity-100 fill-gold-premium font-black text-[9.5px]" 
                          : "opacity-60 group-hover:opacity-100 group-hover:fill-white"
                      }`}
                    >
                      {city.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right Panel: Host City Info Card */}
          <div className="w-full lg:w-80 flex flex-col gap-4">
            {selectedCity ? (
              <motion.div
                key={selectedCity.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card rounded-2xl p-5 border border-white/5 bg-slate-900/10 flex-1 flex flex-col justify-between"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                      selectedCity.country === "Canadá" 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : selectedCity.country === "Estados Unidos"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}>
                      {selectedCity.country}
                    </span>
                  </div>

                  <h4 className="text-xl font-black text-white tracking-wide mt-1">
                    {selectedCity.name}
                  </h4>

                  <div className="border-t border-white/5 pt-3 flex flex-col gap-2">
                    <div>
                      <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest block">Estádio Oficial</span>
                      <span className="text-xs font-black text-gold-premium tracking-wide">
                        {selectedCity.stadium}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div>
                        <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest block">Capacidade</span>
                        <span className="text-xs font-black text-white tracking-wide">
                          {selectedCity.capacity}
                        </span>
                      </div>
                      <div>
                        <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest block">Partidas</span>
                        <span className="text-[10px] font-black text-neon-green tracking-wide">
                          {selectedCity.name === "Cidade do México" ? "Abertura Oficial" : selectedCity.name === "Nova York / Nova Jersey" ? "Grande Final" : "Fases Finais"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 bg-white/5 border border-white/5 rounded-xl p-3">
                      <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider block mb-1">Calendário Estimado</span>
                      <p className="text-[10px] text-slate-300 font-medium leading-relaxed">
                        {selectedCity.games}
                      </p>
                    </div>

                    <div className="mt-1">
                      <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest block">Sobre a Sede</span>
                      <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-1">
                        {selectedCity.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                  <Info size={12} className="text-gold-premium" />
                  <span>Sede Oficial da Copa do Mundo</span>
                </div>
              </motion.div>
            ) : (
              <div className="glass-card rounded-2xl p-6 border border-white/5 bg-slate-900/10 flex-1 flex flex-col items-center justify-center text-center">
                <MapPin className="text-slate-600 mb-2 animate-bounce" size={28} />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Selecione uma sede no mapa para ver detalhes
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

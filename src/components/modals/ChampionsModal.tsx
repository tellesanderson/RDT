import { motion } from "framer-motion";
import { X, Award, Star } from "lucide-react";
import MiniFlag from "../MiniFlag";

interface ChampionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Champion {
  code: string;
  name: string;
  titles: number;
  years: number[];
  bgColor: string;
  borderColor: string;
}

const championsList: Champion[] = [
  {
    code: "BRA",
    name: "Brasil",
    titles: 5,
    years: [1958, 1962, 1970, 1994, 2002],
    bgColor: "from-emerald-500/10 to-yellow-500/10",
    borderColor: "border-emerald-500/30 hover:border-yellow-500/50"
  },
  {
    code: "GER",
    name: "Alemanha",
    titles: 4,
    years: [1954, 1974, 1990, 2014],
    bgColor: "from-slate-700/10 to-yellow-600/10",
    borderColor: "border-slate-500/30 hover:border-yellow-600/50"
  },
  {
    code: "ITA",
    name: "Itália",
    titles: 4,
    years: [1934, 1938, 1982, 2006],
    bgColor: "from-blue-600/10 to-slate-200/5",
    borderColor: "border-blue-500/30 hover:border-slate-200/40"
  },
  {
    code: "ARG",
    name: "Argentina",
    titles: 3,
    years: [1978, 1986, 2022],
    bgColor: "from-sky-400/10 to-slate-200/5",
    borderColor: "border-sky-400/30 hover:border-sky-500/50"
  },
  {
    code: "FRA",
    name: "França",
    titles: 2,
    years: [1998, 2018],
    bgColor: "from-blue-900/10 to-red-900/10",
    borderColor: "border-blue-800/30 hover:border-red-800/50"
  },
  {
    code: "URU",
    name: "Uruguai",
    titles: 2,
    years: [1930, 1950],
    bgColor: "from-sky-500/10 to-slate-200/5",
    borderColor: "border-sky-500/20 hover:border-sky-400/50"
  },
  {
    code: "ENG",
    name: "Inglaterra",
    titles: 1,
    years: [1966],
    bgColor: "from-red-600/5 to-slate-100/5",
    borderColor: "border-red-500/20 hover:border-red-600/40"
  },
  {
    code: "ESP",
    name: "Espanha",
    titles: 1,
    years: [2010],
    bgColor: "from-red-700/10 to-yellow-500/5",
    borderColor: "border-red-600/20 hover:border-yellow-500/40"
  }
];

export default function ChampionsModal({ isOpen, onClose }: ChampionsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-3xl glass-panel rounded-3xl overflow-hidden flex flex-col max-h-[85vh] shadow-2xl relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-950/20">
          <div className="flex items-center gap-2">
            <Award className="text-gold-premium" size={20} />
            <div>
              <h3 className="text-base font-black uppercase tracking-wider text-white">
                Galeria de Campeões Mundiais
              </h3>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">
                Histórico de Vencedores da Copa do Mundo FIFA
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-gold-premium/30 transition-all cursor-pointer"
            id="close-champions-modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          <div className="text-center max-w-md mx-auto mb-2">
            <span className="text-[9px] font-black text-gold-premium bg-gold-premium/5 border border-gold-premium/15 px-3 py-1 rounded-full uppercase tracking-widest">
              8 NAÇÕES CONQUISTARAM O MUNDO
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {championsList.map((champ) => (
              <motion.div
                key={champ.code}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`glass-card rounded-2xl p-5 border bg-gradient-to-br ${champ.bgColor} ${champ.borderColor} transition-all duration-300 flex flex-col justify-between`}
              >
                <div className="flex flex-col gap-3">
                  {/* Top info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MiniFlag code={champ.code} className="w-8 h-6 rounded shadow-sm border border-white/10" />
                      <div>
                        <h4 className="text-base font-black text-white uppercase tracking-wider">
                          {champ.name}
                        </h4>
                        <span className="text-[7.5px] text-slate-500 font-black tracking-widest uppercase">
                          FIFA CODE: {champ.code}
                        </span>
                      </div>
                    </div>

                    {/* Trophy badge */}
                    <div className="flex items-center gap-1 bg-gold-premium/15 border border-gold-premium/25 px-2.5 py-1 rounded-full text-gold-premium">
                      <Star size={10} className="fill-gold-premium" />
                      <span className="text-[10px] font-black tracking-wide tabular-nums">
                        {champ.titles} {champ.titles === 1 ? "título" : "títulos"}
                      </span>
                    </div>
                  </div>

                  {/* Stars Representation */}
                  <div className="flex gap-1 py-1">
                    {Array.from({ length: champ.titles }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-gold-premium text-gold-premium drop-shadow-[0_0_4px_var(--gold-glow)] animate-pulse"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>

                  {/* Years list */}
                  <div className="mt-2">
                    <span className="text-[8px] text-slate-500 font-black uppercase tracking-wider block mb-1.5">Edições Conquistadas</span>
                    <div className="flex flex-wrap gap-1.5">
                      {champ.years.map((year) => (
                        <span
                          key={year}
                          className="text-[9px] font-black text-white bg-slate-950/80 border border-white/5 rounded-md px-2 py-0.5 shadow-sm tabular-nums"
                        >
                          {year}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

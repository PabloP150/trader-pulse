'use client';
import { BrainCircuit, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function SentimentWidget({ data, isLoading, symbol, error }: { data: any, isLoading: boolean, symbol: string, error: any }) {
  return (
    <div className="bg-[#111113] rounded-2xl p-6 border border-border/40 shadow-sm min-h-[160px] flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <BrainCircuit className="w-5 h-5 text-white/70" />
          <h3 className="text-base font-bold text-white">Análisis de Gemini ({symbol})</h3>
        </div>
        {data && !isLoading && !error && (
           <div className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
               data.sentiment === 'Bullish' || data.sentiment === 'Alcista' 
                 ? 'bg-emerald-500/20 text-emerald-400' 
                 : data.sentiment === 'Bearish' || data.sentiment === 'Bajista' 
                 ? 'bg-red-500/20 text-red-500' 
                 : 'bg-gray-500/20 text-gray-400'
             }`}>
              {data.sentiment === 'Bullish' || data.sentiment === 'Alcista' ? <TrendingUp className="w-3.5 h-3.5"/> : data.sentiment === 'Bearish' || data.sentiment === 'Bajista' ? <TrendingDown className="w-3.5 h-3.5"/> : <Minus className="w-3.5 h-3.5"/>}
              <span className="uppercase tracking-wider">{data.sentiment}</span>
           </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="flex-1 flex flex-col items-start justify-center">
          <p className="text-sm text-white/50 animate-pulse font-medium">
            Procesando análisis para {symbol}...
          </p>
        </div>
      ) : error ? (
         <p className="text-red-500/80 text-sm font-medium">Error al procesar el análisis de {symbol}.</p>
      ) : data ? (
        <div className="flex flex-col gap-4 mt-2">
           <p className="text-sm text-white/80 leading-relaxed font-medium italic">
             "{data.justification}"
           </p>
        </div>
      ) : (
         <p className="text-white/50 text-sm font-medium">Selecciona una acción para ver el análisis.</p>
      )}
    </div>
  );
}

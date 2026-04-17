'use client';
import { useState } from 'react';
import { useStockData, useSentiment, useGamification } from '@/hooks/useMetrics';
import StockChart from './StockChart';
import SentimentWidget from './SentimentWidget';
import WatchlistWidget from './WatchlistWidget';
import { Toaster, toast } from 'sonner';
import { Search, Trophy } from 'lucide-react';

export default function Dashboard() {
  const [searchInput, setSearchInput] = useState('');
  const [symbol, setSymbol] = useState('NVDA'); 

  const { stock, error: stockError, isLoading: stockLoading } = useStockData(symbol);
  const { sentiment, error: sentimentError, isLoading: sentimentLoading } = useSentiment(symbol);
  const { gamification } = useGamification();

  if (stockError && !stockLoading) {
    toast.error(`Error cargando ${symbol}`, { id: `err-${symbol}` });
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSymbol(searchInput.trim().toUpperCase());
      setSearchInput('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" theme="dark" />
      
      {/* Header */}
      <header className="border-b border-border/50 bg-[#0a0a0c] p-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            TraderPulse
          </h1>
          <p className="text-sm text-muted-foreground opacity-80">Dashboard de Análisis de Mercado en Tiempo Real</p>
        </div>
        
        {/* Gamification Widget */}
        {gamification && (
          <div className="bg-[#18181b] border border-border/50 px-4 py-2 rounded-xl flex items-center gap-3">
             <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-foreground/90">{gamification.level}</span>
                <span className="text-xs text-muted-foreground">{gamification.points} Puntos</span>
                <progress className="w-16 h-1 mt-1 rounded" value={gamification.points % 100} max="100" />
             </div>
             <Trophy className="w-5 h-5 text-yellow-500" />
          </div>
        )}
      </header>

      {/* Toolbar / Search */}
      <div className="p-6 pb-2 max-w-7xl mx-auto w-full flex items-center gap-2">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
           <div className="relative">
             <input 
               value={searchInput}
               onChange={(e) => setSearchInput(e.target.value)}
               placeholder="Símbolo (ej: NVDA, TSLA)..."
               className="bg-[#18181b] border border-border/50 text-foreground px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-1 focus:ring-muted text-sm"
             />
           </div>
           <button type="submit" className="bg-white/90 text-black px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-white transition-colors">
             <Search className="w-4 h-4" /> Buscar
           </button>
        </form>
      </div>

      <main className="flex-1 px-6 pb-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto w-full mt-6">
        {/* Left Column */}
        <div className="md:col-span-2 flex flex-col gap-5">
          
          {/* Main Title Badge */}
          <div className="flex items-end gap-3 mb-2">
             {stock && !stockError ? (
               <>
                 <h2 className="text-[2.5rem] leading-none font-bold tracking-tight text-white">{stock.symbol}</h2>
                 <span className="text-2xl font-medium text-white/90 mb-1">${stock.lastPrice.toFixed(2)}</span>
                 <div className={`px-3 py-1 mb-1 rounded-full text-sm font-bold flex items-center ${stock.changePercent >= 0 ? 'bg-[#f8f9fa] text-black' : 'bg-red-500/20 text-red-500'}`}>
                    {stock.changePercent > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                 </div>
               </>
             ) : (
                <h2 className="text-[2.5rem] leading-none font-bold tracking-tight text-white mb-1">{symbol}</h2>
             )}
          </div>

          <div className="bg-[#111113] rounded-2xl border border-border/40 shadow-sm p-5 w-full h-[460px]">
             {stockError ? (
               <div className="flex items-center justify-center h-full text-red-500/80 font-semibold text-lg drop-shadow-sm">Error cargando {symbol} debido a error en Yahoo Finance 404</div>
             ) : (
               <StockChart data={stock} isLoading={stockLoading} symbol={symbol} />
             )}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-5">
          <SentimentWidget 
             data={sentiment} 
             isLoading={sentimentLoading} 
             symbol={symbol} 
             error={sentimentError} 
          />
          <WatchlistWidget onSelect={setSymbol} />
        </div>
      </main>
    </div>
  );
}

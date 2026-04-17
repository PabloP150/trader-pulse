'use client';
import { useStockData } from '@/hooks/useMetrics';

const WATCHLIST_SYMBOLS = ['BTC-USD', 'ETH-USD', 'SPY'];

function WatchlistItem({ symbol, onClick }: { symbol: string, onClick: () => void }) {
  const { stock, isLoading } = useStockData(symbol);
  
  return (
    <div 
      onClick={onClick}
      className="flex justify-between items-center py-5 cursor-pointer hover:bg-white/5 px-2 rounded-lg transition-colors"
    >
      <span className="font-bold text-white tracking-wide">{symbol}</span>
      {isLoading ? (
         <div className="h-4 w-12 bg-white/10 animate-pulse rounded"></div>
      ) : stock ? (
         <span className={`font-semibold ${stock.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
           {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(1)}%
         </span>
      ) : (
         <span className="text-muted-foreground text-sm font-medium">--</span>
      )}
    </div>
  );
}

export default function WatchlistWidget({ onSelect }: { onSelect: (sym: string) => void }) {
  return (
    <div className="bg-[#111113] rounded-2xl p-6 border border-border/40 shadow-sm">
      <h3 className="text-base font-bold text-white mb-6">Seguimiento</h3>
      <div className="flex flex-col space-y-1">
        {WATCHLIST_SYMBOLS.map(sym => (
          <WatchlistItem key={sym} symbol={sym} onClick={() => onSelect(sym)} />
        ))}
      </div>
    </div>
  );
}

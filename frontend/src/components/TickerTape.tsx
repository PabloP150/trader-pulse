'use client';

const POPULAR_SYMBOLS = ['NVDA', 'AAPL', 'MSFT', 'TSLA', 'BTC-USD', 'AMZN'];

export default function TickerTape({ onSelectSymbol, currentSymbol }: { onSelectSymbol: (sym: string) => void, currentSymbol: string }) {
  return (
    <div className="w-full bg-secondary border-b border-border overflow-x-auto whitespace-nowrap p-3 flex gap-4 no-scrollbar">
      {POPULAR_SYMBOLS.map(sym => (
        <button 
          key={sym} 
          onClick={() => onSelectSymbol(sym)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${currentSymbol === sym ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:text-foreground'}`}
        >
          {sym}
        </button>
      ))}
    </div>
  )
}

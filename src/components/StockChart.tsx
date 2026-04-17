'use client';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function StockChart({ data, isLoading, symbol }: { data: any, isLoading: boolean, symbol: string }) {
  if (isLoading) {
    return <div className="animate-pulse space-y-4 h-full flex items-center justify-center">
       <span className="text-muted-foreground font-medium">Cargando gráfico...</span>
    </div>;
  }

  if (!data || !data.history) return null;

  return (
    <div className="w-full h-full flex flex-col mt-2">
      <h3 className="text-[15px] font-bold text-white/90 mb-8 ml-2 tracking-wide">Gráfico de Precio (1 Mes) - {data.symbol}</h3>
      <div className="w-full h-[340px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.history} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <XAxis dataKey="time" stroke="#444" tick={{ fill: '#777', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} tickMargin={12} minTickGap={30} />
            <YAxis stroke="#444" tick={{ fill: '#777', fontSize: 11, fontWeight: 500 }} domain={['dataMin', 'dataMax']} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip 
               contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff', fontSize: '13px', border: '1px solid #333' }} 
               itemStyle={{ color: '#fff', fontWeight: 600 }}
               labelStyle={{ color: '#aaa', marginBottom: '4px' }}
            />
            <Line 
               type="basis" 
               dataKey="price" 
               stroke="#3b82f6" 
               strokeWidth={2.5} 
               dot={false} 
               activeDot={{ r: 5, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

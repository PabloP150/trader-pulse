import useSWR from 'swr';
import { env } from '@/lib/env';

const fetcher = (url: string) => fetch(url).then(async res => {
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
});

export function useStockData(symbol: string) {
  const { data, error, isLoading } = useSWR(symbol ? `${env.NEXT_PUBLIC_API_URL}/api/v1/stocks/${symbol}` : null, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false
  });
  return { stock: data, error, isLoading };
}

export function useSentiment(symbol: string) {
  const { data, error, isLoading } = useSWR(symbol ? `${env.NEXT_PUBLIC_API_URL}/api/v1/sentiment/${symbol}` : null, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 300000
  });
  return { sentiment: data, error, isLoading };
}

export function useGamification() {
  const { data, error, isLoading } = useSWR(`${env.NEXT_PUBLIC_API_URL}/api/v1/gamification/status`, fetcher, {
    revalidateOnFocus: false
  });
  return { gamification: data, error, isLoading };
}

import { useEffect, useState, useCallback } from 'react';
import { api } from '../services/api';
import type { DashboardData } from '../types';

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const dashboardData = await api.getDashboard();
      setData(dashboardData as DashboardData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  useEffect(() => {
    const handleRefresh = () => {
      void refetch();
    };

    window.addEventListener('abtalks:refresh', handleRefresh);
    return () => window.removeEventListener('abtalks:refresh', handleRefresh);
  }, [refetch]);

  return { data, loading, error, refetch };
}

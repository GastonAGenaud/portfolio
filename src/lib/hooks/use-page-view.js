import { useEffect } from 'react';
import { gtm } from '@/lib/gtm';

export const usePageView = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);
};

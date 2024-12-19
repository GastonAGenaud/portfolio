import { gtm } from '@/lib/gtm';

import { useEffect } from 'react';

export const usePageView = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);
};

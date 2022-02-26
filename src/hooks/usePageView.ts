import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { IS_PRODUCT } from 'constants/index';
import * as gtag from 'helper/gtag';

const usePageView = (): void => {
  const router = useRouter();

  useEffect(() => {
    if (!IS_PRODUCT || !gtag.existsGaId) {
      return;
    }

    const handleRouteChange = (path: string) => {
      gtag.pageview(path);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};

export default usePageView;

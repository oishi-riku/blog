import Script from 'next/script';
import { FC } from 'react';

import { GA_ID, IS_PRODUCT } from 'constants/index';
import { existsGaId } from 'helper/gtag';

const GoogleAnalytics: FC = () => (
  <>
    {IS_PRODUCT && existsGaId && (
      <>
        <Script
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
          strategy="afterInteractive"
        />
      </>
    )}
  </>
);

export default GoogleAnalytics;

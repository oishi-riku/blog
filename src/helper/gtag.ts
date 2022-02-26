import { GA_ID } from 'constants/index';

// IDが取得できない場合を想定する
export const existsGaId = GA_ID !== '';

type ClickEvent = {
  action: 'click';
  category: 'other';
  label: string;
};

export type Event = ClickEvent;

export const event = ({ action, category, label }: Event): void => {
  if (!existsGaId) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
  });
};

export const pageview = (path: string): void => {
  window.gtag('config', GA_ID, {
    page_path: path,
  });
};

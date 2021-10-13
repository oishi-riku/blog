import { render } from '@testing-library/react';
import React from 'react';

import ArticleMeta from 'components/atoms/ArticleMeta';

describe('ArticleMeta', () => {
  it('render ArticleMeta', () => {
    const { getByText } = render(
      <ArticleMeta date={new Date('2021-10-10T09:59:12.668Z')} name="大石陸" />
    );

    expect(getByText('大石陸')).toBeInTheDocument();
    expect(getByText('2021/10/10 18:59:12')).toBeInTheDocument();
  });
});

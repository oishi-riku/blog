import { render, screen } from '@testing-library/react';
import React from 'react';

import { Default, args } from 'stories/components/atoms/ArticleMeta.stories';

describe('atoms/ArticleMeta', () => {
  it('render ArticleMeta', () => {
    render(<Default {...args} />);
    expect(screen.getByText('大石陸')).toBeInTheDocument();
    expect(screen.getByText('2021/10/10 18:59:12')).toBeInTheDocument();
  });
});

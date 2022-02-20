import { render, screen } from '@testing-library/react';
import React from 'react';

import { Default } from 'stories/components/atoms/LoadingOverflow.stories';

describe('atoms/LoadingOverflow', () => {
  it('is Loading', () => {
    render(<Default isLoading={true} />);
    expect(
      screen.getByRole('progressbar', { name: 'ローディング' })
    ).toBeInTheDocument();
  });

  it('is not Loading', () => {
    render(<Default isLoading={false} />);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});

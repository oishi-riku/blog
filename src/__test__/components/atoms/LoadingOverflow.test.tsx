import { render, screen } from '@testing-library/react';
import React from 'react';

import LoadingOverflow from 'components/atoms/LoadingOverflow';

describe('atoms/LoadingOverflow', () => {
  it('is Loading', () => {
    render(<LoadingOverflow isLoading={true} />);
    expect(
      screen.getByRole('progressbar', { name: 'ローディング' })
    ).toBeInTheDocument();
  });

  it('is not Loading', () => {
    render(<LoadingOverflow isLoading={false} />);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});

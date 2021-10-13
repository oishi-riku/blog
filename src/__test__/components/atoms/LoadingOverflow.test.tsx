import { render } from '@testing-library/react';
import React from 'react';

import LoadingOverflow from 'components/atoms/LoadingOverflow';

describe('LoadingOverflow', () => {
  const { getByRole, rerender, queryByRole } = render(
    <LoadingOverflow isLoading={true} />
  );

  it('is Loading', () => {
    expect(
      getByRole('progressbar', { name: 'ローディング' })
    ).toBeInTheDocument();
  });
  it('is not Loading', () => {
    rerender(<LoadingOverflow isLoading={false} />);
    expect(queryByRole('progressbar')).toBeNull();
  });
});

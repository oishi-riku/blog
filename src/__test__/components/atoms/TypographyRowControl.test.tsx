import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  Default,
  WithNewLine,
} from 'stories/components/atoms/TypographyRowControl.stories';

describe('atoms/TypographyRowControl', () => {
  it('render Default', () => {
    render(<Default maxRow={2} />);
    expect(
      screen.getByText(/吾輩は猫である。名前はまだ無い。/i)
    ).toBeInTheDocument();
  });
  it('render WithNewLine', () => {
    render(<WithNewLine maxRow={1} maxRowPc={3} />);
    expect(
      screen.getByText(/吾輩は猫である。名前はまだ無い。/i)
    ).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  Default,
  WithNewLine,
  args,
} from 'stories/components/molecules/ArticleCard.stories';

describe('molecules/ArticleCard', () => {
  it('is display ArticleCard default', () => {
    const prop = args.default;
    render(<Default {...prop} />);

    const title = screen.getByText(prop.title);
    const date = screen.getByText('2021/10/10 18:59:12');
    const name = screen.getByText(prop.name);
    const content = screen.getByText(/吾輩は猫である。/i);
    const link = screen.getByRole('link');

    expect(title).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(link).toHaveAttribute('href', prop.href);
  });

  it('is display ArticleCard with new line', () => {
    const prop = args.withNewLine;
    render(<WithNewLine {...prop} />);

    const title = screen.getByText(prop.title);
    const date = screen.getByText('2021/10/10 18:59:12');
    const name = screen.getByText(prop.name);
    const content = screen.getByText(/吾輩は猫である。/i);
    const link = screen.getByRole('link');

    expect(title).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(link).toHaveAttribute('href', prop.href);
  });
});

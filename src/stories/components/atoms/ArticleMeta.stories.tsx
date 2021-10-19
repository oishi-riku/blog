import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import ArticleMeta from 'components/atoms/ArticleMeta';

export default {
  title: 'Components/Atoms/ArticleMeta',
  component: ArticleMeta,
  excludeStories: ['args'],
} as ComponentMeta<typeof ArticleMeta>;

const Template: ComponentStory<typeof ArticleMeta> = (args) => (
  <ArticleMeta {...args} />
);

export const args = {
  date: new Date('2021-10-10T09:59:12.668Z'),
  name: '大石陸',
};

export const Default = Template.bind({ args: {} });
Default.args = args;

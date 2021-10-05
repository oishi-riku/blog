import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import ArticleMeta from 'components/atoms/ArticleMeta';

export default {
  title: 'Components/Atoms/ArticleMeta',
  component: ArticleMeta,
} as ComponentMeta<typeof ArticleMeta>;

const Template: ComponentStory<typeof ArticleMeta> = (args) => (
  <ArticleMeta {...args} />
);

export const Default = Template.bind({ args: {} });
Default.args = {
  date: new Date(),
  name: '大石陸',
};

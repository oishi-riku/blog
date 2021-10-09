import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import ArticleForm from 'components/templates/ArticleForm';

export default {
  title: 'Components/Templates/ArticleForm',
  component: ArticleForm,
} as ComponentMeta<typeof ArticleForm>;

const Template: ComponentStory<typeof ArticleForm> = (args) => (
  <ArticleForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: '大石陸',
  allMember: [
    {
      id: '1',
      name: 'tarou_tanaka',
      dispName: '田中太郎',
    },
    {
      id: '2',
      name: 'ichirou_suzuki',
      dispName: '鈴木一郎',
    },
    {
      id: '3',
      name: 'aiko_sato',
      dispName: '佐藤愛子',
    },
  ],
  control,
  handleSubmit,
  handleCancel,
};

import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import Layout from 'components/templates/Layout';

export default {
  title: 'Components/Templates/Layout',
  component: Layout,
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => (
  <Layout {...args}>コンテンツ</Layout>
);

export const Default = Template.bind({});
Default.args = {
  nextWriter: {
    name: 'takuya_suzuki',
    dispName: 'たくや',
  },
  isLoginPage: false,
};

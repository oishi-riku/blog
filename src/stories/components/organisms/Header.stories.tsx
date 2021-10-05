import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import Header from 'components/organisms/Header';

export default {
  title: 'Components/Organisms/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};

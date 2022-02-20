import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import LoadingOverflow from 'components/atoms/LoadingOverflow';

export default {
  title: 'Components/Atoms/LoadingOverflow',
  component: LoadingOverflow,
} as ComponentMeta<typeof LoadingOverflow>;

const Template: ComponentStory<typeof LoadingOverflow> = (args) => (
  <LoadingOverflow {...args} />
);

export const Default = Template.bind({ args: {} });

Default.args = {
  isLoading: true,
};

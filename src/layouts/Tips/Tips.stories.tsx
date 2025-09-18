import type { Meta, StoryObj } from '@storybook/react-vite';

import Tips from './Tips';

const meta = {
  component: Tips,
} satisfies Meta<typeof Tips>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
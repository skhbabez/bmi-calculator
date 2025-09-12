import type { Meta, StoryObj } from '@storybook/react-vite';

import ResultBar from './ResultBar';

const meta = {
  component: ResultBar,
} satisfies Meta<typeof ResultBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
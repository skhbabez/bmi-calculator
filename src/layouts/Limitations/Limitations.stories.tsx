import type { Meta, StoryObj } from '@storybook/react-vite';

import Limitations from './Limitations';

const meta = {
  component: Limitations,
} satisfies Meta<typeof Limitations>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
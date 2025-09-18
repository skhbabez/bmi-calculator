import type { Meta, StoryObj } from '@storybook/react-vite';

import Results from './Results';

const meta = {
  component: Results,
} satisfies Meta<typeof Results>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
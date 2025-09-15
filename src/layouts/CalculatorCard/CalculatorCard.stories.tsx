import type { Meta, StoryObj } from "@storybook/react-vite";

import CalculatorCard from "./CalculatorCard";

const meta = {
  component: CalculatorCard,
} satisfies Meta<typeof CalculatorCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

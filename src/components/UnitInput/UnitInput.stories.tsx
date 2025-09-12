import type { Meta, StoryObj } from "@storybook/react-vite";

import UnitInput from "./UnitInput";

const meta = {
  component: UnitInput,
} satisfies Meta<typeof UnitInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    unit: "cm",
  },
};

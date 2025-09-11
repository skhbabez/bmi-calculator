import type { Meta, StoryObj } from "@storybook/react-vite";

import SelectionButton from "./SelectionButton";

const meta = {
  component: SelectionButton,
} satisfies Meta<typeof SelectionButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    checked: true,
  },
};
export const Unchecked: Story = {
  args: {
    checked: false,
  },
};

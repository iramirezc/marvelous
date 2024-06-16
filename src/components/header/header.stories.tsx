import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Header from "./header";

const meta: Meta<typeof Header> = {
  component: Header,
  args: {
    onLogoClick: fn(),
    onFavoritesClick: fn()
  }
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    favoritesCount: 25
  }
};

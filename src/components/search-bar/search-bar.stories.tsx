import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import SearchBar from "./search-bar";

const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
  args: {
    onChange: fn()
  }
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    value: "",
    results: 0
  }
};

export const WithValue: Story = {
  args: {
    value: "Miles Morales",
    results: 0
  }
};

export const WithResults: Story = {
  args: {
    value: "Miles Morales",
    results: 3
  }
};

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
    results: 0,
    isSearching: false
  }
};

export const WithValue: Story = {
  args: {
    value: "Miles Morales",
    results: 0,
    isSearching: false
  }
};

export const WithResults: Story = {
  args: {
    value: "Peter Parker",
    results: 3,
    isSearching: false
  }
};

export const Searching: Story = {
  args: {
    value: "Gwen Stacy",
    results: 0,
    isSearching: true
  }
};

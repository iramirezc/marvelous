import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import CharactersList from "./characters-list";
import characters from "./mocks/characters.json";

const meta: Meta<typeof CharactersList> = {
  component: CharactersList,
  args: {
    onCharacterClick: fn(),
    onCharacterLike: fn()
  }
};

export default meta;

type Story = StoryObj<typeof CharactersList>;

export const Default: Story = {
  args: {
    characters
  }
};

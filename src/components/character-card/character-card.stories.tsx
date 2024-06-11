import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import CharacterCard from "./character-card";

const meta: Meta<typeof CharacterCard> = {
  component: CharacterCard,
  args: {
    onClick: fn(),
    onLike: fn()
  }
};

export default meta;

type Story = StoryObj<typeof CharacterCard>;

export const Default: Story = {
  args: {
    id: "1016181",
    name: "Spider-Man (Miles Morales)",
    image: "http://i.annihil.us/u/prod/marvel/i/mg/f/50/537bcfa1eed73.jpg",
    liked: false
  }
};

export const Liked: Story = {
  args: {
    id: "1009610",
    name: "Spider-Man (Peter Parker)",
    image: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg",
    liked: true
  }
};

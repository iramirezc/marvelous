import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import CharacterDetailCard from "./character-detail-card";

const meta: Meta<typeof CharacterDetailCard> = {
  component: CharacterDetailCard,
  args: {
    onLike: fn()
  }
};

export default meta;

type Story = StoryObj<typeof CharacterDetailCard>;

export const Default: Story = {
  args: {
    id: "1016181",
    name: "Spider-Man (Miles Morales)",
    image: "http://i.annihil.us/u/prod/marvel/i/mg/f/50/537bcfa1eed73.jpg",
    liked: false,
    description:
      "Teenager Miles Morales grew up in Brooklyn, New York. Recently, Miles took on the controversial and pressured role of Spider-Man shortly after the death of the original. Morales made his debut against The Kangaroo, much to the surprise and disapproval of many present at the confrontation."
  }
};

export const Liked: Story = {
  args: {
    id: "1009610",
    name: "Spider-Man (Peter Parker)",
    image: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg",
    liked: true,
    description:
      "Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. Adopting the name Spider-Man, Peter hoped to start a career using his new abilities. Taught that with great power comes great responsibility, Spidey has vowed to use his powers to help people."
  }
};

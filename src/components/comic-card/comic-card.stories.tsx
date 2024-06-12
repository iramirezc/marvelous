import type { Meta, StoryObj } from "@storybook/react";

import ComicCard from "./comic-card";

const meta: Meta<typeof ComicCard> = {
  component: ComicCard
};

export default meta;

type Story = StoryObj<typeof ComicCard>;

export const Default: Story = {
  args: {
    image: "https://i.annihil.us/u/prod/marvel/i/mg/f/03/663e5c5906239.jpg",
    title: "The Amazing Spider-Man (2022) #50",
    year: "2024"
  }
};

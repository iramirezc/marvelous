import type { Meta, StoryObj } from "@storybook/react";

import ComicsList from "./comics-list";
import comics from "./mocks/comics.json";

const meta: Meta<typeof ComicsList> = {
  component: ComicsList
};

export default meta;

type Story = StoryObj<typeof ComicsList>;

export const Default: Story = {
  args: {
    comics
  }
};

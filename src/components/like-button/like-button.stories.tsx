import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import LikeButton from "./like-button";

const meta: Meta<typeof LikeButton> = {
  component: LikeButton,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: "var(--black)",
          width: "fit-content",
          borderRadius: 10,
          padding: "0.5rem"
        }}
      >
        <Story />
      </div>
    )
  ],
  args: {
    onClick: fn()
  }
};

export default meta;

type Story = StoryObj<typeof LikeButton>;

const defaultSize = 50;

export const Default: Story = {
  args: {
    size: defaultSize,
    liked: false
  }
};

const ControlledLikeButton = (props: Story["args"]) => {
  const [liked, setLiked] = useState(props?.liked || false);

  return (
    <LikeButton
      {...props}
      liked={liked}
      onClick={() => setLiked((prev) => !prev)}
    />
  );
};

export const Controlled: Story = {
  args: {
    size: defaultSize
  },
  parameters: {
    controls: { exclude: /^[on.*|liked]/ }
  },
  render: ControlledLikeButton
};

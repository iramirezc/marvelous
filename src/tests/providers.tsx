import { ComponentProps } from "react";
import StoreProvider from "../store/provider";

type Props = ComponentProps<typeof StoreProvider>;

export const TestStoreProvider = ({ children, preloadedState }: Props) => (
  <StoreProvider preloadedState={preloadedState}>{children}</StoreProvider>
);

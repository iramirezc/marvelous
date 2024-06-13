import { PropsWithChildren } from "react";
import StoreProvider from "../store/provider";
import type { PreloadedState } from "../store/state";

type Props = PropsWithChildren<{ preloadedState?: PreloadedState }>;

export const TestStoreProvider = ({ children, preloadedState }: Props) => (
  <StoreProvider preloadedState={preloadedState}>{children}</StoreProvider>
);

export type { PreloadedState };

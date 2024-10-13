"use client";

import type { ReactNode } from "react";
import React from "react";
import { Provider } from "react-redux";
import { store } from ".";

interface Props {
  children: ReactNode;
}

const ReduxProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;

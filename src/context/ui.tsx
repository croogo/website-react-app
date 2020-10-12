import React, { createContext, FunctionComponent, useContext, useState } from "react";

export const UiContext = createContext({
  isLoading: false,
  setLoading: (isLoading: boolean) => { },
});

export const UiStateProvider: FunctionComponent = props => {
  const [isLoading, setLoading] = useState(false);
  const uiStore = {
    isLoading, setLoading,
  }

  return (
    <UiContext.Provider value={{ ...uiStore }}>
      { props.children}
    </UiContext.Provider>
  )
}

export function useUi() {
  const uiStore = useContext(UiContext);
  return {
    ...uiStore,
  }
}

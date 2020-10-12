import React, { createContext, FunctionComponent, useContext, useState } from "react";
import { MenuItem } from "../types/entities";

export type MenuItemsMap = Map<string, MenuItem[]>;

export const UiContext = createContext({
  isLoading: false,
  setLoading: (isLoading: boolean) => {},
  menuItems: new Map<string, MenuItem[]>(),
  setMenuItems: (menuItems: MenuItemsMap) => {},
});

export const UiStateProvider: FunctionComponent = props => {
  const [isLoading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState(new Map() as MenuItemsMap);
  const uiStore = {
    isLoading, setLoading,
    menuItems, setMenuItems,
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

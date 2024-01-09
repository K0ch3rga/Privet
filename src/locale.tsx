import {createContext, useContext, useReducer, useState} from "react";

import ru from "./languages/ru-lang.json";
import en from "./languages/en-lang.json";

export enum Languages {
  EN = "EN",
  RU = "RU",
}

export const Locales = {
  [Languages.EN]: en,
  [Languages.RU]: ru,
};

export enum Screens {
  LanguageChoose = "LanguageChoose",
  Base = "base",
}

export type LocaleAction = {
  type: "CHANGE_LOCALE" | undefined;
  payload: Languages;
};

const reducer = (state: {text: typeof en}, action: LocaleAction) => {
  switch (action.type) {
    case "CHANGE_LOCALE": {
      return {
        text: Locales[action.payload],
      };
    }
    default:
      return state;
  }
};

export const LocaleContext = createContext<any>(Locales[Languages.EN]);

export const LocaleProvider = ({children}: {children: any}) => {
  const [locale, dispatch] = useReducer(reducer, {text: Locales[Languages.EN]});

  return <LocaleContext.Provider value={{locale, dispatch}}>{children}</LocaleContext.Provider>;
};

export const useLocale = (screen: Screens | undefined) => {
  return useContext(LocaleContext);
};

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
}

export type LocaleAction = {
  type: "CHANGE_LOCALE";
  payload: Languages;
};

export type LocaleContextType = {
  locale: typeof en;
  dispatch: React.Dispatch<LocaleAction> | undefined;
};

const reducer = (state: typeof en, action: LocaleAction) => {
  switch (action.type) {
    case "CHANGE_LOCALE": {
      return Locales[action.payload];
    }
    default:
      return state;
  }
};

export const LocaleContext = createContext<LocaleContextType>({
  locale: Locales[Languages.EN],
  dispatch: undefined,
});

export const LocaleProvider = ({children}: {children: any}) => {
  const [locale, dispatch] = useReducer(reducer, Locales[Languages.EN]);

  return <LocaleContext.Provider value={{locale, dispatch}}>{children}</LocaleContext.Provider>;
};

export const useLocale = (screen: Screens | undefined) => {
  return useContext(LocaleContext);
};

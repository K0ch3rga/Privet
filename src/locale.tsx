import {createContext, useContext, useReducer} from "react";

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
  Messenger = "Messenger",
  Profile = "Profile",
}

type ScreensUnion = "LanguageChoose" | "Messenger" | "Profile";

// export type LocaleAction = {
//   type: "CHANGE_LOCALE";
//   payload: Languages;
// };

export type LocaleContextType = {
  locale: typeof en;
  dispatch: React.Dispatch<Languages> | undefined;
};

const reducer = (state: typeof en, action: Languages) => {
  return Locales[action];
};

export const LocaleContext = createContext<LocaleContextType>({
  locale: Locales[Languages.EN],
  dispatch: undefined,
});

export const LocaleProvider = ({children}: {children: any}) => {
  const [locale, dispatch] = useReducer(reducer, Locales[Languages.EN]); // ошикба, если переводы разные

  return <LocaleContext.Provider value={{locale, dispatch}}>{children}</LocaleContext.Provider>;
};

export const useLocale = (screen: Screens) => {
  // const {locale, dispatch} = useContext(LocaleContext);
  // return {locale: locale[screen], dispatch};
  return useContext(LocaleContext)
};
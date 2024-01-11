import { lang_and_level } from "../components/Profile/OtherLanguagesList"
import { IContacts } from "./IContacts"

export interface IUser {
  email?: string,
  university?: string,
  user_info?: {
    full_name?: string,
    birth_date?: string,
    native_language?: string,
    other_languages_and_levels: lang_and_level[]
    contacts?: IContacts
  }
}
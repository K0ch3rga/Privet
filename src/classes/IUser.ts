import { lang_and_level } from "../components/Profile/OtherLanguagesList"
import { IContacts } from "./contacts"

export interface IUser {
  citizenship?: string,
  sex?: string,
  user?: {
    email?: string,
    university?: string,
    user_info?: {
      full_name?: string,
      birth_date?: string,
      native_language?: string,
      other_languages_and_levels: lang_and_level[]
      contacts?: IContacts
    }
  },
  profile_type?: string,
  last_buddy?: string,
  last_arrival_date?: "",
  institute?: string,
  study_program?: string,
  last_visa_expiration?: string,
  accommodation?: string
}
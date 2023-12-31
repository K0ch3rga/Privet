import { lang_and_level } from "../components/Profile/OtherLanguagesList"

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
      other_languages_and_levels?: lang_and_level[]
      contacts?: {
        vk?: string,
        phone?: string,
        telegram?: string,
        whatsapp?: string
      }
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
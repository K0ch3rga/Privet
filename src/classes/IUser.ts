export interface IUser {
  citizenship?: string,
  user?: {
    email?: string,
    user_info?: {
      full_name?: string,
      sex?: string,
      birth_date?: string,
      native_language?: string,
      other_languages_and_levels?: string
      contacts?: {
        vk?: string,
        phone?: string,
        telegram?: string,
        whatsapp?: string
      }
    }
    institute?: string,
    study_program?: string,
    last_visa_expiration?: string,
    accommodation?: string
  }
}
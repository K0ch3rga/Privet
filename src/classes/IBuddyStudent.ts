import { IUser } from "./IUser"

export interface IBuddyStudent {
  only_view?: {
    institute?: string,
    study_program?: string,
    last_visa_expiration?: string,
    accommodation?: string,
    buddy_comment: string
  }
  citizenship?: string,
  sex?: string,
  user?: IUser
}
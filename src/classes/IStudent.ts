import { IUser } from "./IUser"

export interface IStudent {
  id?: number
  citizenship?: string,
  sex?: string,
  user?: IUser,
  profile_type?: string,
  last_buddy?: string,
  last_arrival_date?: "",
  institute?: string,
  study_program?: string,
  last_visa_expiration?: string,
  accommodation?: string
}
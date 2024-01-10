import { IUser } from "../classes/IUser";

export interface ProfileEditProps {
  userData: IUser, 
  setUserData: (newUser: IUser) => void
}
import { IUser } from "../classes/IUser";

export interface ProfileEditProps {
  userData: IUser, 
  setUserData: React.Dispatch<React.SetStateAction<IUser>>
}
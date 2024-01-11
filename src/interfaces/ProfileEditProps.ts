import { ColorValue } from "react-native";
import { IStudent } from "../classes/IStudent";
import { IBuddy } from "../classes/IBuddy";

export interface ProfileEditProps {
  userData: IStudent | IBuddy, 
  setUserData: (newUser: IStudent | IBuddy) => void,
}
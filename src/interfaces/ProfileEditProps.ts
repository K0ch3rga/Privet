import { ColorValue } from "react-native";
import { IStudent } from "../classes/IStudent";

export interface ProfileEditProps {
  userData: IStudent, 
  setUserData: (newUser: IStudent) => void,
}
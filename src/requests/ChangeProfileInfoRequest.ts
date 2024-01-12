//@ts-ignore
import {BASE_URL, BUDDY_TOKEN, STUDENT_TOKEN} from "@env";
import { IStudent } from "../classes/IStudent";
import { useAccountStore } from "../storage/AccountStore";
import { IBuddy } from "../classes/IBuddy";

export const sendChangeProfileInfoRequest  = async (user_id: number, 
  profileData: IStudent | IBuddy,
  setLoading: (value: React.SetStateAction<boolean>) => void,
  setError: (value: React.SetStateAction<boolean>) => void,
  setErrorMessage: (value: React.SetStateAction<string>) => void,) => {
  
  const isBuddy = useAccountStore.getState().isBuddy 
  const url = isBuddy
    ? `${BASE_URL}/buddy/profile/${user_id}/` 
    : `${BASE_URL}/student/profile/${user_id}/`
  

  setLoading(true);
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": isBuddy ? BUDDY_TOKEN : STUDENT_TOKEN
        },
        body: JSON.stringify(profileData),
    })

    const json = await response.json();

    if (!response.ok) {
      setError(true)
      setErrorMessage(JSON.stringify(json));
    }
    console.log("Успех:", JSON.stringify(json));
  } catch (error) {
    console.error("Ошибка:", error)
    
  }
  setLoading(false);
};
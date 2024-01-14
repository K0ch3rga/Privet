//@ts-ignore
import {BASE_URL, BUDDY_TOKEN, STUDENT_TOKEN, TEAMLEAD_TOKEN} from "@env";
import { IStudent } from "../classes/IStudent";
import { useAccountStore } from "../storage/AccountStore";
import { IBuddy } from "../classes/IBuddy";

export const sendConfirmBuddyStatus  = async (buddy_id: number, 
  setSuccess: (value: React.SetStateAction<boolean>) => void,
  setLoading: (value: React.SetStateAction<boolean>) => void,
  setError: (value: React.SetStateAction<boolean>) => void,
  setErrorMessage: (value: React.SetStateAction<string>) => void,) => {
  
  const isBuddy = useAccountStore.getState().isBuddy 
  const url = `${BASE_URL}/teamlead/confirm-buddy/`

  const data = { buddy_id: buddy_id }

  setLoading(true);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": TEAMLEAD_TOKEN
        },
        body: JSON.stringify(data),
    })

    const json = await response.json();

    if (!response.ok) {
      setError(true)
      setErrorMessage(JSON.stringify(json));
    }
    else{
      setSuccess(true)
    }
    console.log("Успех:", JSON.stringify(json));
  } catch (error) {
    console.error("Ошибка:", error)
  }
  setLoading(false);
};
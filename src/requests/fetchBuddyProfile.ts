//@ts-ignore
import {BASE_URL, BUDDY_TOKEN, STUDENT_TOKEN} from "@env";
import { IStudent } from "../classes/IStudent";
import { useStudentStore } from "../storage/StudentStore";
import { useAccountStore } from "../storage/AccountStore";
import { IBuddy } from "../classes/IBuddy";
import { useBuddyStore } from "../storage/BuddyStore";

export const fetchBuddyProfile = (buddy_id: number, setData: any, setError: any, setErrorMessage: any, setLoading?: any) => {
  const isBuddy = useAccountStore.getState().isBuddy 
  const url = `${BASE_URL}/buddy/profile/${buddy_id}/` 

  if (setLoading) {
    setLoading(true);
  }
  
  try {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": isBuddy ? BUDDY_TOKEN : STUDENT_TOKEN
        },
    })
    .then((responce) => {
      if (!responce.ok) {
        setError(true)
        setErrorMessage("Profile info is not found!")
      }
      else {
        return responce.json()
      }
    })
    .then((json) => {
      const user = json as IBuddy
      setData(user)
    })
    .finally(() => {
      if (setLoading) {
        setLoading(false);
      }
    })
    .catch((e)=> console.log("Ошибка: ", e))
  }
  catch (error) {
    console.error("Ошибка: ", error)
    if (setLoading) {
      setLoading(false);
    }
  }
}
// @ts-ignore
import {BASE_URL, BUDDY_TOKEN} from "@env";
import { useAccountStore } from "../storage/AccountStore";

export const sendRequestArrival  = async (arrival_id: number,
  setLoading: (value: React.SetStateAction<boolean>) => void,
  setSuccess: (value: React.SetStateAction<boolean>) => void,
  setError: (value: React.SetStateAction<boolean>) => void,
  setErrorMessage: (value: React.SetStateAction<string>) => void,) => {

  const url = `${BASE_URL}/buddy/add-arrival/`
  const data = {
    buddy_id: useAccountStore.getState().user_id,
    arrival_id: arrival_id
  }
  
  setLoading(true);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": BUDDY_TOKEN
        },
        body: JSON.stringify(data),
    })

    const json = await response.json();

    if (!response.ok) {
      setError(true)
      setErrorMessage(JSON.stringify(json));
    } else{
      setSuccess(true)
    }
    console.log("Успех:", JSON.stringify(json));
  } catch (error) {
    console.error("Ошибка:", error)
  }
  setLoading(false);
};
// @ts-ignore
import {BASE_URL, BUDDY_TOKEN} from "@env";
import { useArrivalListStore } from "../storage/ArrivalListStore";
import { IArrivaList } from "../classes/IArrivalList";

export const fetchArrivalsList  = async (
  setLoading: (value: React.SetStateAction<boolean>) => void,
  setError: (value: React.SetStateAction<boolean>) => void,
  setErrorMessage: (value: React.SetStateAction<string>) => void,) => {
  const url = `${BASE_URL}/buddy/arrivals/`

  setLoading(true);
  
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": BUDDY_TOKEN
        },
    })

    const json = await response.json();

    if (!response.ok) {
      setError(true)
      setErrorMessage(JSON.stringify(json));
    }
    else{
      const list = json as IArrivaList[];
      useArrivalListStore.setState({ arrivalList: list })
    }
    console.log("Успех:", JSON.stringify(json));
  } catch (error) {
    console.error("Ошибка:", error)
  }
  setLoading(false);
};
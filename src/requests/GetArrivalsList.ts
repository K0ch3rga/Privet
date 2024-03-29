// @ts-ignore
import {BASE_URL, BUDDY_TOKEN} from "@env";
import { useArrivalListStore } from "../storage/ArrivalListStore";
import { IArrivaList } from "../classes/IArrivalList";
import { useAccountStore } from "../storage/AccountStore";

export const fetchArrivalsList  = async (
  mine: boolean,
  setLoading: (value: React.SetStateAction<boolean>) => void,
  setError: (value: React.SetStateAction<boolean>) => void,
  setErrorMessage: (value: React.SetStateAction<string>) => void,) => {

  const buddy_id = useAccountStore.getState().user_id
  const url1 = `${BASE_URL}/buddy/arrivals/`
  const url2 = `${BASE_URL}/buddy/buddy-arrivals/${buddy_id}/`
  const url = mine ? url2 : url1


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
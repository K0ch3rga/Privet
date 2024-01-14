// @ts-ignore
import {BASE_URL, BUDDY_TOKEN} from "@env";
import { IArrival } from "../classes/IArrival";

export const fetchArrivalData  = async (
  arrival_id: number,
  setArrivalData: (value: React.SetStateAction<IArrival>) => void,
  setLoading: (value: React.SetStateAction<boolean>) => void,
  setError: (value: React.SetStateAction<boolean>) => void,
  setErrorMessage: (value: React.SetStateAction<string>) => void,) => {
  const url = `${BASE_URL}/buddy/arrivals/${arrival_id}/`

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
      const arrival = json as IArrival;
      setArrivalData(arrival)
    }
    console.log("Успех:", JSON.stringify(json));
  } catch (error) {
    console.error("Ошибка:", error)
  }
  setLoading(false);
};
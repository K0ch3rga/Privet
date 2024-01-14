// @ts-ignore
import {BASE_URL, BUDDY_TOKEN} from "@env";
import { MyStudent } from "../screens/StudentsForBuddy/MyStudentsList";

export const fetchMyStudentsList  = async (
  user_id: number,
  setStudens: (value: React.SetStateAction<MyStudent[]>) => void,
  setLoading: (value: React.SetStateAction<boolean>) => void,
  setError: (value: React.SetStateAction<boolean>) => void,
  setErrorMessage: (value: React.SetStateAction<string>) => void) => {
  const url = `${BASE_URL}/buddy/buddy-students/${user_id}/`

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
      const list = json as MyStudent[];
      setStudens(list)
    }
    console.log("Успех:", JSON.stringify(json));
  } catch (error) {
    console.error("Ошибка:", error)
  }
  setLoading(false);
};
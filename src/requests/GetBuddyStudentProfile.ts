// @ts-ignore
import {BASE_URL, STUDENT_TOKEN} from "@env";
import { useArrivalListStore } from "../storage/ArrivalListStore";
import { IArrivaList } from "../classes/IArrivalList";
import { IBuddyStudent } from "../classes/IBuddyStudent";

export const fetchBuddyStudentProfile  = async (
  studentId: number,
  setLoading: (value: React.SetStateAction<boolean>) => void,
  setStudentData: (value: React.SetStateAction<IBuddyStudent>) => void,
  setError: (value: React.SetStateAction<boolean>) => void,
  setErrorMessage: (value: React.SetStateAction<string>) => void,) => {
  
    const url = `${BASE_URL}/buddy/student/${studentId}/`

  setLoading(true);
  
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": STUDENT_TOKEN
        },
    })

    const json = await response.json();

    if (!response.ok) {
      setError(true)
      setErrorMessage(JSON.stringify(json));
    }
    else{
      const student = json as IBuddyStudent;
      setStudentData(student)
    }
    console.log("Успех:", JSON.stringify(json));
  } catch (error) {
    console.error("Ошибка:", error)
  }
  setLoading(false);
};
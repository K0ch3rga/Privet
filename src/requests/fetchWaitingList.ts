//@ts-ignore
import {BASE_URL, TEAMLEAD_TOKEN} from "@env";
import { IWaitingBuddy } from "../screens/StudentsForBuddy/MyStudentsList";

export const fetchWaitingBuddysList = (setData: any, setError: any, setErrorMessage: any, setLoading?: any) => {
  const url = `${BASE_URL}/teamlead/not-confirmed-buddys/` 

  if (setLoading) {
    setLoading(true);
  }
  
  try {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": TEAMLEAD_TOKEN
        },
    })
    .then((responce) => {
      if (!responce.ok) {
        setError(true)
        responce.json().then(a => console.log(a))
        setErrorMessage("")
      }
      else {
        return responce.json()
      }
    })
    .then((json) => {
      const user = json as IWaitingBuddy[]
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
import { IUser } from "../classes/IUser";
import {BASE_URL, BASE_TOKEN} from "@env";


export const fetchUserInfo = (user_id: number, setLoading: any, setUserData: any, setError: any, setErrorMessage: any) => {

  const url = `${BASE_URL}/student/profile/${user_id}/`
  setLoading(true);
  try {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": BASE_TOKEN
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
      const user = json as IUser
      setUserData(user);
    })
    .finally(() => {
      setLoading(false)
    })
    .catch((e)=> console.log("Ошибка: ", e))
  }
  catch (error) {
    console.error("Ошибка: ", error)
    setLoading(false)
  }
}
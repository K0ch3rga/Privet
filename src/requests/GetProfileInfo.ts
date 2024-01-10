//@ts-ignore
import {BASE_URL, BASE_TOKEN} from "@env";
import { IUser } from "../classes/IUser";
import { useUserStore } from "../storage/UserStore";

export const fetchUserInfo = (user_id: number, setError: any, setErrorMessage: any, setLoading?: any,) => {
  const url = `${BASE_URL}/student/profile/${user_id}/`
  if (setLoading) {
    setLoading(true);
  }
  
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
      useUserStore.setState({userData: user});
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
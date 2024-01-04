import { IUser } from "../classes/IUser";
import {BASE_URL, BASE_TOKEN} from "@env";

export const sendChangeProfileInfoRequest  = async (user_id: number, 
  profileData: IUser,
  setLoading: (value: React.SetStateAction<boolean>) => void,
  setError: (value: React.SetStateAction<boolean>) => void,
  setErrorMessage: (value: React.SetStateAction<string>) => void,) => {
  const url = `${BASE_URL}/student/profile/${user_id}/`

  setLoading(true);
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": BASE_TOKEN
        },
        body: JSON.stringify(profileData),
    })

    const json = await response.json();

    if (!response.ok) {
      setError(true)
      setErrorMessage(JSON.stringify(json));
    }
    console.log("Успех:", JSON.stringify(json));
  } catch (error) {
    console.error("Ошибка:", error)
  }
  setLoading(false);
};
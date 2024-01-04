import { UserDataProps } from "../interfaces/UserDataProps";
import { sendLoginRequest, loginProps } from "./LoginRequest";
import {BASE_URL, BASE_TOKEN} from "@env";

export const sendRegistraionRequest  = async (userData: UserDataProps,
  setLoading: (value: React.SetStateAction<boolean>) => void,
  setError: (value: React.SetStateAction<boolean>) => void,
  setErrorMessage: (value: React.SetStateAction<string>) => void,) => {
  const url = `${BASE_URL}/signup/student/`
  
  setLoading(true);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": BASE_TOKEN
        },
        body: JSON.stringify(userData),
    })

    const json = await response.json();

    if (!response.ok) {
      setError(true)
      setErrorMessage(JSON.stringify(json));
    } else{
      sendLoginRequest({
          email: userData.email,
          password: userData.password
        } as loginProps, 
      setLoading, setError, setErrorMessage)
    }
    console.log("Успех:", JSON.stringify(json));
  } catch (error) {
    console.error("Ошибка:", error)
  }
  setLoading(false);
};
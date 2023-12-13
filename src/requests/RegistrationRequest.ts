import { UserDataProps } from "../interfaces/UserDataProps";
import { sendLoginRequest, loginProps } from "./LoginRequest";

export const sendRegistraionRequest  = async (userData: UserDataProps,
  setLoading: (value: React.SetStateAction<boolean>) => void,
  setError: (value: React.SetStateAction<boolean>) => void,
  setErrorMessage: (value: React.SetStateAction<string>) => void,) => {
  const url = 'http://127.0.0.1:8000/api/v1/signup/student/'
  
  setLoading(true);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
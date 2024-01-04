import { UserDataProps } from "../interfaces/UserDataProps";
import {BASE_URL, BASE_TOKEN} from "@env";

export type loginProps = {} & Pick<UserDataProps, "email"> & Pick<UserDataProps, "password">

export const sendLoginRequest = async (loginData: loginProps,
  setLoading: (value: React.SetStateAction<boolean>) => void,
  setError: (value: React.SetStateAction<boolean>) => void,
  serErrorMessage: (value: React.SetStateAction<string>) => void,) => {
  const url = `${BASE_URL}/login/`

  setLoading(true);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": BASE_TOKEN
        },
        body: JSON.stringify(loginData),
    })

    const json = await response.json();

    if (!response.ok) {
      setError(true)
      serErrorMessage(JSON.stringify(json));
    } else{
      // navigation.navigate("Profile")
    }
    console.log("Успех:", JSON.stringify(json));
  } catch (error) {
    console.error("Ошибка:", error)
  }

  setLoading(false);
}
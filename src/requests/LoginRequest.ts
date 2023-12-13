import { UserDataProps } from "../interfaces/UserDataProps";

export type loginProps = {} & Pick<UserDataProps, "email"> & Pick<UserDataProps, "password">

export const sendLoginRequest = async (loginData: loginProps,
  setLoading: (value: React.SetStateAction<boolean>) => void,
  setError: (value: React.SetStateAction<boolean>) => void,
  serErrorMessage: (value: React.SetStateAction<string>) => void,) => {
  const url = 'http://127.0.0.1:8000/api/v1/login/'

  setLoading(true);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
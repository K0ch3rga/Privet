import { UserDataProps } from "../screens/Profile/ProfileInfoScreen";
import { sendLoginRequest, loginProps } from "./LoginRequest";

export const sendChangeProfileInfoRequest  = async (user_id: number, 
  profileData: UserDataProps,
  setLoading: (value: React.SetStateAction<boolean>) => void,
  setError: (value: React.SetStateAction<boolean>) => void,
  setErrorMessage: (value: React.SetStateAction<string>) => void,) => {
  const url = `http://127.0.0.1:8000/api/v1/student/profile/${user_id}/`
  console.log(url);
  
  
  setLoading(true);
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
    })

    const json = await response.json();

    if (!response.ok) {
      setError(true)
      setErrorMessage(JSON.stringify(json));
    } else{
      
    }
    console.log("Успех:", JSON.stringify(json));
  } catch (error) {
    console.error("Ошибка:", error)
  }
  setLoading(false);
};
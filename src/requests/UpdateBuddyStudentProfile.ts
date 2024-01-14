// @ts-ignore
import { BASE_URL, BUDDY_TOKEN } from "@env";
import { IBuddyStudent } from "../classes/IBuddyStudent";

export const updateBuddyStudentProfile = async (
  studentId: number,
  studentData: IBuddyStudent,
  setLoading: (value: React.SetStateAction<boolean>) => void,
  setError: (value: React.SetStateAction<boolean>) => void,
  setErrorMessage: (value: React.SetStateAction<string>) => void,) => {
  
  const url = `${BASE_URL}/buddy/student/${studentId}/`
  const data = {only_view: { ...studentData.only_view }}
  console.log("DATA HERE", JSON.stringify(data));
  

  setLoading(true);
  
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": BUDDY_TOKEN,
        },
      body: (JSON.stringify(data))
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
import { useState } from "react";
import { IUser } from "../classes/IUser";
import {BASE_URL, BASE_TOKEN} from "@env";
import { IArrival } from "../classes/IArrival";

export const fetchArrivalUserInfo = (user_id: number, setLoading: any, setArrivalData: any, setError: any, setErrorMessage: any) => {
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
      const userInfo = user.user?.user_info
      const data: IArrival = {
        citizenship: user?.citizenship,
        sex: user?.sex,
        user: {
          user_info: {
            full_name: userInfo?.full_name,
            contacts: userInfo?.contacts
          }
        },
        arrival_booking: {}
      }
      setArrivalData(data);
    })
    .finally(() => {
      setLoading(false)
    });
  }
  catch (error) {
    console.error("Ошибка: ", error)
    setLoading(false)
  }
}
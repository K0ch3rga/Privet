import {BASE_URL} from "@env";
import ArrivalDataProps from "../interfaces/ArrivalDataProps";
import {UserDataProps} from "../interfaces/UserDataProps";

type ArrivalProps = ArrivalDataProps & UserDataProps; // Или где взять user?

const sendArrivalBooking = async (
  arrivalData: ArrivalProps,
  setLoading: (value: React.SetStateAction<boolean>) => void,
  setError: (value: React.SetStateAction<boolean>) => void,
  setErrorMessage: (value: React.SetStateAction<string>) => void
) => {
  const url = `${BASE_URL}api/v1/student/arrival-booking/`;

  setLoading(true);
  let response;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arrivalData),
  })
    .then((r) => {
      if (r.ok) r.json;
      else {
        setError(true);
        setErrorMessage(JSON.stringify(r.json));
      }
    })
    .then((r) => {
      console.log("Успех: ", r);
      return r;
    })
    .catch((e) => {
      setError(true);
      setErrorMessage(e);
    });

  setLoading(false);
};

export default sendArrivalBooking;

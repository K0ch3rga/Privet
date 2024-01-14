import {BASE_URL} from "@env";
import {UserDataProps} from "../interfaces/UserDataProps";
import {IArrival} from "../classes/IArrival";

const sendArrivalBooking = async (
  arrivalData: IArrival,
  setLoading: (value: React.SetStateAction<boolean>) => void,
  setError: (value: React.SetStateAction<boolean>) => void,
  setData: (value: React.SetStateAction<string>) => void
) => {
  const url = `${BASE_URL}api/v1/student/arrival-booking/`;

  setLoading(true);
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arrivalData),
  })
    .then((r) => {
      if (r.ok) {
        let data = JSON.stringify(r.json());
        console.log("Успех: ", data);
        setData(data);
        setLoading(false);
      } else {
        setError(true);
        setData(JSON.stringify(r.json));
      }
    })
    .then((r) => {})
    .catch((e) => {
      setError(true);
      setData(e);
    });

  setLoading(false);
};

export default sendArrivalBooking;

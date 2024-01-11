import { IArrival } from "../classes/IArrival";
import { useStudentStore } from "../storage/StudentStore";
import { useArrivalStore } from "../storage/ArrivalStore";

export const getArrivalUserInfo = () => {
  const user = useStudentStore.getState().studentData
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
  useArrivalStore.setState({arrivalData: data})
}
import { IArrival } from "../classes/IArrival";
import { useUserStore } from "../storage/UserStore";
import { useArrivalStore } from "../storage/ArrivalStore";

export const getArrivalUserInfo = () => {
  const user = useUserStore.getState().userData
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
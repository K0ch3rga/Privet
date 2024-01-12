import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UnpayedScreen from "../screens/Payment/UnpayedScreen";
import PaymentSuccess from "../screens/Payment/PaymentSuccess";
import ToDoScreen from "../screens/ToDoScreen";
import NoArrivalsScreen from "../screens/Arrivals/NoArrivalsScreen";
import CreateArrival from "../screens/Arrivals/CreateArrival";
import AddStudentToArrival from "../screens/Arrivals/AddStudentToArrival";
import ArrivalFinalScreen from "../screens/Arrivals/ArrivalFinalScreen";
import { useAccountStore } from "../storage/AccountStore";
import BuddyNotConfirmed from "../screens/Buddy/BuddyNotConfirmed";

const Stack = createNativeStackNavigator();

const Unpayed: React.FC = () => {
  return(
    <Stack.Navigator initialRouteName="Unpayed" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Unpayed" component={UnpayedScreen} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
    </Stack.Navigator>
  )
}

const CreateArrivalRoute: React.FC = () => {
  return(
    <Stack.Navigator initialRouteName="NoArrivals" screenOptions={{headerShown: false}}>
      <Stack.Screen name="NoArrivals" component={NoArrivalsScreen} />
      <Stack.Screen name="CreateArrival" component={CreateArrival} />
      <Stack.Screen name="AddStudents" component={AddStudentToArrival} />
      <Stack.Screen name="ArrivalFinal" component={ArrivalFinalScreen} />
    </Stack.Navigator>
  )
}

const StudentTodo: React.FC = () => {
  const isPaid = useAccountStore(state => state.isPaid)
  const isArrivalExist = useAccountStore(state => state.isArrivalExist)
  
  if (!isPaid) {
    return (<Unpayed />)
  }
  
  if (!isArrivalExist) {
    return (<CreateArrivalRoute />)
  }

  return <ToDoScreen />
}

const BuddyTodo: React.FC = () => {
  const isBuddyConfirmed = useAccountStore(state => state.isBuddyConfirmed)
  
  if (!isBuddyConfirmed) {
    return (<BuddyNotConfirmed />)
  }
  
  return <ToDoScreen />
}

const RoutesToDo: React.FC = () => {
  const isBuddy = useAccountStore(state => state.isBuddy)

  if (isBuddy) {
    return <BuddyTodo />
  }

  return <StudentTodo />
}

export default RoutesToDo;
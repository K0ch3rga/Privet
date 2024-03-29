import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UnpaidScreen from "../screens/Payment/UnpaidScreen";
import PaymentSuccess from "../screens/Payment/PaymentSuccess";
import ToDoScreen from "../screens/ToDoScreen";
import NoArrivalsScreen from "../screens/StudentArrivals/NoArrivalsScreen";
import CreateArrival from "../screens/StudentArrivals/CreateArrival";
import AddStudentToArrival from "../screens/StudentArrivals/AddStudentToArrival";
import ArrivalFinalScreen from "../screens/StudentArrivals/ArrivalFinalScreen";
import { useAccountStore } from "../storage/AccountStore";
import BuddyNotConfirmed from "../screens/Buddy/BuddyNotConfirmed";
import ArrivalsList from "../screens/Buddy/ArrivalsList";
import ArrivalInfoScreen from "../screens/Buddy/ArrivalInfoScreen";
import BuddyStudentProfileScreen from "../screens/Buddy/BuddyStudentProfileScreen";
import ArrivalTodo from "../screens/Buddy/ArrivalTodo";
import AllTodos from "../screens/Buddy/MyArrivals";
import ArrivalStudents from "../screens/Buddy/ArrivalStudents";

const Stack = createNativeStackNavigator();

const Unpayed: React.FC = () => {
  return(
    <Stack.Navigator initialRouteName="Unpayed" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Unpayed" component={UnpaidScreen} />
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

const BuddyTodoRoute: React.FC = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AllTodos" component={AllTodos}/>
      <Stack.Screen name="ArrivalTodo" component={ArrivalTodo}/>
      <Stack.Screen name="ArrivalStudents" component={ArrivalStudents}/>
      <Stack.Screen name="BuddyStudentProfile" component={BuddyStudentProfileScreen}/>
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
  return <BuddyTodoRoute />
}

const RoutesToDo: React.FC = () => {
  const isBuddy = useAccountStore(state => state.isBuddy)
  const isLeader = useAccountStore(state => state.isLeader)

  if (isBuddy || isLeader) {
    return <BuddyTodo />
  }

  return <StudentTodo />
}

export default RoutesToDo;
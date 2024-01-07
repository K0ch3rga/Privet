import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UnpayedScreen from "../screens/Payment/UnpayedScreen";
import PaymentSuccess from "../screens/Payment/PaymentSuccess";
import ToDoScreen from "../screens/ToDoScreen";
import NoArrivalsScreen from "../screens/Arrivals/NoArrivalsScreen";
import CreateArrival from "../screens/Arrivals/CreateArrival";

const Stack = createNativeStackNavigator();

const payed = true;
const arrivalExist = false;

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
    <Stack.Navigator initialRouteName="CreateArrival" screenOptions={{headerShown: false}}>
      <Stack.Screen name="NoArrivals" component={NoArrivalsScreen} />
      <Stack.Screen name="CreateArrival" component={CreateArrival} />
      <Stack.Screen name="ArrivalConfirmed" component={PaymentSuccess} />
    </Stack.Navigator>
  )
}

const RoutesToDo: React.FC = () => {
  if (!payed) {
    return (<Unpayed />)
  }
  
  if (!arrivalExist) {
    return (<CreateArrivalRoute />)
  }

  return <ToDoScreen />
}

export default RoutesToDo;
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArrivalsList from "../screens/Buddy/ArrivalsList";
import ArrivalInfoScreen from "../screens/Buddy/ArrivalInfoScreen";
import BuddyStudentProfileScreen from "../screens/Buddy/BuddyStudentProfileScreen";
import ToDoScreen from "../screens/ToDoScreen";

const Stack = createNativeStackNavigator();

export const BuddyArrivalsRoute: React.FC = () => {
  return(
    <Stack.Navigator initialRouteName="ArrivalsList" screenOptions={{headerShown: false}}>
      <Stack.Screen name="ArrivalsList" component={ArrivalsList} />
      <Stack.Screen name="ArrivalScreen" component={ArrivalInfoScreen} />
      <Stack.Screen name="StudentProfile" component={BuddyStudentProfileScreen} />
      <Stack.Screen name="ToDos" component={ToDoScreen} />
    </Stack.Navigator>
  )
}
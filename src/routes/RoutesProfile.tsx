import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import NotificationsScreen from "../screens/Profile/NotificationsScreen";
import SelectLanguageScreen from "../screens/Registration/SelectLanguageScreen";

const Stack = createNativeStackNavigator();

const RoutesProfile: React.FC = () => {
  return(
    <Stack.Navigator initialRouteName="ProfileInfo" screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileInfo" component={ProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="SelectLanguage" component={SelectLanguageScreen} />
    </Stack.Navigator>
  )
}

export default RoutesProfile;
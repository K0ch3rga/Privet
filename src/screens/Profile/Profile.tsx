import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./ProfileScreen";
import ProfileInfoScreen from "./ProfileInfoScreen";
import NotificationsScreen from "./NotificationsScreen";
import SelectLanguageScreen from "../SelectLanguageScreen";

const Stack = createNativeStackNavigator();

const Profile: React.FC = () => {
  return(
    <Stack.Navigator initialRouteName="ProfileInfo">
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ProfileInfo" component={ProfileInfoScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="SelectLanguage" component={SelectLanguageScreen} />
    </Stack.Navigator>
  )
}

export default Profile;
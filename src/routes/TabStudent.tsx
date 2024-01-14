import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabScreens } from "../../App";
import RoutesToDo from "./RoutesToDo";
import { Image, Text } from "react-native";
import RoutesProfile from "./RoutesProfile";
import ChatScreen from "../screens/Chat";
import { mainColor, textColor } from "../defaultColors";

const Tab = createBottomTabNavigator<TabScreens>();

const PathScreen = () => {
  return (
    <>
      <Text>Path</Text>
    </>
  )
}

export const TabStudent = () => {
  return(
    <Tab.Navigator screenOptions={
      {
        headerShown: false, 
        tabBarStyle: {height: 69, backgroundColor: mainColor}, 
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          color: textColor,
          fontFamily: "Manrope",
          fontWeight: "700",
          fontSize: 12
        }
      }} >
      <Tab.Screen name="Profile" component={RoutesProfile} 
        options={{tabBarIcon:() =>(<Image source={require("../assets/icons/profile.png")} style={{width: 32, height: 32}} />),}}
      />
      <Tab.Screen name="Tasks" component={RoutesToDo}
        options={{tabBarIcon:()=>(<Image source={require("../assets/icons/tasks.png")} style={{width: 32, height: 32}}/>),}}
      />
      <Tab.Screen name="Chats" component={ChatScreen}
        options={{tabBarIcon:()=>(<Image source={require("../assets/icons/messenger.png")} style={{width: 32, height: 32}}/>),}}
      />
      <Tab.Screen name="Path" component={PathScreen}
        options={{tabBarIcon: () => (<Image source={require("../assets/icons/location.png")} style={{width: 32, height: 32}}/>),}}
        />
      {/* <Tab.Screen name="Info" component={SelectLanguageScreen}
        options={{tabBarIcon: () => (<Image source={require("./src/assets/icons/info.png")}style={{width: 32, height: 32}}/>),}}
      /> */}
    </Tab.Navigator>
  );
};
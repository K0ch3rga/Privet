import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabScreens } from "../../App";
import { buddyColor, textColor } from "../defaultColors";
import { ColorValue, Image } from "react-native";
import RoutesToDo from "./RoutesToDo";
import RoutesProfile from "./RoutesProfile";
import ChatScreen from "../screens/Chat";
import AllTodos from "../screens/Buddy/MyArrivals";
import { BuddyArrivalsRoute } from "./RoutesArrivals";
import MyStudentsList from "../screens/StudentsForBuddy/MyStudentsList";

const Tab = createBottomTabNavigator<TabScreens>();

export const TabBuddy: React.FC<{ color: ColorValue}> = ({ color }) => {
  return(
    <Tab.Navigator 
      screenOptions={
        {
          headerShown: false, 
          tabBarStyle: {height: 69, backgroundColor: color}, 
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            color: textColor,
            fontFamily: "Manrope",
            fontWeight: "700",
            fontSize: 12
          }
        }}
    >
      <Tab.Screen name="Profile" component={RoutesProfile}
        options={{tabBarIcon:() =>(<Image source={require("../assets/icons/profile.png")} style={{width: 32, height: 32}} />),}}
      />
      <Tab.Screen name="Tasks"component={AllTodos}
        options={{tabBarIcon:()=>(<Image source={require("../assets/icons/tasks.png")} style={{width: 32, height: 32}}/>),}}
      />
      
      <Tab.Screen name="Chats" component={ChatScreen}
        options={{tabBarIcon:()=>(<Image source={require("../assets/icons/messenger.png")} style={{width: 32, height: 32}}/>),}}
      />
      <Tab.Screen name="Arrivals" component={BuddyArrivalsRoute}
          options={{tabBarIcon: () => (<Image source={require("../assets/icons/arrivals.png")} style={{width: 32, height: 32}} />),}}
      />
      <Tab.Screen name="Students" component={MyStudentsList}
        options={{tabBarIcon: () => (<Image source={require("../assets/icons/students.png")} style={{width: 32, height: 32}} />),}}
      />
    </Tab.Navigator>
  );
};
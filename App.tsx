import {useEffect, useState, createContext} from "react";
import {StyleSheet, Text, View, StatusBar, Image} from "react-native";
import {useFonts} from "expo-font";

// Navigation
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import RegistrationScreen from "./src/screens/RegistrationScreen";
import EnterCodeScreen from "./src/screens/EnterCodeScreen";
import ProfileScreen from "./src/screens/Profile/ProfileScreen";
import ProfileInfoScreen from "./src/screens/Profile/ProfileInfoScreen";
import NotificationsScreen from "./src/screens/Profile/NotificationsScreen";
import SelectLanguageScreen from "./src/screens/SelectLanguageScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LogInScreen from "./src/screens/LogInScreen";
import EnterEmailScreen from "./src/screens/EnterEmailScreen";
import EnterNewPasswordScreen from "./src/screens/EnterNewPasswordScreen";
import ToDoScreen from "./src/screens/ToDoScreen";
import Messenger from "./src/screens/Messenger";

import Carousel from "./src/components/Carousel/Carousel";
import { mainColor } from "./src/defaultColors";
<<<<<<< Updated upstream
import Profile from "./src/screens/Profile/Profile";
=======
import Chat from "./src/screens/Chat";
>>>>>>> Stashed changes

const Stack = createNativeStackNavigator();

const Auth = () => {
  return(
    <Stack.Navigator initialRouteName="Welcome" >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="EnterCode" component={EnterCodeScreen} />
      <Stack.Screen name="LogIn" component={LogInScreen} />
      <Stack.Screen name="EnterEmail" component={EnterEmailScreen} />
      <Stack.Screen name="EnterNewPassword" component={EnterNewPasswordScreen} />
    </Stack.Navigator>
  )
}

const MessengerScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Chat" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Chat" component={Chat}/>
      <Stack.Screen name="Messenger" component={Messenger}/>
    </Stack.Navigator>
  )
}

const MainApp = () => {
  const Tab = createBottomTabNavigator();  // в какой-то момент это может сломаться
  // далее нужно в каждой вкладке создавать stack
  return(
<<<<<<< Updated upstream
    <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: {backgroundColor: mainColor, height: 69}}} >
      <Tab.Screen name="Profile" component={Profile} 
=======
    <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: {backgroundColor: mainColor, height: 69}}} initialRouteName="Messenger">
      <Tab.Screen name="Profile" component={ProfileScreen} 
>>>>>>> Stashed changes
        options={{tabBarIcon: ()=><Image source={require('./src/assets/icons/profile.png')} style={{width: 32, height: 32}} />}} />
      <Tab.Screen name="ToDo" component={ToDoScreen} 
        options={{tabBarIcon: ()=><Image source={require('./src/assets/icons/tasks.png')} style={{width: 32, height: 32}} />}}/>
      <Tab.Screen name="Messenger" component={MessengerScreen} 
        options={{tabBarIcon: ()=><Image source={require('./src/assets/icons/messenger.png')} style={{width: 32, height: 32}} />}}/>
      <Tab.Screen name="Location?" component={NotificationsScreen} 
        options={{tabBarIcon: ()=><Image source={require('./src/assets/icons/location.png')} style={{width: 32, height: 32}} />}}/>
      <Tab.Screen name="Info" component={SelectLanguageScreen} 
        options={{tabBarIcon: ()=><Image source={require('./src/assets/icons/info.png')} style={{width: 32, height: 32}} />}}/>
      {/* <Tab.Screen name="Test" component={Nav} /> */}
    </Tab.Navigator>
  );
}

const getLogin = () => true;

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Jua: require("./src/assets/fonts/Jua-Regular.ttf"),
    LilitaOne: require("./src/assets/fonts/LilitaOne-Rus.ttf"),
    "KumbhSans-Medium": require("./src/assets/fonts/KumbhSans-Medium.ttf"),
    "Manrope-Light": require("./src/assets/fonts/Manrope-Light.ttf"),
    "Manrope-Medium": require("./src/assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Regular": require("./src/assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Bold": require("./src/assets/fonts/Manrope-Bold.ttf"),
    "Manrope-SemiBold": require("./src/assets/fonts/Manrope-SemiBold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  } 

  const isSigned = getLogin()

  return (
    <NavigationContainer>
      {isSigned ?
      <MainApp/>:
      <Auth/>}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

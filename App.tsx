import {useEffect, useState, createContext} from "react";
import {StyleSheet, Text, View, StatusBar} from "react-native";
import {useFonts} from "expo-font";

// Navigation
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import RegistrationScreen from "./src/screens/RegistrationScreen";
import EnterCodeScreen from "./src/screens/EnterCodeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ProfileInfoScreen from "./src/screens/ProfileInfoScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import SelectLanguageScreen from "./src/screens/SelectLanguageScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LogInScreen from "./src/screens/LogInScreen";
import EnterEmailScreen from "./src/screens/EnterEmailScreen";
import EnterNewPasswordScreen from "./src/screens/EnterNewPasswordScreen";
import ToDoScreen from "./src/screens/ToDoScreen";

import Carousel from "./src/components/Carousel/Carousel";

const Stack = createNativeStackNavigator();

const Auth = () => {
  return(
    <Stack.Navigator initialRouteName="Welcome" >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="EnterCode" component={EnterCodeScreen} />
    </Stack.Navigator>
  )
}

const MainApp = () => {
  const Tab = createBottomTabNavigator();
  return(
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="SelectLanguage" component={SelectLanguageScreen} />
      <Tab.Screen name="Test" component={Carousel} />
      <Tab.Screen name="ProfileInfo" component={ProfileInfoScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="ToDo" component={ToDoScreen} />
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
      <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
        <Stack.Screen name='SelectLanguage' component={SelectLanguageScreen} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
        <Stack.Screen name='Test' component={Carousel} />
        <Stack.Screen name='Registration' component={RegistrationScreen} />
        <Stack.Screen name='EnterCode' component={EnterCodeScreen} />
        <Stack.Screen name='ProfileInfo' component={ProfileInfoScreen} />
        <Stack.Screen name='Notifications' component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

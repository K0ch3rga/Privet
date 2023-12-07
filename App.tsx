import { useEffect } from "react";
import {StyleSheet, Text, View, StatusBar} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

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

import Carousel from "./src/components/Carousel/Carousel";

function Welcome() {
  return <WelcomeScreen />;
}

function Test() {
  return <Carousel />
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
      "Jua": require("./src/assets/fonts/Jua-Regular.ttf"),
      "LilitaOne": require("./src/assets/fonts/LilitaOne-Rus.ttf"),
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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
        <Stack.Screen name='Registration' component={RegistrationScreen} />
        <Stack.Screen name='LogIn' component={LogInScreen} />
        <Stack.Screen name='EnterEmail' component={EnterEmailScreen} />
        <Stack.Screen name='EnterNewPassword' component={EnterNewPasswordScreen} />
        <Stack.Screen name='SelectLanguage' component={SelectLanguageScreen} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
        <Stack.Screen name='Test' component={Carousel} />
        <Stack.Screen name='EnterCode' component={EnterCodeScreen} />
        <Stack.Screen name='ProfileInfo' component={ProfileInfoScreen} />
        <Stack.Screen name='Notifications' component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
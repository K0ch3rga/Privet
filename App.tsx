import {StyleSheet, Text, View, StatusBar} from "react-native";
import { useFonts } from "expo-font";
import YellowButton from "./src/components/YellowButton";
import WelcomeScreen from "./src/components/WelcomeScreen";
import Carousel from "./src/components/Carousel";
import Paginator from "./src/components/Paginator";
import RegistrationScreen from "./src/components/registration/RegistrationScreen";
import EnterCodeScreen from "./src/components/EnterCodeScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ProfileScreen from "./src/components/ProfileScreen";

function Welcome() {
  return <WelcomeScreen />;
}

function Test() {
  return <Carousel />
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
      "LilitaOne": require("./src/assets/fonts/LilitaOne-Rus.ttf"),
      "KumbhSans500": require("./src/assets/fonts/KumbhSans-Medium.ttf"),
      "Manrope-Light": require("./src/assets/fonts/Manrope-Light.ttf"),
      "Manrope-Medium": require("./src/assets/fonts/Manrope-Medium.ttf"),
      "Manrope-Regular": require("./src/assets/fonts/Manrope-Regular.ttf"),
      "Manrope-SemiBold": require("./src/assets/fonts/Manrope-SemiBold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Test">
    //     <Stack.Screen name='Welcome' component={Welcome} />
    //     <Stack.Screen name='Test' component={Test} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <ProfileScreen />
    // <RegistrationScreen />
  );
}

const styles = StyleSheet.create({});
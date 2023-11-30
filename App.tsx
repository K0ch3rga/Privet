import {StyleSheet, Text, View, StatusBar} from "react-native";
import YellowButton from "./src/components/YellowButton";
import WelcomeScreen from "./src/components/WelcomeScreen";
import Carousel from "./src/components/Carousel";
import Paginator from "./src/components/Paginator";
import RegistrationScreen from "./src/components/registration/RegistrationScreen";
import EnterCodeScreen from "./src/components/EnterCodeScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

function Welcome() {
  return <WelcomeScreen />;
}

function Test() {
  return <Carousel />
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Test">
        <Stack.Screen name='Welcome' component={Welcome} />
        <Stack.Screen name='Test' component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
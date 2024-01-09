import {useReducer, useState} from "react";
import {Image} from "react-native";
import {useFonts} from "expo-font";

// Navigation
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {BottomTabScreenProps, createBottomTabNavigator} from "@react-navigation/bottom-tabs";

// Screens
import RegistrationScreen from "./src/screens/RegistrationScreen";
import EnterCodeScreen from "./src/screens/EnterCodeScreen";
// import ProfileScreen from "./src/screens/Profile/ProfileScreen";
import ProfileInfoScreen from "./src/screens/Profile/ProfileInfoScreen";
import NotificationsScreen from "./src/screens/Profile/NotificationsScreen";
import SelectLanguageScreen from "./src/screens/SelectLanguageScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LogInScreen from "./src/screens/LogInScreen";
import EnterEmailScreen from "./src/screens/EnterEmailScreen";
import EnterNewPasswordScreen from "./src/screens/EnterNewPasswordScreen";
import ToDoScreen from "./src/screens/ToDoScreen";
import Messenger from "./src/screens/Messenger";
import ChatScreen from "./src/screens/Chat";
import Profile from "./src/screens/Profile/Profile";

import {mainColor} from "./src/defaultColors";
import {Languages, Locales, LocaleContext, LocaleProvider} from "./src/locale";

export type TabScreens = {
  Profile: undefined;
  ToDo: undefined;
  ChatScreen: undefined;
  Route: undefined;
  Info: undefined;
};

export type Screens = {
  // Все данные для передачи между экранами
  Welcome: undefined;
  Registration: undefined;
  EnterCode: undefined;
  LogIn: undefined;
  EnterEmail: undefined;
  EnterNewPassword: undefined;
  Tab: BottomTabScreenProps<TabScreens>;
  Messenger: {id: number};
  ProfileInfo: undefined;
  Notifications: undefined;
};

export type ScreenProps = NativeStackScreenProps<Screens>;
// Composite Screen Props https://reactnavigation.org/docs/typescript/#combining-navigation-props НЕ ИСПОЛЬЗОВАТЬ

const Stack = createNativeStackNavigator<Screens>();
const Tab = createBottomTabNavigator<TabScreens>();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="EnterCode" component={EnterCodeScreen} />
      <Stack.Screen name="LogIn" component={LogInScreen} />
      <Stack.Screen name="EnterEmail" component={EnterEmailScreen} />
      <Stack.Screen name="EnterNewPassword" component={EnterNewPasswordScreen} />
    </Stack.Navigator>
  );
};

const MainApp = () => {
  // Все новые экраны записывать сюда
  // Я не уверен, насколько легально создавать два навигатора
  // Если очень хочется красоты, то можно попробовать Stack.Group
  return (
    <Stack.Navigator initialRouteName="Tab" screenOptions={{headerShown: false}}>
      {/* Главная навигация, основные пять панелей */}
      <Stack.Screen name="Tab" component={TabNavigation} />
      {/* Мессенджер */}
      <Stack.Screen name="Messenger" component={Messenger} />
      <Stack.Screen name="ProfileInfo" component={ProfileInfoScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: mainColor, height: 69},
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("./src/assets/icons/profile.png")}
              style={{width: 32, height: 32}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ToDo"
        component={ToDoScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("./src/assets/icons/tasks.png")}
              style={{width: 32, height: 32}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("./src/assets/icons/messenger.png")}
              style={{width: 32, height: 32}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Route"
        component={() => <></>}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("./src/assets/icons/location.png")}
              style={{width: 32, height: 32}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Info"
        component={SelectLanguageScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("./src/assets/icons/info.png")}
              style={{width: 32, height: 32}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

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

  const isSigned = getLogin();


  
  // const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LocaleProvider>
      <NavigationContainer>{isSigned ? <MainApp /> : <Auth />}</NavigationContainer>
    </LocaleProvider>
  );
}

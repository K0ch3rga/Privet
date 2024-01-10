import {useReducer, useState, useEffect} from "react";
import {Image} from "react-native";
import {useFonts} from "expo-font";

// Navigation
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {BottomTabScreenProps, createBottomTabNavigator} from "@react-navigation/bottom-tabs";

// Screens
import RegistrationScreen from "./src/screens/Registration/RegistrationScreen";
import EnterCodeScreen from "./src/screens/Registration/EnterCodeScreen";
import ProfileScreen from "./src/screens/Profile/ProfileScreen";
import NotificationsScreen from "./src/screens/Profile/NotificationsScreen";
import SelectLanguageScreen from "./src/screens/Registration/SelectLanguageScreen";
import WelcomeScreen from "./src/screens/Registration/WelcomeScreen";
import LogInScreen from "./src/screens/Registration/LogInScreen";
import EnterEmailScreen from "./src/screens/Registration/EnterEmailScreen";
import EnterNewPasswordScreen from "./src/screens/Registration/EnterNewPasswordScreen";
import Messenger from "./src/screens/Messenger";
import ChatScreen from "./src/screens/Chat";
import RoutesProfile from "./src/routes/RoutesProfile";

import {mainColor} from "./src/defaultColors";
import RoutesToDo from "./src/routes/RoutesToDo";
import { fetchUserInfo } from "./src/requests/GetProfileInfo";
import Popup from "./src/components/Popup";
import { useAccountStore } from "./src/storage/AccountStore";
import {Languages, Locales, LocaleContext, LocaleProvider} from "./src/locale";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

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
      <Stack.Screen name="ProfileInfo" component={ProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};

const TabNavigation = () => {
  return(
    <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: {backgroundColor: mainColor, height: 69}, tabBarShowLabel:false}} >
      <Tab.Screen name="ToDo"component={RoutesToDo}
        options={{tabBarIcon:()=>(<Image source={require("./src/assets/icons/tasks.png")} style={{width: 32, height: 32}}/>),}}
      />
      <Tab.Screen name="Profile" component={RoutesProfile} 
        options={{tabBarIcon:() =>(<Image source={require("./src/assets/icons/profile.png")} style={{width: 32, height: 32}} />),}}
      />
      <Tab.Screen name="ToDoScreen"component={ToDoScreen}
        options={{tabBarIcon:()=>(<Image source={require("./src/assets/icons/tasks.png")} style={{width: 32, height: 32}}/>),}}
      />
      <Tab.Screen name="ChatScreen" component={ChatScreen}
        options={{tabBarIcon:()=>(<Image source={require("./src/assets/icons/messenger.png")} style={{width: 32, height: 32}}/>),}}
      />
      <Tab.Screen
        name="Route"
        component={ToDoScreen}
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
    "Manrope": require("./src/assets/fonts/Manrope.ttf"),
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const isLoggedIn = useAccountStore(state => state.isLoggedIn)
  const user_id = useAccountStore(state => state.user_id)

  if (!!user_id) {
    useEffect(() => {
      fetchUserInfo(user_id, setError, setErrorMessage, setLoading);
    }, [])
  }
  
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // const isSigned = getLogin();

  return (
    <SafeAreaProvider>
    <LocaleProvider>
        <NavigationContainer>{isLoggedIn ? <MainApp /> : <Auth />}</NavigationContainer>
    </LocaleProvider>
  </SafeAreaProvider>
  );
}

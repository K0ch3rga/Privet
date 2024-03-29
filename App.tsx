import {useReducer, useState, useEffect} from "react";
import {Image, Pressable, Text} from "react-native";
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

import {buddyColor, buddyBackgroundColor, mainColor, teamLeadColor} from "./src/defaultColors";
import RoutesToDo from "./src/routes/RoutesToDo";
import Popup from "./src/components/Popup";
import {getPageColor, useAccountStore} from "./src/storage/AccountStore";
import {
  Languages,
  Locales,
  LocaleContext,
  LocaleProvider,
  useLocale,
  Screens as ScreensLocale,
} from "./src/locale";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import AllTodos from "./src/screens/Buddy/MyArrivals";
import ArrivalTodo from "./src/screens/Buddy/ArrivalTodo";
import Route from "./src/screens/PathScreen";
import Info from "./src/screens/Info";
import {TabBuddy} from "./src/routes/TabBuddy";
import {fetchUserInfo} from "./src/requests/GetProfileInfo";
import {TabStudent} from "./src/routes/TabStudent";
import PathItem from "./src/screens/PathItem";
import PathScreen from "./src/screens/PathScreen";

export type TabScreens = {
  Profile: undefined;
  Tasks: undefined;
  Chats: undefined;
  Arrivals: undefined;
  Students: undefined;
  ChatScreen: undefined;
  Route: undefined;
  Info: undefined;
  AllArrivals: undefined;
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
  // AllArrivals: undefined;
  ArrivalTodo: {id: number};
  PathItem: undefined;
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
      <Stack.Screen name="Tab" component={TabStudent} />
      {/* Мессенджер */}
      <Stack.Screen name="Messenger" component={Messenger} />
      <Stack.Screen name="ProfileInfo" component={ProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      {/* Прибытия */}
      <Stack.Group>
        {/* <Stack.Screen name="AllArrivals" component={AllArrivals} /> */}
        <Stack.Screen name="ArrivalTodo" component={ArrivalTodo} />
      </Stack.Group>
      <Stack.Screen name="PathItem" component={PathItem} />
      {/* <Stack.Screen name="Path" component={PathScreen}/> */}
    </Stack.Navigator>
  );
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Jua: require("./src/assets/fonts/Jua-Regular.ttf"),
    LilitaOne: require("./src/assets/fonts/LilitaOne-Rus.ttf"),
    "KumbhSans-Medium": require("./src/assets/fonts/KumbhSans-Medium.ttf"),
    Manrope: require("./src/assets/fonts/Manrope.ttf"),
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const isLoggedIn = useAccountStore((state) => state.isLoggedIn);
  const user_id = useAccountStore((state) => state.user_id);
  const isBuddy = useAccountStore((state) => state.isBuddy);
  const isTeamLead = useAccountStore((state) => state.isLeader);

  useEffect(() => {
    if (!!user_id) {
      fetchUserInfo(user_id, setError, setErrorMessage, setLoading);
    }
  }, []);

  const getMainApp = () => {
    if (!isLoggedIn) {
      return <Auth />;
    }
    if (isTeamLead) {
      return <TabBuddy color={teamLeadColor} />;
    }
    if (isBuddy) {
      return <TabBuddy color={buddyColor} />;
    }
    return <MainApp />;
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <LocaleProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
          <NavigationContainer>{getMainApp()}</NavigationContainer>
        </SafeAreaView>
      </LocaleProvider>

      {isLoading && (
        <Popup>
          <Text>Loading...</Text>
        </Popup>
      )}

      {error && (
        <Popup close={() => setError(false)}>
          <Text>{errorMessage}</Text>
        </Popup>
      )}
    </SafeAreaProvider>
  );
}

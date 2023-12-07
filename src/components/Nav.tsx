import {View, Text, Button} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Nav = () => {
  const profile = {title: 'Profile', func: () => {
    console.log("Profile");
    // navigation.navigate(profile.title)
  }}

  return (
    <>
      <Button title={"Welcome"} onPress={() => console.log("Welcome")} />
      <Button title={"Task"} onPress={() => console.log("Task")} />
    </>
  );
};

export interface NavProps {

};

export default Nav;

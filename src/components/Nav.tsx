import {View, Text, Button} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const Nav = (p:BottomTabBarProps) => {
  const profile = {title: 'Profile', func: () => {
    console.log("Profile");
    // navigation.navigate(profile.title)
  }}

  console.log(p);
  console.log(p.descriptors);

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

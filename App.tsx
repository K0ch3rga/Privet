import { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import YellowButton from "./src/components/YellowButton";
import WelcomeScreen from "./src/components/WelcomeScreen";
import Carousel from "./src/components/Carousel";
import Paginator from "./src/components/Paginator";

export default function App() {

  return (
    <>
      {/* <WelcomeScreen /> */}
      {/* <YellowButton title='Button' onPress={()=>console.log('pressed')} showArrow={true}/> */}
      {/* <Select data={data}/> */}
      <Carousel />
      {/* <Paginator data={[{key: "1", imagePath: "../assets/cat/cat1.png", text: "Текст"},
    {key: "2", imagePath: "../assets/cat/cat2.png", text: "Текст"},]}/> */}
    </>
  );
}

const styles = StyleSheet.create({
  
});

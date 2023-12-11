import {StyleSheet, View, Button, FlatList, Image, Text} from "react-native";
import {useState, useRef} from "react";
import CarouselItem, {CarouselItemProps} from "./CarouselItem";
import Paginator, {PaginatorProps} from "./Paginator";
import SmallLogo from "../Logos/SmallLogo";

const Carousel = () => {

  const data: CarouselItemProps[] = [
    {key: "1", image: './src/assets/cat/cat1.jpg', text: "Текст"},
    {key: "2", image: '../assets/cat/cat2.png', text: "Текст"},
    {key: "3", image: '../assets/cat/cat3.png', text: "Текст"},
  ];
  
  
  return (
    <View style={style.container}>
      <SmallLogo />
      <FlatList
        data={data}
        renderItem={({item}: {item: CarouselItemProps}) => (
          <CarouselItem key={item.key} image={item.image} text={item.text} />
        )}
        horizontal
        pagingEnabled
        bounces
      />
      <Paginator data={data} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image:{
    width: 52,
    height: 52
  }
});

export interface CarouselProps {}

export default Carousel;

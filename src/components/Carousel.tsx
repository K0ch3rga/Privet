import {StyleSheet, View, Button, FlatList, Image, Text} from "react-native";
import {useState, useRef} from "react";
import CarouselItem, {CarouselItemProps} from "./CarouselItem";
import Paginator, {PaginatorProps} from "./Paginator";

const Carousel = () => {
  const [page, setPage] = useState(1);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const data: CarouselItemProps[] = [
    {key: "1", imagePath: "../assets/cat/cat1.png", text: "Текст"},
    {key: "2", imagePath: "../assets/cat/cat2.png", text: "Текст"},
    {key: "3", imagePath: "../assets/cat/cat3.png", text: "Текст"},
    {key: "4", imagePath: "../assets/flags/english.png", text: "Текст"},
  ];

  return (
    <View style={style.container}>
      <Image source={require('../assets/logo.png')} style={style.image}/>
      <FlatList
        data={data}
        renderItem={({item}: {item: CarouselItemProps}) => (
          <CarouselItem key={item.key} imagePath={item.imagePath} text={item.text} />
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

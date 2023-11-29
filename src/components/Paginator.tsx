import {View, StyleSheet } from "react-native";
import {CarouselItemProps} from "./CarouselItem";

const Paginator = (props: PaginatorProps) => {
  // behold...
  return (
    <View style={style.container}>
      {props.data.map((_, i) =>{
        return <View style={style.dot} key={i.toString()} />
      })}
    </View>
  )};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 64,
    width: 200
  },
  dot:{
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#ffe59e',
    // backgroundColor: '#FFD869',
    marginHorizontal: 5
  }
})

export interface PaginatorProps{
  data: CarouselItemProps[]
}

export default Paginator;

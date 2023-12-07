import {Image, Text, View, StyleSheet, useWindowDimensions} from "react-native";

const CarouselItem = (props: CarouselItemProps) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[style.container, {width}]}>
      <View style={style.view}>
        <Text style={style.text}>{props.text}</Text>
        {/* <Image source={require(props.imagePath)} /> */}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignContent:'center',
    paddingHorizontal: 45.5
  },
  view: {
    borderWidth: 4,
    borderColor: '#FFD869',
    borderRadius: 5,
    height: 451
  },
  text: {
    fontWeight: '400',
    fontSize: 20
  }
});

export interface CarouselItemProps {
  key: string;
  image: any;
  text: string;
}

export default CarouselItem;

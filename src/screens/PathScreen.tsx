import {Pressable, ScrollView, StyleSheet, Text, Image} from "react-native";
import {ScreenProps} from "../interfaces/ScreenProps";
import {mainColor} from "../defaultColors";

const PathScreen: React.FC<ScreenProps> = ({navigation}) => {
  return (
    <ScrollView style={style.list}>
      <Item text="Аэропорт" left={true}></Item>
      <Image source={require('../assets/curve.png')} style={style.image}/>
      <Item text="Хостел" left={false}></Item>
      <Image source={require('../assets/curve.png')} style={[style.image,style.reversed]}/>
      <Item text="Обмен денег" left={true}></Item>
      <Image source={require('../assets/curve.png')} style={style.image}/>
      <Item text="Сим-карта" left={false}></Item>
      <Image source={require('../assets/curve.png')} style={[style.image,style.reversed]}/>
      <Item text="Медосмотр" left={true}></Item>
      <Image source={require('../assets/curve.png')} style={style.image}/>
      <Item text="Перевод паспорта" left={false}></Item>
      <Image source={require('../assets/curve.png')} style={[style.image,style.reversed]}/>
      <Item text="Банковская карта" left={true}></Item>
      <Image source={require('../assets/curve.png')} style={style.image}/>
      <Item text="Зачисление" left={false}></Item>
      <Image source={require('../assets/curve.png')} style={[style.image,style.reversed]}/>
      <Item text="Страховка" left={true}></Item>
      <Image source={require('../assets/curve.png')} style={style.image}/>
      <Item text="Общежитие" left={false}></Item>
      <Image source={require('../assets/curve.png')} style={[style.image,style.reversed]}/>
      <Item text="Электронный пропуск" left={true}></Item>
      <Image source={require('../assets/curve.png')} style={style.image}/>
      <Item text="Медосвидетельствование" left={false}></Item>
      <Image source={require('../assets/curve.png')} style={[style.image,style.reversed]}/>
      <Item text="Продление визы" left={true}></Item>
      <Image source={require('../assets/curve.png')} style={style.image}/>
      <Item text="Дактилоскопия" left={false}></Item>
    </ScrollView>
  );
};

const Item = ({text, left}: {text: string, left: boolean}) => {
  const side = left? style.left: style.right
  return (
    <Pressable style={[style.item, side]}>
      <Text style={style.text}>{text}</Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  list: {
    paddingHorizontal: 50,
    paddingVertical: 44
  },
  item: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    backgroundColor: mainColor,
  },
  left: {
    alignSelf: 'flex-start'
  },
  right: {
    alignSelf: 'flex-end'
  },
  text: {
    color: "262626",
    fontFamily: "Manrope",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  image: {
    alignSelf: 'center',
    height: 120,
    width: 220
  },
  reversed: {
    transform: [{rotateX: '180deg'}]
  }
});

export default PathScreen;

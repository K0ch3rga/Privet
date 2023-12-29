import {useState, useReducer, useEffect} from "react";
import {View, FlatList, Pressable, Text, StyleSheet, Image} from "react-native";
import {blackColor, buddyColor, grayColor, mainColor} from "../defaultColors";

const ToDoScreen = () => {
  const [data, setData] = useState([
    {done: false, text: "Встреча в аэропорту"},
    {done: false, text: "Оплата и заселение в хостел"},
    {done: false, text: "Оформление сим-карты"},
    {done: false, text: "Прохождение медосмотра"},
    {done: false, text: "Перевод паспорта с нотариальным заверением"},
    {done: false, text: "Оформление банковской карты"},
    {done: false, text: "Оформление документов о зачислении"},
    {done: false, text: "Оформление страховки"},
    {done: false, text: "Оформление документов на общежитие"},
    {done: false, text: "Оформление пропуска / студенческого билета"},
    {done: false, text: "Прохождение медосвидетельствования"},
    {done: false, text: "Продление визы"},
    {done: false, text: "Прохождение дактилоскопии"},
  ]);

  return (
    <View>
      <View style={style.label}>
        <Text>Текущее</Text>
        <Image source={require("../assets/steps.png")} style={style.image} ></Image>
      </View>
      <FlatList
        data={data.filter((i) => !i.done)}
        renderItem={(i) => <ToDoItem done={i.item.done} text={i.item.text} />}
      />

      <View style={style.label}>
        <Text>Выполнено</Text>
        <Image source={require("../assets/done.png")} style={style.image} ></Image>
      </View>
      <FlatList
        data={data.filter((i) => i.done)}
        renderItem={(i) => <ToDoItem done={i.item.done} text={i.item.text} />}
      />
    </View>
  );
};

const ToDoItem = (props: ToDoItemProps) => {
  const [isDone, setDone] = useState(props.done);
  const [isOpen, setOpen] = useState(false);
  const handleDone = () => setDone(!isDone);
  const handleOpen = () => console.log("open"); //setOpen(!isOpen);
  return (
    <Pressable onPress={handleOpen} style={style.item}>
      {isDone && (
        <Pressable style={[style.mark, style.doneMark]} onPress={handleDone} />
      )}
      {!isDone && <Pressable style={[style.mark, style.undoneMark]} onPress={handleDone}/>}
      <Text style={style.text}>{props.text}</Text>
    </Pressable>
  );
};

export type ToDoItemProps = {
  done: boolean;
  text: string;
};

const style = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "stretch",
    padding: 10,
  },
  undoneItem: {
    backgroundColor: "#EAEBFF",
  },
  doneItem: {

  },
  mark: {
    height: 25,
    width: 25,
    borderColor: blackColor,
    borderWidth: 3,
    borderRadius: 100,
  },
  undoneMark: {
    backgroundColor: "#EAEBFF",
  },
  doneMark: {
    backgroundColor: blackColor,
  },
  text: {
    marginHorizontal: 10,
  },
  label: {
    width: 156,
    height: 43,
    backgroundColor: mainColor,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    padding: 8,
    flex: 1,
    flexDirection: 'row',
    gap: 10
  },
  labelText: {
    fontFamily: 'Lilita One Rus',
    fontWeight: '400',

  },
  image: {
    height: 20,
    width: 20
  }
});

export default ToDoScreen;

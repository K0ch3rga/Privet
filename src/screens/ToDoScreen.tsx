import {useState, useReducer, useEffect} from "react";
import {View, FlatList, Pressable, Text, StyleSheet, TextInput,} from "react-native";
import { blackColor, buddyColor, grayColor } from "../defaultColors";

const ToDoScreen = () => {
  const [data, setData] = useState([{done: true, text: "бебебе"}, {done: false, text: "123"}]);
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);

  const addItem = (text: string) => {
    if (text != "" && text != null){
      // setData(data.push({done: false, text: text}))
      data.push({done: false, text: text}); // Это легально??
    }
    setEdit(false);
    setText("");
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}: {item: ToDoItemProps}) => (
          <ToDoItem done={item.done} text={item.text} />
        )}
        ItemSeparatorComponent={()=><View style={style.separator} />}
      />
      <View style={style.add}>
        {!edit ? (
        <Pressable onPress={() => setEdit(!edit)} >
          <Text>+ Add</Text>
        </Pressable>
        ) : (
        <>
          <TextInput autoFocus style ={style.input}
            onChange={({nativeEvent: {text}}) => setText(text)} 
            onSubmitEditing={() => addItem(text)} 
          />
          <Pressable onPress={() => addItem(text)}>
            <Text>Добавить</Text>
          </Pressable>
        </>
        )}
      </View>
    </View>
  );
};

const ToDoItem = (props: ToDoItemProps) => {
  const [isDone, setDone] = useState(props.done);
  const [text, setText] = useState(props.text);
  const onPress = () => setDone(!isDone);
  return (
    <Pressable onPress={onPress} style={style.item}>
      {isDone && <View style={[style.check, style.done]} />}
      {!isDone && <View style={[style.check, style.undone]} />}
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
    alignContent: 'center',
    alignItems: 'stretch',
    padding: 10
  },
  check: {
    height: 15,
    width: 15,
    borderColor: grayColor,
    borderWidth: 2,
    borderRadius: 4,
  },
  done: {
    backgroundColor: buddyColor,
  },
  undone: {},
  add: {
    margin: 10,
    padding: 10,
    borderTopWidth: 2,
    borderColor: grayColor,
    flex: 1
  },
  text: {
    marginHorizontal: 10,
  },
  separator:{
    marginHorizontal: 10,
    height: 1,
    backgroundColor: buddyColor,
    borderRadius: 2,
  },
  input: {
    borderColor: grayColor,
    borderWidth: 2,
    borderRadius: 5
  },
  inputContent: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }
});

export default ToDoScreen;

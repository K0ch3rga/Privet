import {useState, useReducer, useEffect} from "react";
import {View, Pressable, Text, StyleSheet, Image, ScrollView, TextInput} from "react-native";
import {blackColor, grayColor, mainColor} from "../defaultColors";
import {getPageColor} from "../storage/AccountStore";
// import ProgressBar from "../components/ProgressBar";

const ToDoScreen = () => {
  const [todos, setTodos] = useState<ToDoItemProps[]>([
    {id: 1, done: false, text: "Встреча в аэропорту"},
    {id: 2, done: false, text: "Оплата и заселение в хостел"},
    {id: 3, done: false, text: "Оформление сим-карты"},
    {id: 4, done: false, text: "Прохождение медосмотра"},
    {id: 5, done: false, text: "Перевод паспорта с нотариальным заверением"},
    {id: 6, done: false, text: "Оформление банковской карты"},
    {id: 7, done: false, text: "Оформление документов о зачислении"},
    {id: 8, done: false, text: "Оформление страховки"},
    {id: 9, done: false, text: "Оформление документов на общежитие"},
    {id: 10, done: false, text: "Оформление пропуска / студенческого билета"},
    {id: 11, done: false, text: "Прохождение медосвидетельствования"},
    {id: 12, done: false, text: "Продление визы", deadline: new Date()},
    {id: 13, done: true, text: "Прохождение дактилоскопии"},
  ]);

  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (id === todo.id ? {...todo, done: !todo.done} : todo)));
  };

  const undone = todos.filter((todo) => !todo.done);
  const done = todos.filter((todo) => todo.done);

  return (
    <View>
      <ScrollView contentContainerStyle={style.container}>
        <View style={style.counter}>
          <Text style={style.counterText}>
            Выполнено: {done.length}/{todos.length}
          </Text>
          <Image source={require('../assets/notifacations.png')}/>
          {/* <ProgressBar progress={done.length} max={todos.length} width={376}  /> */}
        </View>
        {undone.length > 0 && (
          <View>
            <Label text="Текущее" imgPath={require("../assets/steps.png")} />
            <View style={style.list}>
              {undone.map((i) => (
                <ToDoItem
                  done={i.done}
                  text={i.text}
                  key={i.id}
                  id={i.id}
                  deadline={i.deadline}
                  toggleFunc={toggleComplete}
                />
              ))}
            </View>
          </View>
        )}

        {done.length > 0 && (
          <View>
            <Label text="Выполнено" imgPath={require("../assets/done.png")} />
            <View style={style.list}>
              {done.map((i) => (
                <ToDoItem
                  done={i.done}
                  text={i.text}
                  key={i.id}
                  id={i.id}
                  deadline={i.deadline}
                  toggleFunc={toggleComplete}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const Label = ({text, imgPath}: {text: string; imgPath: any}) => {
  return (
    <View style={label.wrapper}>
      <View style={label.container}>
        <Text style={label.text}>{text}</Text>
        <View style={label.image}>
          <Image source={imgPath}></Image>
        </View>
      </View>
    </View>
  );
};

const ToDoItem = (props: ToDoItemProps & {toggleFunc: (id: number) => void}) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => setOpen(!isOpen);
  let color;
  if (props.done) {
    color = style.doneItem;
  } else {
    color = style.undoneItem;
  }

  const handleToggle = () => props.toggleFunc(props.id);

  return (
    <Pressable onPress={handleOpen} style={[item.container, color]}>
      <View style={item.main}>
        {props.done && <Pressable style={[style.mark, style.doneMark]} onPress={handleToggle} />}
        {!props.done && <Pressable style={[style.mark, style.undoneMark]} onPress={handleToggle} />}
        <View style={style.textWrapper}>
          <Text style={style.text}>{props.text}</Text>
          {props.deadline && (
            <Text style={style.deadLine}>{"До " + props.deadline.toLocaleDateString()}</Text>
          )}
        </View>
        <Image source={require("../assets/arrow_down.png")} />
      </View>
      {isOpen && (
        <TextInput placeholder="Комментарий к задаче" style={item.inputContainer}></TextInput>
      )}
    </Pressable>
  );
};

export type ToDoItemProps = {
  id: number;
  done: boolean;
  text: string;
  deadline?: Date;
  commentary?: string;
};

const style = StyleSheet.create({
  container: {},
  counter: {
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  counterText: {
    fontFamily: "Manrope",
    fontSize: 23,
    fontWeight: '400',
    lineHeight: 31,
    textAlign: 'left'
    
  },
  list: {
    marginBottom: 10, // Работает вместе с margin у label
    flex: 1,
    gap: 10,
  },
  // перенести
  undoneItem: {
    backgroundColor: "#FFD8693D",
  },
  deadlineItem: {
    backgroundColor: "#FFCECE",
  },
  doneItem: {
    backgroundColor: getPageColor() + "1C",
  },
  mark: {
    height: 25,
    width: 25,
    borderColor: blackColor,
    borderWidth: 3,
    borderRadius: 100,
  },
  undoneMark: {
    backfaceVisibility: 'hidden',
  },
  doneMark: {
    backgroundColor: blackColor,
  },
  textWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 7
  },
  text: {
    marginHorizontal: 10,
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 14,
  },
  deadLine: {
    color: grayColor,
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 12,
  },
});

const label = StyleSheet.create({
  wrapper: {
    // Помогите
    marginVertical: 10,
    height: 43,
    flex: 1,
    alignItems: "center",
  },
  container: {
    height: 43,
    backgroundColor: mainColor,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontFamily: "LilitaOne",
    fontWeight: "400",
    fontSize: 24,
  },
  image: {
    height: 20,
    width: 20,
  },
});

const item = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    borderRadius: 10,
    paddingHorizontal: 16,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  main: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#455A644A",
    backgroundColor: "#fff",
  },
});

export default ToDoScreen;

import {useState} from "react";
import {View, Pressable, Text, StyleSheet, Image, ScrollView, TextInput} from "react-native";
import {blackColor, grayColor} from "../../defaultColors";
import {getPageColor} from "../../storage/AccountStore";
import {ToDoItemProps} from "../ToDoScreen";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Screens} from "../../../App";
import {ScreenProps} from "../../interfaces/ScreenProps";

// import ProgressBar from "../components/ProgressBar";

const ArrivalTodo: React.FC<ScreenProps> = ({navigation}) => {
  const storedData: ToDoItemProps[][] = [
    [
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
    ],
    [
      {id: 1, done: true, text: "Встреча в аэропорту"},
      {id: 2, done: true, text: "Оплата и заселение в хостел"},
      {id: 3, done: true, text: "Оформление сим-карты"},
      {id: 4, done: true, text: "Прохождение медосмотра"},
      {id: 5, done: true, text: "Перевод паспорта с нотариальным заверением"},
      {id: 6, done: true, text: "Оформление банковской карты"},
      {id: 7, done: true, text: "Оформление документов о зачислении"},
      {id: 8, done: true, text: "Оформление страховки"},
      {id: 9, done: true, text: "Оформление документов на общежитие"},
      {id: 10, done: true, text: "Оформление пропуска / студенческого билета"},
      {id: 11, done: true, text: "Прохождение медосвидетельствования"},
      {id: 12, done: true, text: "Продление визы", deadline: new Date()},
      {id: 13, done: true, text: "Прохождение дактилоскопии"},
    ],
  ];

  const [todos, setTodos] = useState(storedData[1]);

  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (id === todo.id ? {...todo, done: !todo.done} : todo)));
  };

  const comment = (id: number, text: string) => {
    setTodos(todos.map((todo) => (id === todo.id ? {...todo, commentary: text} : todo)));
  };

  const goBack = () => {
    navigation.goBack();
  };

  const undone = todos.filter((todo) => !todo.done);
  const done = todos.filter((todo) => todo.done);

  return (
    <View style={{flex: 1}}>
      <Pressable style={style.header} onPress={goBack}>
        <View style={{height: 25, width: 25, justifyContent: 'center', alignItems:'center'}}>
          <Image
            source={require("../../assets/arrow_return.png")}
            style={{width: 12, height: 20}}
          />
        </View>
        <Text style={style.headerText}>Задачи приезда №33</Text>
      </Pressable>
      <View style={style.counter}>
        <Text style={{fontFamily: "Manrope", textAlign: "center", fontSize: 20}}>
          Выполнено: {done.length}/{todos.length}
        </Text>
        {/* <ProgressBar progress={done.length} max={todos.length} width={376}  /> */}
      </View>
      <ScrollView contentContainerStyle={style.container}>
        {undone.length > 0 && (
          <View>
            <Label text="Текущее" imgPath={require("../../assets/steps.png")} />
            <View style={style.list}>
              {undone.map((i) => (
                <ToDoItem
                  done={i.done}
                  text={i.text}
                  key={i.id}
                  id={i.id}
                  deadline={i.deadline}
                  toggleFunc={toggleComplete}
                  commentFunc={comment}
                />
              ))}
            </View>
          </View>
        )}

        {done.length > 0 && (
          <View>
            <Label text="Выполнено" imgPath={require("../../assets/done.png")} />
            <View style={style.list}>
              {done.map((i) => (
                <ToDoItem
                  done={i.done}
                  text={i.text}
                  key={i.id}
                  id={i.id}
                  deadline={i.deadline}
                  toggleFunc={toggleComplete}
                  commentFunc={comment}
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
          <Image source={imgPath} style={label.image}></Image>
        </View>
      </View>
    </View>
  );
};

const ToDoItem = (props: TodoItemProps & TodoFunc) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const handleOpen = () => setOpen(!isOpen);
  let color;
  if (props.done) {
    color = style.doneItem;
  } else {
    color = style.undoneItem;
  }

  const handleToggle = () => props.toggleFunc(props.id);
  const handleComment = () => {
    props.commentFunc(props.id, comment);
  };

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
        <Image source={require("../../assets/arrow_down.png")} style={{width: 15, height: 8}} />
      </View>
      {isOpen && (
        <TextInput
          placeholder="Комментарий к задаче"
          value=""
          style={item.inputContainer}
          onChange={handleComment}
        ></TextInput>
      )}
    </Pressable>
  );
};

export type TodoItemProps = {
  id: number;
  done: boolean;
  text: string;
  deadline?: Date;
  commentary?: string;
};

type TodoFunc = {
  toggleFunc: (id: number) => void;
  commentFunc: (id: number, text: string) => void;
};

const style = StyleSheet.create({
  container: {},
  counter: {
    justifyContent: "center",
    alignContent: "center",
  },
  list: {
    marginBottom: 10, // Работает вместе с margin у label
    flex: 1,
    gap: 10,
  },
  header: {
    minHeight: 35,
    height: "auto",
    marginHorizontal: 16,
    marginVertical: 25,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: "center",
  },
  headerText: {
    flex: 1,
    fontFamily: "Manrope",
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 30,
    textAlign: 'center'
  },
  // перенести
  undoneItem: {
    backgroundColor: "#EAEBFF6E",
  },
  deadlineItem: {
    backgroundColor: "#FFCECE",
  },
  doneItem: {
    backgroundColor: "#AFAFAF3D",
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
  textWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 7,
  },
  text: {
    marginHorizontal: 10,
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 14,
  },
  deadLine: {
    marginHorizontal: 10,
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

    alignItems: "center",
  },
  container: {
    height: 43,
    backgroundColor: getPageColor(),
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
    // flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "stretch",
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
    padding: 10,
  },
});

export default ArrivalTodo;

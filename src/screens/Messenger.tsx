import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import {blackColor, grayColor, mainColor} from "../defaultColors";
import {useReducer, useRef, useState} from "react";
import {ScreenProps, Screens} from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const data: MessageProps[][] = [
  [{text: "wdasd", recieved: true, date: new Date(10004)}],
  [{text: "aaaaaaaaaaaaaa", recieved: false, date: new Date(100000000)}],
  []
]; // временно

const GetMessages = (id: number): MessageProps[] => {
  return data[id];
};

interface MessageActions {
  type: "SEND" | undefined;
  payload: string;
}

const reducer = (state: MessageProps[], action: MessageActions) => {
  switch (action.type) {
    case "SEND":
      return [
        {text: action.payload, recieved: false, date: new Date()},
        ...state
      ];
    default:
      throw new Error("Wrong action with message");
  }
};

const addAttachment = () => console.log("attach");

type Props = NativeStackScreenProps<Screens, 'Messenger'>
const Messenger = ({navigation, route}: Props) => {
  const [message, setMessage] = useState<string>("");
  const [state, dispatch] = useReducer(reducer, GetMessages(route.params.id));
  console.log(route)

  const SendMessage = (message: string) => {
    console.log(message);
    if (message != "" && message != null) {
      setMessage("");
      dispatch({type: "SEND", payload: message});
    }
  };

  console.log(state);

  return (
    <KeyboardAvoidingView style={style.container}>
      <View style={header.container}>
        <Pressable
          onPress={() => navigation.navigate("Tab")}
          style={header.return}
        >
          <Image source={require("../assets/arrow_return.png")} />
        </Pressable>
        <View style={header.image}>{/* <Image source={} ></Image> */}</View>
        <View style={header.textContainer}>
          <Text style={header.nameText}>Фамилия_Имя_Отчество</Text>
          <Text>Печатает...</Text>
        </View>
      </View>
      <FlatList
        data={state}
        renderItem={(props) => (
          <Message
            text={props.item.text}
            recieved={props.item.recieved}
            date={props.item.date}
          />
        )}
        inverted
        style={style.list}
        contentContainerStyle={style.innerList}
      />
      <View style={style.inputBox}>
        <View />
        <Pressable style={style.attacmentsButton} onPress={addAttachment}>
          <Image
            source={require("../assets/Attachments.png")}
            style={{width: 20, height: 20}}
          />
        </Pressable>
        <TextInput
          onChangeText={(t) => setMessage(t)}
          placeholder="Напишите сообщение..."
          placeholderTextColor={"#515151"}
          style={style.inputField}
        />
        <Pressable onPress={() => SendMessage(message)}>
          <Image
            source={require("../assets/SendButton.png")}
            style={style.sendButton}
          />
        </Pressable>
        <View />
      </View>
    </KeyboardAvoidingView>
  );
};

const Message = (props: MessageProps) => {
  const innerStyle = props.recieved? message.recieved: message.sent;
  const align = props.recieved? message.alignStart: message.alignEnd;
  return (
    <View style={[message.wrapper, align]}>
      <View style={[message.bubble, innerStyle]}>
        <Text>{props.text}</Text>
      </View>
      <Text style={message.time}>
        {props.date.toLocaleTimeString().slice(0, 5)}
      </Text>
    </View>
  );
};

const header = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8",
    height: 100,
    width: "auto",
    padding: 10,
    flex: 0.15,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  return: {
    height: 20,
    width: 20,
  },
  image: {
    height: 55,
    width: 55,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: mainColor,
  },
  textContainer: {
    height: 47,
  },
  nameText: {
    fontFamily: "Manrope-Medium",
    fontWeight: "400",
    fontSize: 20,
    color: grayColor,
  },
});

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  list: {
    padding: 15,
    flex: 1,
    flexDirection: 'column',
  },
  innerList: {
    gap: 10,
  },
  inputBox: {
    height: 65,
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  inputField: {
    flex: 1,
    borderColor: "#B2B2B2",
    height: 45,
    borderWidth: 2,
    borderRadius: 20,
    marginVertical: "auto",
    paddingHorizontal: 10,
  },
  sendButton: {
    height: 24,
    width: 24,
  },
  attacmentsButton: {
    height: 20,
    width: 20,
  },
});

const message = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  bubble: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    maxWidth: 300
  },
  sent: {
    borderBottomRightRadius: 5,
    backgroundColor: "#D9D9D9",
    alignContent: 'flex-end'
  },
  recieved: {
    borderBottomLeftRadius: 5,
    backgroundColor: mainColor,
  },
  time: {
    fontFamily: "Manrope-Medium",
    fontWeight: "400",
    color: '#999999'
  },
  alignStart: {
    alignItems: 'flex-start'
  },
  alignEnd: {
    alignItems: 'flex-end'
  }
});

interface MessageProps {
  text: string;
  recieved: boolean;
  date: Date;
}

export default Messenger;

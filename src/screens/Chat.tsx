import {FlatList, View, Text, StyleSheet, Pressable} from "react-native";
import {grayColor, mainColor} from "../defaultColors";
import { Screens, ScreenProps } from "../../App";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<Screens, "Tab">;
const ChatScreen = ({navigation}: Props) => {
  const data: ChatItemProps[] = [
    {name: "Фамилия_Имя_Отчество", token: "0", navigation},
    {name: "Фамилия_Имя_Отчество", token: "1", navigation},
    {name: "Фамилия_Имя_Отчество", token: "2", navigation},
  ];

  const getData = () => data;
  return (
  <View style={style.container} >
    <FlatList
      data={getData()}
      renderItem={(i) => <ChatItem name={i.item.name} token={i.item.token} navigation={i.item.navigation} />}
      ItemSeparatorComponent={() => <ChatSeparator />}
      />  
  </View>
  );
};

const ChatItem = (props: ChatItemProps) => {
  const openChat = (token: string) => {props.navigation.navigate('Messenger', {id: parseInt(token)})};
  return (
    <Pressable style={style.chatItem} onPress={() => openChat(props.token)}>
      <View style={style.main}>
        <View style={style.image} />
        <View >
          <Text style={style.name}>{props.name}</Text>
          <Text>Сообщение</Text>
        </View>
      </View>
      <View >
        <Text>{new Date().toLocaleTimeString().slice(0,4)}</Text>
        <Text>А как?</Text>
      </View>
    </Pressable>
  );
};

const ChatSeparator = () => {
  return (
      <View style={style.separator} />
  );
};

const style = StyleSheet.create({
  container: {
    paddingTop: 19,
    padding: 15,
  },
  chatItem: {
    width: 'auto',
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  image: {
    marginHorizontal: 10,
    marginVertical: 12,
    height: 55,
    width: 55,
    borderWidth: 3,
    borderColor: mainColor,
    borderRadius: 10,
  },
  name: {
    color: grayColor,
    fontFamily: 'Manrope-Medium',
    fontWeight: '400',
  },
  separator: {
    marginVertical: 10,
    marginHorizontal: 17.5,
    height: 1,
    backgroundColor: "#DEDEDE",
  },
});

interface ChatItemProps {
  name: string;
  token: string;
  navigation: any; // ANY
}

export default ChatScreen;

import {FlatList, View, Text, StyleSheet, Pressable, Image} from "react-native";
import {buddyColor, mainColor} from "../../defaultColors";
import {BottomTabNavigationProp, BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {TabScreens} from "../../../App";

type Props = BottomTabScreenProps<TabScreens, "AllArrivals">;
const AllArrivals = ({navigation, route}: Props) => {
  const data: ArrivalItemProps[] = [{id: 1, error: true}, {id: 2, error: false}, {id: 33, error: false}];
  return (
    <FlatList
      contentContainerStyle={style.list}
      data={data}
      renderItem={(a) => <ArrivalItem id={a.item.id} navigation={navigation} error={a.item.error} />}
    />
  );
};

const ArrivalItem = (props: ArrivalItemProps & {navigation: any}) => {
  const handleTasks = () => {
    props.navigation.navigate("ArrivalTodo", {id: props.id});
  };

  const err = Math.random() < 0.5;
  return (
    <View style={style.item}>
      <Text style={style.header}> Приезд №{props.id} </Text>
      {/* Progress bar */}
      <View style={style.info}>
        <Text>Количество студентов: 3</Text>
        <Text>Дата и время: 16.01.2023, 12:00</Text>
        <Text>Место прибытия: Аэропорт Кольцово</Text>
      </View>
      <View style={style.buttonsWrapper}>
        <Pressable style={[style.button, style.tasks]} onPress={handleTasks}>
          <Text style={style.buttonText}>Задачи</Text>
          <Image source={require("../../assets/tasks.png")} style={style.buttonImg} />
        </Pressable>
        <Pressable style={[style.button, style.students]}>
          <Text style={style.buttonText}>Студенты</Text>
          <Image source={require("../../assets/pen.png")} style={style.buttonImg} />
        </Pressable>
      </View>
      <View style={style.warnWrapper}>
        <Text style={style.warning}>
          Недостаточно информации о студентах Проверьте обязательные к заполнению поля
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  list: {
    // flex: 1,
    gap: 20,
  },
  item: {
    borderWidth: 5,
    borderRadius: 30,
    borderColor: buddyColor,
    padding: 24,
    flex: 1,
    gap: 16,
    alignItems: "stretch",
  },
  header: {
    fontFamily: "Manrope",
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 28,
  },
  info: {},
  text: {},
  buttonsWrapper: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-evenly",
  },
  button: {
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  tasks: {
    flex: 0.4,
    backgroundColor: buddyColor,
  },
  students: {
    flex: 0.5,
    backgroundColor: mainColor,
  },
  buttonText: {
    fontFamily: "Manrope",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
    alignSelf: "center",
    textAlign: "center",
  },
  buttonImg: {
    height: 16,
    width: 16,
  },
  warnWrapper: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
  },
  warning: {
    width: 259,
    fontFamily: "Manrope",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    color: "#FFBD00",
    textAlign: "center",
  },
});

type ArrivalItemProps = {
  id: number;
  error: boolean;
};

export default AllArrivals;

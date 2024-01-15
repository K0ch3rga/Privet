import {FlatList, View, Text, StyleSheet, Pressable, Image} from "react-native";
import {buddyColor, mainColor} from "../../defaultColors";
import { IArrival } from "../../classes/IArrival";
import { ScreenProps } from "../../interfaces/ScreenProps";
import { getPageColor } from "../../storage/AccountStore";
import { useEffect, useState } from "react";
import { fetchArrivalsList } from "../../requests/GetArrivalsList";
import Popup from "../../components/Popup";
import { useArrivalListStore } from "../../storage/ArrivalListStore";

const AllTodos: React.FC<ScreenProps> = ({navigation}) => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    fetchArrivalsList(true, setLoading, setError, setErrorMessage)
  }, [])
  const data: IArrival[] = useArrivalListStore(state => state.arrivalList)

  if (isLoading) {
    return(
      <Popup>
        <Text>Loading</Text>
      </Popup>
    )
  }

  if (error) {
    return(
      <Popup close={setError}>
        <Text>{errorMessage}</Text>
      </Popup>
    )
  }

  if (data.length > 0)
    return (
      <FlatList
        contentContainerStyle={style.list}
        data={data}
        renderItem={(a) => (
          <ArrivalItem id={a.item.id} navigation={navigation} students={a.item.students} />
        )}
      />
    );
  else return <ArrivalsDeny navigation={navigation}/>;
};

const ArrivalItem = (props: IArrival & {navigation: any}) => {
  console.log(props)
  const handleTasks = () => {
    props.navigation.navigate("ArrivalTodo", {id: props.id});
  };
  const handleStudents = () => {
    props.navigation.navigate("ArrivalStudents", {id: props.id})
  };

  return (
    <View style={style.item}>
      <Text style={style.header}> Приезд №{props.id} </Text>
      {/* Progress bar */}
      <View style={style.info}>
        <Text>Количество студентов: {props.students?.length}</Text>
        <Text>Дата и время: 16.01.2023, 12:00</Text>
        <Text>Место прибытия: Аэропорт Кольцово</Text>
      </View>
      <View style={style.buttonsWrapper}>
        <Pressable style={[style.button, style.tasks]} onPress={handleTasks}>
          <Text style={style.buttonText}>Задачи</Text>
          <Image source={require("../../assets/tasks.png")} style={style.buttonImg} />
        </Pressable>
        <Pressable style={[style.button, style.students]} onPress={handleStudents}>
          <Text style={style.buttonText}>Студенты</Text>
          <Image source={require("../../assets/pen.png")} style={style.buttonImg} />
        </Pressable>
      </View>
      {(props.students == null || props.students.length == 0) && (
        <View style={style.warnWrapper}>
          <Text style={style.warning}>
            Недостаточно информации о студентах Проверьте обязательные к заполнению поля
          </Text>
        </View>
      )}
    </View>
  );
};

const ArrivalsDeny = ({navigation}: {navigation: any}) => {
  const move = () => navigation.navigate('Arrivals');
  return (
    <View style={deny.container}>
      <Text style={deny.text}>
        Вы еще не записались ни на один приезд. Перейдите на страницу «Приезды» для записи.
      </Text>
      <Image source={require('../../assets/plane.png')} />
      <Pressable onPress={move} style={deny.button}>
        <Text>Перейти к приездам</Text>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  list: {
    // flex: 1,
    gap: 20,
    padding: 30
  },
  item: {
    borderWidth: 5,
    borderRadius: 30,
    borderColor: getPageColor(),
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
    backgroundColor: getPageColor(),
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

const deny = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    padding: 30,
    gap: 20,
  },
  button: {
    backgroundColor: getPageColor(),
    borderRadius: 30,
    padding: 10,
    height: 47,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Manrope",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 27,
    textAlign: "center",
  },
  text: {
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
    textAlign: "center",
  },
});

type ArrivalItemProps = {
  id: number;
  error: boolean;
};

export default AllTodos;

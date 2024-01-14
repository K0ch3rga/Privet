import {View, Text, StyleSheet, Image, ScrollView, Pressable} from "react-native";
import MainButton from "../../components/Buttons/MainButton";
import {blackColor, grayColor, mainColor, secondBlackColor, whiteColor} from "../../defaultColors";
import {ScreenProps} from "../../interfaces/ScreenProps";
import {useEffect, useState} from "react";
import {getArrivalUserInfo} from "../../requests/GetProfileForArrival";
import sendArrivalBooking from "../../requests/RegisterArrival";
import {IArrival} from "../../classes/IArrival";

const NoArrivalsScreen: React.FC<ScreenProps> = ({navigation}) => {
  const arrival: IArrival = {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");
  const [todos, setTodos] = useState<InactiveToDoItemProps[]>([
    {id: 1, text: "Встреча в аэропорту"},
    {id: 2, text: "Оплата и заселение в хостел"},
    {id: 3, text: "Оформление сим-карты"},
    {id: 4, text: "Прохождение медосмотра"},
    {id: 5, text: "Перевод паспорта с нотариальным заверением"},
    {id: 6, text: "Оформление банковской карты"},
    {id: 7, text: "Оформление документов о зачислении"},
    {id: 8, text: "Оформление страховки"},
    {id: 9, text: "Оформление документов на общежитие"},
    {id: 10, text: "Оформление пропуска / студенческого билета"},
    {id: 11, text: "Прохождение медосвидетельствования"},
    {id: 12, text: "Продление визы"},
    {id: 13, text: "Прохождение дактилоскопии"},
  ]);

  // useEffect(() => {
  //   sendArrivalBooking(
  //     arrival,
  //     (l) => setLoading(l),
  //     (e) => setError(e),
  //     (r) => setResponse(r)
  //   ).catch((e)=>console.log(e));
  // });

  return (
    <View style={style.wrapper}>
      <View style={{paddingHorizontal: 24, paddingTop: 25}}>
        <MainButton
          title="Создать приезд"
          color={mainColor}
          onPress={() => {
            navigation.navigate("CreateArrival");
          }}
        />
      </View>
      <View style={style.counter}>
        <Text style={style.counterText}>Выполнено: 0/15</Text>
        <Image source={require("../../assets/inactiveNotifications.png")} />
        {/* <ProgressBar progress={done.length} max={todos.length} width={376}  /> */}
      </View>
      <ScrollView contentContainerStyle={style.container}>
        <View>
          <Label text="Текущее" imgPath={require("../../assets/inactiveSteps.png")} />
          <View style={style.list}>
            {todos.map((i) => (
              <InactiveToDoItem text={i.text} key={i.id} id={i.id} />
            ))}
          </View>
        </View>
        <View>
          <Label text="Выполнено" imgPath={require("../../assets/inactiveDone.png")} />
          <Text
            style={{
              marginBottom: 20,
              fontFamily: "Manrope",
              fontSize: 14,
              fontWeight: "400",
              lineHeight: 19,
              textAlign: "center",
            }}
          >
            Пока ни одна задача не выполнена.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const InactiveToDoItem = (props: InactiveToDoItemProps) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => setOpen(!isOpen);
  let color = {backgroundColor: "#9E9E9E3D"};

  return (
    <Pressable onPress={handleOpen} style={[item.container, color]}>
      <View style={item.main}>
        <View style={[style.mark, style.undoneMark]} />
        <View style={item.textWrapper}>
          <Text style={item.text}>{props.text}</Text>
          {/* {props.deadline && (
            <Text style={style.deadLine}>{"До " + props.deadline.toLocaleDateString()}</Text>
          )} */}
        </View>
        <Image source={require("../../assets/arrow_down.png")} />
      </View>
      {/* {isOpen && (
        <TextInput placeholder="Комментарий к задаче" style={item.inputContainer}></TextInput>
      )} */}
    </Pressable>
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

export type InactiveToDoItemProps = {
  id: number;
  text: string;
};

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {},
  counter: {
    padding: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  counterText: {
    fontFamily: "Manrope",
    fontSize: 23,
    fontWeight: "400",
    lineHeight: 31,
    textAlign: "left",
    color: "#00000080",
  },
  list: {
    flex: 1,
    gap: 10,
  },
  text: {
    color: secondBlackColor,
    textAlign: "center",
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 16,
  },
  // перенести

  mark: {
    height: 20,
    width: 20,
    borderColor: "#00000080",
    borderWidth: 3,
    borderRadius: 100,
  },
  undoneMark: {
    backfaceVisibility: "hidden",
  },
  doneMark: {
    backgroundColor: blackColor,
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
    alignItems: "center",
  },
  container: {
    height: 43,
    backgroundColor: "#C6C6C680",
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
    color: "#00000080",
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
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  main: {
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
  undoneItem: {
    backgroundColor: "#9E9E9E3D",
  },
  textWrapper: {
    flex: 1,
    padding: 7,
    justifyContent: 'flex-start'
  },
  text: {
    textAlign: 'left',
    marginHorizontal: 10,
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 14,
  },
});

export default NoArrivalsScreen;

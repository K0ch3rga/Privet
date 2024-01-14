import {Pressable, View, Image, Text, StyleSheet, ScrollView} from "react-native";
import {ScreenProps} from "../../interfaces/ScreenProps";
import {useState} from "react";
import {grayColor, mainColor} from "../../defaultColors";

const ArrivalStudents: React.FC<ScreenProps> = ({navigation}) => {
  const students: StudentProps[] = [
    {name: "Сон Ханбин", sex: "Мужчина"},
    {name: "Чжань Хао", sex: "Мужчина"},
    {name: "Пак Гонук", sex: "Мужчинаs"},
  ];
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Image source={require("../../assets/arrow_return.png")} style={style.arrow} />
        <Text style={style.headerText}>Заполнение информации о студентах</Text>
      </View>
      <ScrollView contentContainerStyle={style.list}>
        {students.map((s) => (
          <Student name={s.name} sex={s.sex} />
        ))}
      </ScrollView>
    </View>
  );
};

const Student = (props: StudentProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <Pressable onPress={handleOpen} style={style.card}>
      <View style={style.info}>
        <Image source={require("../../assets/default-profile-pic.png")} style={style.image} />
        <View style={style.textWrapper}>
          <Text style={style.name}>{props.name}</Text>
          <Text style={style.sex}>{props.sex}</Text>
        </View>
        <View style={style.counter}>
          <Text style={style.counterText}>5/5</Text>
        </View>
        <Image source={require("../../assets/pen.png")} style={{width: 18, height: 18}} />
      </View>
      {open && <View style={style.line} />}
      {open && (
        <View style={style.stages}>
          <View style={style.stage}>
            <View style={style.bubble}>
              <Text style={style.number}>1</Text>
            </View>
            <Text style={style.stageText}>Институт</Text>
          </View>
          <View style={style.stage}>
            <View style={style.bubble}>
              <Text style={style.number}>2</Text>
            </View>
            <Text style={style.stageText}>Направление обучения</Text>
          </View>
          <View style={style.stage}>
            <View style={style.bubble}>
              <Text style={style.number}>3</Text>
            </View>
            <Text style={style.stageText}>Дата последнего прибытия</Text>
          </View>
          <View style={style.stage}>
            <View style={style.bubble}>
              <Text style={style.number}>4</Text>
            </View>
            <Text style={style.stageText}>Дата окончания последней визы</Text>
          </View>
          <View style={style.stage}>
            <View style={style.bubble}>
              <Text style={style.number}>5</Text>
            </View>
            <Text style={style.stageText}>Место проживания</Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};

type StudentProps = {
  name: string;
  sex: string;
};

const style = StyleSheet.create({
  container: {
    padding: 24,
    gap: 36,
  },
  header: {
    paddingHorizontal: 10,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  headerText: {
    color: "#242424",
    textAlign: "center",
    fontFamily: "Manrope",
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 29.76,
  },
  arrow: {
    width: 12,
    height: 20,
  },
  list: {
    gap: 16,
  },
  card: {
    borderWidth: 3,
    borderColor: grayColor,
    borderRadius: 10,
    padding: 16,
    paddingLeft: 24,
    gap: 10,
  },
  info: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  image: {
    borderWidth: 2,
    borderColor: mainColor,
    borderRadius: 10,
    height: 48,
    width: 48,
  },
  textWrapper: {
    justifyContent: "flex-start",
    flex: 1,
  },
  name: {
    color: "#252525",
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 19.84,
  },
  sex: {
    color: "#777",
    fontFamily: "Manrope",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 14.88,
  },
  counter: {
    flex: 1,
  },
  counterText: {
    color: "#777",
    textAlign: "center",
    fontFamily: "LilitaOne",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19.84,
  },
  line: {
    height: 1,
    backgroundColor: "#DEDEDE",
  },
  stages: {
    paddingHorizontal: 8,
    gap: 8,
  },
  stage: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  bubble: {
    width: 20,
    height: 20,
    backgroundColor: mainColor,
    borderRadius: 10,
  },
  number: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "LilitaOne",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
  },
  stageText: {
    color: "#000",
    fontFamily: "Manrope",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 17.36,
  },
});

export default ArrivalStudents;

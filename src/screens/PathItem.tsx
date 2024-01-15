import {ScrollView, StyleSheet, View, Text} from "react-native";

const PathItem = () => {
  return (
    <View style={style.container}>
      <ScrollView style={style.list}>
        <View style={style.p}>
          <Text style={style.h2}>Регистрация в России</Text>
          <View> <View style={style.dot}/><Text style={style.h2}>Важно:</Text><Text> каждый иностранный студент должен получить временную регистрацию в течение 7 дней после прибытия в Россию. Хостел – идеальное место для этого, так как все хостелы обязаны по закону оформлять иностранным проживающим временную регистрацию.</Text>
          <Text style={style.h2}>Процесс: персонал хостела поможет вам с заполнением всех необходимых документов для регистрации. Документ о временной регистрации с адресом хостела, датами и остальными данными вам выдадут на руки в течение 1 дня</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  list: {
    gap: 10,
  },
  p: {},
  h2: {
    fontFamily: "Nunito",
    fontWeight: "400",
    fontSize: 30,
  },
  dot: {
    height: 2,
    width: 2,
    borderRadius: 2,
    color: "#000",
  },
});

export default PathItem;

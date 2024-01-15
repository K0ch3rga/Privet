import {ScrollView, StyleSheet, View, Text, Image, Pressable} from "react-native";
import {ScreenProps} from "../interfaces/ScreenProps";
import {HeaderProfileSection} from "../components/Profile/ProfileSection";

const PathItem: React.FC<ScreenProps> = ({navigation}) => {
  return (
    <View style={style.container}>
      <Pressable
        style={style.header}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image source={require("../assets/arrow_return.png")} style={{width: 12, height: 20}} />
        <Text style={style.headerText}>Маршрут: Хостел</Text>
      </Pressable>

      <ScrollView contentContainerStyle={style.list}>
        <View style={style.p}>
          <Text style={style.h2}>Регистрация в России</Text>
          <View>
            <Text>
              Важно: каждый иностранный студент должен получить временную регистрацию в течение 7
              дней после прибытия в Россию. Хостел – идеальное место для этого, так как все хостелы
              обязаны по закону оформлять иностранным проживающим временную регистрацию.
            </Text>
          </View>
          <View style={style.item}>
            <View >
              <Text>
                Процесс: персонал хостела поможет вам с заполнением всех необходимых документов для
                регистрации. Документ о временной регистрации с адресом хостела, датами и остальными
                данными вам выдадут на руки в течение 1 дня
              </Text>
            </View>
          </View>
        </View>
        <View style={style.p}>
          <Text style={style.h2}>Первые шаги </Text>
          <View>
            <View style={style.dot} />
            <Text style={style.bold}> </Text>
            <Text>
              Приезд: большинство иностранных студентов выбирают хостел для первых ночей в России.
              Это удобно для получения регистрации и ожидания места в общежитии.
            </Text>
          </View>
          <View style={style.item}>
            <View style={style.dot} />
            <View style={{}}>
              <Text>
                Багаж: в большинстве хостелов есть возможность бесплатно хранить багаж в сейфе или
                подвальном помещении.
              </Text>
            </View>
          </View>
        </View>
        <View style={style.p}>
          <Text style={style.h2}>Услуги и удобства</Text>
          <View>
            <View style={style.dot} />
            <Text>
              Интернет: все хостелы предоставляют бесплатный Wi-Fi. Также во всех хостелах хорошо
              работает мобильный интернет.
            </Text>
          </View>
          <View style={style.item}>
            <View style={style.dot} />
            <Text>
              Кухня: пользуйтесь общей кухней для приготовления пищи – это экономит деньги и дает
              возможность познакомиться с другими людьми.
            </Text>
          </View>
          <View style={style.item}>
            <View style={style.dot} />
            <Text>
              Стирка: во всех хостелах бесплатно предоставляются в пользование стиральные машины и
              порошок для стирки, а также фен и сушилка для белья.
            </Text>
          </View>
        </View>

        <View style={style.p}>
          <Text style={style.h2}>Безопасность и комфорт</Text>
          <View>
            <View style={style.dot} />
            <Text>
              Личные вещи: храните личные вещи в шкафчиках в комнатах. В некоторых хостелах есть
              сейфы больших размеров для ваших чемоданов. Также вы можете оставить свой багаж на
              складе хостелов.
            </Text>
          </View>
          <View style={style.item}>
            <View style={style.dot} />
            <Text>
              Чистота: хостелы регулярно убираются в комнате и помещениях общего пользования, но
              помните о личной ответственности за чистоту в общих зонах.
            </Text>
          </View>
        </View>
        <View style={style.p}>
          <Text style={style.h2}>Общение и культурный обмен</Text>
          <View>
            <View style={style.dot} />
            <Text>
              Международная среда: хостелы – отличное место для знакомства с другими культурами и
              практики языков. Здесь вы сможете встретить самых разных людей, которые, так же, как и
              вы, приехали из других городов или даже стран.
            </Text>
          </View>
          <View style={style.item}>
            <View style={style.dot} />
            <Text>
              Общение с администрацией: большинство администраторов хостелов, к сожалению, говорят
              только на русском языке. Однако, они всегда любезны со своими гостями, поэтому вы
              сможете найти способ объяснить им свою проблему или вопрос через онлайн-переводчик.
            </Text>
          </View>
        </View>
        <Text>
          Напоминание: не забудьте своевременно платить за проживание в хостеле. Если ваше
          проживание уже подходит к концу, вы можете продлить его самостоятельно, при наличии
          свободных мест в хостеле.
        </Text>
        <Text>Удачи и приятного пребывания! 👋</Text>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  header: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headerText: {
    color: "#252525",
    textAlign: "center",
    fontFamily: "LilitaOne",
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 38.4,
  },
  list: {
    gap: 20,
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
  bold: {
    fontWeight: "800",
  },
  item: {
    gap: 10,
  },
});

export default PathItem;

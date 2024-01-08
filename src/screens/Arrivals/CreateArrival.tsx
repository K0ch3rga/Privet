import { View, Text, StyleSheet, ViewBase, Image, ScrollView, Pressable } from "react-native";
import MainButton from "../../components/Buttons/MainButton";
import { mainColor, secondBlackColor, whiteColor } from "../../defaultColors";
import { ScreenProps } from "../../interfaces/ScreenProps";
import ScreenHeader from "../../components/ScreenHeader";
import ContactEdit from "../../components/Profile/ContactsEdit";
import { HeaderProfileSection, InfoProfileSection, ItemTitleProfile, SectionProfile } from "../../components/Profile/ProfileSection";
import InputProfile from "../../components/Profile/InputProfile";
import { counties, genders } from "../../selectData";
import Select from "../../components/Select";
import { useState } from "react";
import Popup from "../../components/Popup";
import AddStudentToArrival from "./AddStudentToArrival";

const CreateArrival: React.FC<ScreenProps> = ({ navigation }) => {
  // const [arrivalData, setArrivalData] = useState({});
  const [isPopup, setPopup] = useState(false);

  return(
    <>
      <ScrollView>   
        <View style={styles.wrapper}>
            <View style={styles.header}>
              <Image source={require("../../assets/arrow_return.png")} style={{ width: 12, height: 20 }} />
              <View style={{ flex: 1 }}>
                <ScreenHeader>Создание приезда</ScreenHeader>
              </View>
            </View>
            <View style={styles.main}>
              <View>
                <SectionProfile>
                  <HeaderProfileSection>Данные о приезде</HeaderProfileSection>
                  <InfoProfileSection>
                    <InputProfile 
                      title="Полное имя"
                    />
                    <View style={styles.gap}>
                      <ItemTitleProfile>Гражданство</ItemTitleProfile>
                      <Select
                        profile={true}
                        data={counties}
                      />
                    </View>
                    <View style={styles.gap}>
                      <ItemTitleProfile>Пол</ItemTitleProfile>
                      <Select
                        profile={true}
                        data={genders}
                      />
                    </View>
                    <InputProfile 
                      title="Дата приезда"
                    />
                    <InputProfile 
                      title="Время приезда"
                    />
                    <InputProfile 
                      title="Номер рейса"
                    />
                    <InputProfile 
                      title="Место прибытия"
                    />
                    <InputProfile 
                      title="Комментарий"
                      multiline={true}
                      numberOfLines={2}
                      height={100}
                    />
                  </InfoProfileSection>
                </SectionProfile>
              </View>
              <View>
                <SectionProfile>
                  <HeaderProfileSection>Контакты</HeaderProfileSection>
                  <InfoProfileSection>
                    <InputProfile 
                      title="Полное имя"
                    />
                    <View style={styles.gap}>
                      <ItemTitleProfile>Гражданство</ItemTitleProfile>
                      <Select
                        profile={true}
                        data={counties}
                      />
                    </View>
                    <View style={styles.gap}>
                      <ItemTitleProfile>Пол</ItemTitleProfile>
                      <Select
                        profile={true}
                        data={genders}
                      />
                    </View>
                    <InputProfile 
                      title="Дата приезда"
                    />
                    <InputProfile 
                      title="Время приезда"
                    />
                    <InputProfile 
                      title="Номер рейса"
                    />
                    <InputProfile 
                      title="Место прибытия"
                    />
                  </InfoProfileSection>
                </SectionProfile>
              </View>
              <View style={{ gap: 30 }}>
                <View style={{ gap: 10 }}>
                  <Text style={styles.h2}>Загруженные файлы:</Text>
                  <View style={styles.file}>
                    <Text style={styles.p}>213317356.pdf</Text>
                    <Image source={require("../../assets/delete.png")} style={{ width: 13.8, height: 17 }}/>
                  </View>
                  <View style={styles.file}>
                    <Text style={styles.p}>21331735566.pdf</Text>
                    <Image source={require("../../assets/delete.png")} style={{ width: 13.8, height: 17 }}/>
                  </View>
                </View>
                <View style={{ gap: 10 }}>
                  <Text style={styles.h2}>Добавленные участники:</Text>
                  <View style={styles.file}>
                      <Text style={styles.p}>Zhang Hao</Text>
                      <Image source={require("../../assets/delete.png")} style={{ width: 13.8, height: 17 }}/>
                    </View>
                    <View style={styles.file}>
                      <Text style={styles.p}>Sung Hanbin</Text>
                      <Image source={require("../../assets/delete.png")} style={{ width: 13.8, height: 17 }}/>
                    </View>
                </View>
                <View style={styles.buttonsWrapper}>
                  <Pressable style={styles.button}>Загрузить билеты</Pressable>
                  <Pressable 
                    style={styles.button}
                    onPress={() => {setPopup(true)}}
                  >
                    Добавить участника
                    </Pressable>
                </View>
              </View>
            </View>
            <MainButton title="Отправить приезд" color={mainColor}/>
        </View>
      </ScrollView>
      {isPopup &&
        <Popup>
          <AddStudentToArrival 
            handleClose={() => {setPopup(false)}}
            />
        </Popup>
      }
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 25,
    gap: 33,
    backgroundColor: whiteColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "100%"
  },
  gap: {
    gap: 5
  },
  main: {
    gap: 20, 
    width: "100%", 
    paddingHorizontal: 18
  },
  h2: {
    color: secondBlackColor,
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 14
  },
  p: {
    color: secondBlackColor,
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 16
  },
  file: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  buttonsWrapper: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginBottom: 20
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 16,
    backgroundColor: mainColor,
    borderRadius: 20,
    flex: 1,
    
    textAlign: "center",
    color: secondBlackColor,
    fontFamily: "Manrope",
    fontWeight: 500,
    fontSize: 15
  }
})

export default CreateArrival;
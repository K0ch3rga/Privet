import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import MainButton from "../../components/Buttons/MainButton";
import { mainColor, secondBlackColor, whiteColor } from "../../defaultColors";
import { ScreenProps } from "../../interfaces/ScreenProps";
import ScreenHeader from "../../components/ScreenHeader";
import { HeaderProfileSection, InfoProfileSection, ItemTitleProfile, SectionProfile } from "../../components/Profile/ProfileSection";
import InputProfile from "../../components/Profile/InputProfile";
import { counties, genders } from "../../selectData";
import Select from "../../components/Select";
import Popup from "../../components/Popup";
import ContactEdit from "../../components/Profile/ContactsEdit";
import { IContacts } from "../../classes/IContacts";
import { sendCreateArrivalRequest } from "../../requests/CreateArrivalRequest";
import { useAccountStore } from "../../storage/AccountStore";
import { useArrivalStore } from "../../storage/ArrivalStore";
import { getArrivalUserInfo } from "../../requests/GetProfileForArrival";

const CreateArrival: React.FC<ScreenProps> = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPopup, setPopup] = useState(false);
  const user_id = useAccountStore(state => state.user_id)
  const arrivalData = useArrivalStore(state => state.arrivalData)
  const setArrivalData = useArrivalStore(state => state.setArrivalData)
  const isSuccess = useArrivalStore(state => state.isSuccess)

  console.log(arrivalData);

  const handleSend = () => {
    if (arrivalData) {
      sendCreateArrivalRequest(user_id, arrivalData, setLoading, setError, setErrorMessage);
    }
    else{
      setErrorMessage("Arrival Data is empty")
      setError(true)
    }
  }

  useEffect(() => {
    getArrivalUserInfo()
  }, [])

  const getContacts = () => {
    if (!arrivalData.user?.user_info?.contacts) {
      return {} as IContacts
    }
    return arrivalData.user.user_info.contacts
  }

  const setContacts = (newContacts: any) => {
    setArrivalData({
      ...arrivalData,
      user: {
        ...arrivalData.user,
        user_info: {
          ...arrivalData.user?.user_info,
          contacts: newContacts
        }
      }
    })
  }

  return(
    <>
      <ScrollView>   
        <View style={styles.wrapper}>
            <View style={styles.header}>
              <Pressable onPress={() => navigation.goBack()}>
                <Image source={require("../../assets/arrow_return.png")} style={{ width: 12, height: 20 }} />
              </Pressable>
              
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
                      value={arrivalData.user?.user_info?.full_name}
                      setProperty={(text: string) => {
                        setArrivalData(
                          {
                            ...arrivalData,
                            user: {
                              ...arrivalData.user,
                              user_info: {
                                ...arrivalData.user?.user_info,
                                full_name: text
                              }
                            }
                          }
                        )
                      }}
                    />
                    <View style={styles.gap}>
                      <ItemTitleProfile>Гражданство</ItemTitleProfile>
                      <Select
                        profile={true}
                        data={counties}
                        initialValue={arrivalData.citizenship}
                        setChosenValue={(value: string) => {
                          setArrivalData(
                            {
                              ...arrivalData,
                              citizenship: value
                            }
                          )
                        }}
                      />
                    </View>
                    <View style={styles.gap}>
                      <ItemTitleProfile>Пол</ItemTitleProfile>
                      <Select
                        profile={true}
                        data={genders}
                        initialValue={arrivalData.sex}
                        setChosenValue={(value: string) => {
                          setArrivalData(
                            {
                              ...arrivalData,
                              sex: value
                            }
                          )
                        }}
                      />
                    </View>
                    <InputProfile 
                      title="Дата приезда"
                      value={arrivalData.arrival_booking?.arrival_date}
                      setProperty={(value: string) => {
                        setArrivalData({
                          ...arrivalData,
                          arrival_booking: {
                            ...arrivalData.arrival_booking,
                            arrival_date: value
                          }
                        })
                      }}
                    />
                    <InputProfile 
                      title="Время приезда"
                      value={arrivalData.arrival_booking?.arrival_time}
                      setProperty={(value: string) => {
                        setArrivalData({
                          ...arrivalData,
                          arrival_booking: {
                            ...arrivalData.arrival_booking,
                            arrival_time: value
                          }
                        })
                      }}
                    />
                    <InputProfile 
                      title="Номер рейса"
                      value={arrivalData.arrival_booking?.flight_number}
                      setProperty={(value: string) => {
                        setArrivalData({
                          ...arrivalData,
                          arrival_booking: {
                            ...arrivalData.arrival_booking,
                            flight_number: value
                          }
                        })
                      }}
                    />
                    <InputProfile 
                      title="Место прибытия"
                      value={arrivalData.arrival_booking?.arrival_point}
                      setProperty={(value: string) => {
                        setArrivalData({
                          ...arrivalData,
                          arrival_booking: {
                            ...arrivalData.arrival_booking,
                            arrival_point: value
                          }
                        })
                      }}
                    />
                    <InputProfile 
                      title="Комментарий"
                      multiline={true}
                      numberOfLines={2}
                      height={100}
                      value={arrivalData.arrival_booking?.comment}
                      setProperty={(value: string) => {
                        setArrivalData({
                          ...arrivalData,
                          arrival_booking: {
                            ...arrivalData.arrival_booking,
                            comment: value
                          }
                        })
                      }}
                    />
                  </InfoProfileSection>
                </SectionProfile>
              </View>
              <View>
                <ContactEdit getContacts={getContacts} setContacts={setContacts} />
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
                {/* <View style={{ gap: 10 }}>
                  <Text style={styles.h2}>Добавленные участники:</Text>
                  <View style={styles.file}>
                      <Text style={styles.p}>Zhang Hao</Text>
                      <Image source={require("../../assets/delete.png")} style={{ width: 13.8, height: 17 }}/>
                    </View>
                    <View style={styles.file}>
                      <Text style={styles.p}>Sung Hanbin</Text>
                      <Image source={require("../../assets/delete.png")} style={{ width: 13.8, height: 17 }}/>
                    </View>
                </View> */}
                <View style={styles.buttonsWrapper}>
                  <Pressable style={styles.button}>
                    <Text style={styles.buttonTitle}>Загрузить билеты</Text>
                  </Pressable>
                  {/* <Pressable 
                    style={styles.button}
                    onPress={() => {setPopup(true)}}
                  >
                    <Text style={styles.buttonTitle}>Добавить участника</Text>
                  </Pressable> */}
                </View>
              </View>
            </View>
            <MainButton 
              title="Отправить приезд" 
              color={mainColor}
              onPress={handleSend}
            />
        </View>
      </ScrollView>
      {isSuccess &&
        <Popup>
          <View>
            <Text>Приезд успешно создан</Text>
            <MainButton 
              title="Добавить участников приезда"
              color={mainColor}
              onPress={() => {navigation.navigate("AddStudents")}}
            />
            <MainButton 
              title="Продолжить"
              color={mainColor}
              onPress={() => {navigation.navigate("ArrivalFinal")}}
            />
          </View>
        </Popup>
      }
      {isLoading &&
        <Popup>
          <Text>Loading</Text>
        </Popup>
      }
      {isError &&
        <Popup close={() => {setError(false)}}>
          <Text>{errorMessage}</Text>
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
  },
  buttonTitle: {
    textAlign: "center",
    color: secondBlackColor,
    fontFamily: "Manrope",
    fontWeight: "500",
    fontSize: 15
  }
})

export default CreateArrival;
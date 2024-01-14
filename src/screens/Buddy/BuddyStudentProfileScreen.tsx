import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import RegMainButton from "../../components/Buttons/RegMainButton";
import { buddyColor, grayColor, mainColor, whiteColor } from "../../defaultColors";
import Popup from "../../components/Popup";
import { ScreenProps } from "../../interfaces/ScreenProps";
import MainButton from "../../components/Buttons/MainButton";
import { InfoProfileSection, ItemTitleProfile, SectionProfile } from "../../components/Profile/ProfileSection";
import { lang_and_level } from "../../components/Profile/OtherLanguagesList";
import { IBuddyStudent } from "../../classes/IBuddyStudent";
import { fetchBuddyStudentProfile } from "../../requests/GetBuddyStudentProfile";
import ScreenHeader from "../../components/ScreenHeader";
import InputProfile from "../../components/Profile/InputProfile";
import { updateBuddyStudentProfile } from "../../requests/UpdateBuddyStudentProfile";

const getValue = (value: string | undefined) => {
  return value ? value : "—"
}

const getDateValue = (value: string | undefined) => {
  if (!value) {
    return "—"
  }
  const options = {year: 'numeric', month: 'numeric', day: 'numeric'} as any;
  const date = new Date(value);
  if (!date) {
    return "—"
  }
  return date.toLocaleDateString("ru-RU", options)
}

const getOtherLanguages = (langs: lang_and_level[] | undefined) => {
  if (!langs){
    return 
  }
  let result = '';
  langs.map(item => {
    result = result.concat(`${item.language} - ${item.level}`, '\n')
  })
  return result ? result : "—"
}

const HeaderProfileSection: React.FC<{ children: any }> = ({ children }) => {
  return (
    <View style={{
      backgroundColor: mainColor,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      minWidth: 125,
      paddingHorizontal: 12,
      paddingVertical: 4,
      alignSelf: "center"
    }}>
      <Text style={{
        alignSelf: "center",
        color: "#262626",
        fontFamily: "LilitaOne",
        fontSize: 25
      }}>
        {children}
      </Text>
    </View>
  )
}

const ProfileScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState<IBuddyStudent>({});
  // const user_id = useAccountStore.getState().buddyStudentId;
  const user_id = 58;

  useEffect(() => {
    fetchBuddyStudentProfile(user_id, setLoading, setUserData, setError, setErrorMessage);
  }, [])

  console.log(userData);
  
  const handleSend = () => {
    updateBuddyStudentProfile(user_id, userData, setLoading, setError, setErrorMessage)
    setIsEdit(false)
  }

  if (isLoading) {
    return (
      <Popup>
        <Text>Loading...</Text>
      </Popup>
    )
  }

  if (error) {
    return (
      <Popup>
        <Text>{errorMessage}</Text>
        <RegMainButton title="Close" color={mainColor} onPress={() => setError(false)}/>
      </Popup>
    )
  }

  if (!userData.user?.user_info?.other_languages_and_levels) {
    setUserData({
      ...userData,
      user: {
        ...userData.user,
        user_info: {
          ...userData.user?.user_info,
          other_languages_and_levels: []
        }
      }})
  }

  if (isEdit) {
    return (
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.header}>
              <View>
                <Image source={require("../../assets/default-profile-pic.png")} style={styles.profilePic} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.name}>{userData.user?.user_info?.full_name}</Text>
                <Text style={styles.otherInfo}>{userData.sex}</Text>
              </View>
          </View>
          <SectionProfile>
            <HeaderProfileSection>Информация о студенте</HeaderProfileSection>
            <InfoProfileSection>
              <InputProfile 
                title="Институт студента"
                value={userData.only_view?.institute}
                setProperty={(value: string) => {
                  setUserData(
                    {
                      ...userData,
                      only_view: {
                        ...userData.only_view,
                        institute: value
                      }
                    }
                  )
                }}
              />
              <InputProfile 
                title="Направление обучения"
                value={userData.only_view?.study_program}
                setProperty={(value: string) => {
                  setUserData(
                    {
                      ...userData,
                      only_view: {
                        ...userData.only_view,
                        study_program: value
                      }
                    }
                  )
                }}
              />
              <InputProfile 
                title="Дата окончания последней визы"
                value={userData.only_view?.last_visa_expiration}
                setProperty={(value: string) => {
                  setUserData(
                    {
                      ...userData,
                      only_view: {
                        ...userData.only_view,
                        last_visa_expiration: value
                      }
                    }
                  )
                }}
              />
              <InputProfile 
                title="Место проживания"
                value={userData.only_view?.accommodation}
                setProperty={(value: string) => {
                  setUserData(
                    {
                      ...userData,
                      only_view: {
                        ...userData.only_view,
                        accommodation: value
                      }
                    }
                  )
                }}
              />
              <InputProfile 
                title="Комменатрий"
                value={userData.only_view?.buddy_comment}
                setProperty={(value: string) => {
                  setUserData(
                    {
                      ...userData,
                      only_view: {
                        ...userData.only_view,
                        buddy_comment: value
                      }
                    }
                  )
                }}
              />
            </InfoProfileSection>
          </SectionProfile>
          <View style={{ alignItems: "center", gap: 10 }}>
            <MainButton
              title="Сохранить"
              onPress={handleSend}
              color={mainColor}
            />
            <MainButton
              title="Отменить"
              onPress={() => {
                fetchBuddyStudentProfile(user_id, setLoading, setUserData, setError, setErrorMessage);
                setIsEdit(false)
              }}
              color={"#FF6990"}
            />
          </View>
        </View>
      </ScrollView>
    )
  }

  if (userData) {
    return (
      <ScrollView>
        <View style={styles.wrapper}>
          <ScreenHeader backButton={true} navigation={navigation}>Профиль студента</ScreenHeader>
        <>
          <View style={styles.header}>
            <View>
              <Image source={require("../../assets/default-profile-pic.png")} style={styles.profilePic} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{userData.user?.user_info?.full_name}</Text>
              <Text style={styles.otherInfo}>{userData.sex}</Text>
            </View>
          </View>
            <View>
              <MainButton 
                title="Редактировать"
                color={buddyColor}
                onPress={() => {setIsEdit(true)}}
              />
            </View>
          <SectionProfile>
            <HeaderProfileSection>
              Контакты
            </HeaderProfileSection>
            <InfoProfileSection>
              <View>
                <ItemTitleProfile>Email</ItemTitleProfile>
                <Text style={styles.itemValue}>{userData.user?.email}</Text>
              </View>
              <View>
                <ItemTitleProfile>Телефон</ItemTitleProfile>
                <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.contacts?.phone)}</Text>
              </View>
              <View>
                <ItemTitleProfile>WhatsApp</ItemTitleProfile>
                <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.contacts?.whatsapp)}</Text>
              </View>
              <View>
                <ItemTitleProfile>ВКонтакте</ItemTitleProfile>
                <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.contacts?.vk)}</Text>
              </View>
              <View>
                <ItemTitleProfile>Telegram</ItemTitleProfile>
                <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.contacts?.telegram)}</Text>
              </View>
            </InfoProfileSection>
          </SectionProfile>
          <SectionProfile>
            <HeaderProfileSection>
              Личная информация
            </HeaderProfileSection>
            <InfoProfileSection>
              <View>
                <ItemTitleProfile>Родной язык</ItemTitleProfile>
                <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.native_language)}</Text>
              </View>
              <View>
                <ItemTitleProfile>Другие языки</ItemTitleProfile>
                <Text style={styles.itemValue}>{getOtherLanguages(userData.user?.user_info?.other_languages_and_levels)}</Text>
              </View>
              <View>
                <ItemTitleProfile>Дата рождения</ItemTitleProfile>
                <Text style={styles.itemValue}>{getDateValue(userData.user?.user_info?.birth_date)}</Text>
              </View>
              <View>
                <ItemTitleProfile>Место проживания</ItemTitleProfile>
                <Text style={styles.itemValue}>{getValue(userData.only_view?.accommodation)}</Text>
              </View>
            </InfoProfileSection>
          </SectionProfile>
          <SectionProfile>
            <HeaderProfileSection>
              Обучение
            </HeaderProfileSection>
            <InfoProfileSection>
                <View>
                  <ItemTitleProfile>Универститет</ItemTitleProfile>
                  <Text style={styles.itemValue}>{getValue(userData.user?.university)}</Text>
                </View>
                <View>
                  <ItemTitleProfile>Институт</ItemTitleProfile>
                  <Text style={styles.itemValue}>{getValue(userData.only_view?.institute)}</Text>
                </View>
                <View>
                  <ItemTitleProfile>Направление</ItemTitleProfile>
                  <Text style={styles.itemValue}>{getValue(userData.only_view?.study_program)}</Text>
                </View>
            </InfoProfileSection>
          </SectionProfile>
          <SectionProfile>
            <HeaderProfileSection>
              Другое
            </HeaderProfileSection>
              <InfoProfileSection>
                <View>
                  <ItemTitleProfile>Дата последнего приезда</ItemTitleProfile>
                  <Text style={styles.itemValue}>{getValue(userData.only_view?.last_visa_expiration)}</Text>
                </View>
                <View>
                  <ItemTitleProfile>Дата окончания последней визы</ItemTitleProfile>
                  <Text style={styles.itemValue}>{getValue(userData.only_view?.last_visa_expiration)}</Text>
                </View>
              </InfoProfileSection>
          </SectionProfile>

          <SectionProfile>
              <HeaderProfileSection>
                Сопровождение
              </HeaderProfileSection>
              <InfoProfileSection>
                  <View>
                    <ItemTitleProfile>Последний сопровождающий</ItemTitleProfile>
                    <Text style={styles.itemValue}>Последний сопровождающий</Text>
                  </View>
                  <View>
                    <ItemTitleProfile>Комментарий сопровождающего</ItemTitleProfile>
                    <Text style={styles.itemValue}>{userData.only_view?.buddy_comment}</Text>
                  </View>
              </InfoProfileSection>
            </SectionProfile>
        </>
        </View>
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 19,
    paddingVertical: 24,
    backgroundColor: whiteColor,
    flex: 1,
    gap: 28
  },
  header: {
    borderWidth: 4,
    borderColor: mainColor,
    borderRadius: 30,
    padding: 15,
    flexDirection: "row",
    gap: 10
  },
  profilePic: {
    width: 102,
    height: 102,
    borderColor: "#B0B0B0",
    borderWidth: 2,
    borderRadius: 20
  },
  profileInfo: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
    flex: 1,
  },
  name: {
    color: grayColor,
    fontFamily: "LilitaOne",
    fontSize: 32,
    fontWeight: "400",
  },
  otherInfo: {
    color: grayColor,
    fontFamily: "LilitaOne",
    fontSize: 16,
    fontWeight: "400",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    alignSelf: "stretch"
  },
  navButton: {
    backgroundColor: buddyColor,
    borderRadius: 20,
    padding: 10
  },
  icon: {
    width: 20,
    height: 20
  },
  sectionWrapper: {
    backgroundColor: "#F7F7F7",
    borderRadius: 30,
    gap: 10
  },
  itemTitle: {
    color: grayColor,
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 14,
  },
  itemValue: {
    color: "#000",
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 16,
  },
  itemTitle: {
    color: grayColor,
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 14,
  },
})

export default ProfileScreen;

import { View, Text, Image, StyleSheet } from "react-native"
import { HeaderProfileSection, InfoProfileSection, ItemTitleProfile, SectionProfile } from "./ProfileSection"
import InputProfile from "./InputProfile"
import Select from "../Select"
import ContactEdit from "./ContactsEdit"
import { ProfileEditProps } from "../../interfaces/ProfileEditProps"
import { languages, genders, counties, universityes } from "../../selectData"
import { IContacts } from "../../classes/IContacts"
import OtherLanguagesList from "./OtherLanguagesList"
import { getPageColor, useAccountStore } from "../../storage/AccountStore"

const getDateValue = (value: string | undefined) => {
  if (!value) {
    return ""
  }
  const options = {year: 'numeric', month: 'numeric', day: 'numeric'} as any;
  const date = new Date(value);
  if (!date) {
    return ""
  }
  return date.toLocaleDateString("ru-RU", options)
}

const getDateValueToSend = (value: string | undefined) => {
  if (!value) {
    return ""
  }
  const date = new Date(value);
  if (!date) {
    return ""
  }
  return date.toISOString().split('T')[0];
}

const pageColor = getPageColor();

const EditProfile: React.FC<ProfileEditProps> = ({ userData, setUserData }) => {
  const isBuddy = useAccountStore.getState().isBuddy

  console.log(userData);

  const getContacts = () => {
    if (!userData.user?.user_info?.contacts) {
      return {} as IContacts
    }
    return userData.user.user_info.contacts
  }

  const setContacts = (newContacts: any) => {
    setUserData(
      {
        ...userData,
        user: {
          ...userData.user,
          user_info: {
            ...userData.user?.user_info,
            contacts: newContacts
          }
        }
      }
    )
  }
  
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Редактирование профиля</Text>
      </View>
      <View style={styles.profilePicWrapper}>
        <View style={[styles.profilePicIcon, styles.iconLeft]}>
          <Image source={require("../../assets/profile/camera.png")} style={{width: 20, height: 20}} />
        </View>
        <View style={styles.profilePic}>
          <Image source={require("../../assets/default-profile-pic.png")} style={{width: 105, height: 105, borderRadius: 30}} />
        </View>
        <View style={[styles.profilePicIcon, styles.iconRight]}>
          <Image source={require("../../assets/profile/gallery.png")} style={{width: 20, height: 20}} />
        </View>
      </View>
      <SectionProfile>
        <HeaderProfileSection>Основная информация</HeaderProfileSection>
        <InfoProfileSection>
          <InputProfile 
            title="Полное имя"
            setProperty={(text: string) => {
              setUserData({
                ...userData,
                user: {
                  ...userData.user,
                  user_info: {
                    ...userData.user?.user_info,
                    full_name: text
                  }
                }})}
              }
            value={userData.user?.user_info?.full_name}
          />
          <View style={styles.gap}>
            {isBuddy
            ? <>
                <ItemTitleProfile>Город</ItemTitleProfile>
                <InputProfile 
                  value={userData.city}
                  setProperty={(value: string) => {
                    setUserData({
                      ...userData,
                      city: value
                    })
                  }}
                />
              </>
              : <>
                  <ItemTitleProfile>
                      Гражданство
                    </ItemTitleProfile>
                    <Select 
                      profile={true}
                      data={counties}
                      setChosenValue={(text: string) => {
                        setUserData({
                          ...userData,
                          citizenship: text
                        })
                      }}
                      initialValue={userData?.citizenship}
                    />
                </>
            }
            
          </View>
          <View style={styles.gap}>
            {!isBuddy && 
              <>
                <ItemTitleProfile>
                  Пол
                </ItemTitleProfile>
                <Select 
                  profile={true}
                  data={genders}
                  setChosenValue={(text: string) => {
                    setUserData({
                      ...userData,
                      sex: text
                    })
                  }}
                  initialValue={userData.sex}
                />
              </>
            }
          </View>
          <InputProfile 
            title="Дата рождения"
            setProperty={(text: string) => {
              const value = getDateValueToSend(text)
              setUserData({
                ...userData,
                user: {
                  ...userData.user,
                  user_info: {
                    ...userData.user?.user_info,
                    birth_date: value
                  }
                }})}
            }
            value={getDateValue(userData.user?.user_info?.birth_date)}
          />
        </InfoProfileSection>
      </SectionProfile>
      <ContactEdit getContacts={getContacts} setContacts={setContacts} />
      <SectionProfile>
        <HeaderProfileSection>Информация о студенте</HeaderProfileSection>
        <InfoProfileSection>
          <View style={styles.gap}>
              <ItemTitleProfile>
                Родной язык
              </ItemTitleProfile>
              <Select 
                profile={true}
                data={languages}
                setChosenValue={(text: string) => {
                  setUserData({
                    ...userData,
                    user: {
                      ...userData.user,
                      user_info: {
                        ...userData.user?.user_info,
                        native_language: text
                      }
                    }})}
                }
                initialValue={userData.user?.user_info?.native_language}
              />
            </View>
            <View style={styles.gap}>
              <ItemTitleProfile>
                Другие языки
              </ItemTitleProfile>
              <OtherLanguagesList userData={userData} setUserData={setUserData}/>
            </View>
        </InfoProfileSection>
      </SectionProfile>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    borderRadius: 20,
    backgroundColor: pageColor,
    paddingHorizontal: 17,
    paddingVertical: 10,
    alignItems: "center"
  },
  title: {
    color: "#262626",
    fontFamily: "LilitaOne",
    fontSize: 26,
    fontWeight: "400"
  },
  profilePicWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  profilePic: {
    borderColor: pageColor,
    borderWidth: 4,
    borderRadius: 30,
    width: 130,
    height: 130,
    justifyContent: "center",
    alignItems: "center"
  },
  profilePicIcon: {
    backgroundColor: pageColor,
    padding: 10,
  },
  iconLeft: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingLeft: 15
  },
  iconRight: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingRight: 15
  },
  gap: {
    gap: 5
  }
});

export default EditProfile;
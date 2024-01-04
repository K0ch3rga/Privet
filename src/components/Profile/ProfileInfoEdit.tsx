import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import { ProfileItemTitle, ProfileSection, ProfileSectionHeader, ProfileSectionInfo, ProfileSectionTitle } from "./ProfileSection"
import { whiteColor, grayColor, mainColor } from "../../defaultColors"
import { IUser } from "../../classes/IUser"
import ProfileInput from "./ProfileInput"
import Select from "../Select"
import { useState } from "react"
import MainButton from "../Buttons/MainButton"
import CustomButton from "../Buttons/CustomButton"

const counties = ['Russia', 'China', 'Korea'];
const genders = ["male", "female"];
const languages = ["Russian","English",'Chinese'];
const levels = ["A1","A2",'B1'];
const universityes = ["УрФУ", "УрГЭУ", "УГПУ"];

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

interface ProfileInfoEditProps {
  userData: IUser, 
  setUserData: React.Dispatch<React.SetStateAction<IUser>>,
  handleSend: () => void
}

const ProfileInfoEdit: React.FC<ProfileInfoEditProps> = ({ userData, setUserData, handleSend }) => {  
  const [otherLanguages, setOtherLanguages] = useState<string[]>(['item1']);

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
      <ProfileSection>
        <ProfileSectionHeader>
          <ProfileSectionTitle>Основная информация</ProfileSectionTitle>
        </ProfileSectionHeader>
        <ProfileSectionInfo>
          <ProfileInput 
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
            <ProfileItemTitle>
              Гражданство
            </ProfileItemTitle>
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
          </View>
          <View style={styles.gap}>
            <ProfileItemTitle>
              Пол
            </ProfileItemTitle>
            <Select 
              profile={true}
              data={genders}
              setChosenValue={(text: string) => {
                setUserData({
                  ...userData,
                  user: {
                    ...userData.user,
                    user_info: {
                      ...userData.user?.user_info,
                      sex: text
                    }
                  }})}
              }
              initialValue={userData.user?.user_info?.sex}
            />
          </View>
          <ProfileInput 
            title="Дата рождения"
            setProperty={(text: string) => {
              setUserData({
                ...userData,
                user: {
                  ...userData.user,
                  user_info: {
                    ...userData.user?.user_info,
                    birth_date: text
                  }
                }})}
            }
            value={getDateValue(userData.user?.user_info?.birth_date)}
          />
        </ProfileSectionInfo>
      </ProfileSection>
      <ProfileSection>
        <ProfileSectionHeader>
          <ProfileSectionTitle>Контакты</ProfileSectionTitle>
        </ProfileSectionHeader>
        <ProfileSectionInfo>
        <ProfileInput 
            title="Номер телефона"
            setProperty={(text: string) => {
              setUserData({
                ...userData,
                user: {
                  ...userData.user,
                  user_info: {
                    ...userData.user?.user_info,
                    contacts: {
                      ...userData.user?.user_info?.contacts,
                      phone: text
                    }
                  }
                }})}
            }
            value={userData.user?.user_info?.contacts?.phone}
          />
          <ProfileInput 
            title="WhatsApp"
            setProperty={(text: string) => {
              setUserData({
                ...userData,
                user: {
                  ...userData.user,
                  user_info: {
                    ...userData.user?.user_info,
                    contacts: {
                      ...userData.user?.user_info?.contacts,
                      whatsapp: text
                    }
                  }
                }})}
            }
            value={userData.user?.user_info?.contacts?.whatsapp}
          />
          <ProfileInput 
            title="VK"
            setProperty={(text: string) => {
              setUserData({
                ...userData,
                user: {
                  ...userData.user,
                  user_info: {
                    ...userData.user?.user_info,
                    contacts: {
                      ...userData.user?.user_info?.contacts,
                      vk: text
                    }
                  }
                }})}
            }
            value={userData.user?.user_info?.contacts?.vk}
          />
          <ProfileInput 
            title="Telegram"
            setProperty={(text: string) => {
              setUserData({
                ...userData,
                user: {
                  ...userData.user,
                  user_info: {
                    ...userData.user?.user_info,
                    contacts: {
                      ...userData.user?.user_info?.contacts,
                      telegram: text
                    }
                  }
                }})}
            }
            value={userData.user?.user_info?.contacts?.telegram}
          />
        </ProfileSectionInfo>
      </ProfileSection>
      <ProfileSection>
        <ProfileSectionHeader>
          <ProfileSectionTitle>Информация о студенте</ProfileSectionTitle>
        </ProfileSectionHeader>
        <ProfileSectionInfo>
          <View style={styles.gap}>
              <ProfileItemTitle>
                Родной язык
              </ProfileItemTitle>
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
              <ProfileItemTitle>
                Другие языки
              </ProfileItemTitle>
              {otherLanguages.map(item => (
                <View style={styles.addLang}>
                  <View style={styles.otherLang}>
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
                  <View style={styles.level}>
                    <Select 
                      profile={true}
                      data={levels}
                    />
                  </View>
                  <Pressable 
                    style={styles.close}
                  >
                    <Image source={require("../../assets/profile/close.png")} style={{width: 20, height: 20 }} />
                  </Pressable>
                </View>
              ))}
              <Pressable onPress={() => {
                setOtherLanguages([...otherLanguages, "item"])
              }}>
                <View style={styles.addIcon}>
                  <Image source={require("../../assets/profile/add.png")} style={{ width: 20, height: 20 }} />
                </View>
              </Pressable>
            </View>
            {/* <View style={styles.gap}>
              <ProfileItemTitle>
                Университет
              </ProfileItemTitle>
              <Select 
              profile={true}
              data={universityes}
              setChosenValue={(text: string) => {
                setUserData({
                  ...userData,
                  citizenship: text
                })
              }}
              initialValue={userData?.citizenship}
            />
            </View> */}
        </ProfileSectionInfo>
      </ProfileSection>
      
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    borderRadius: 20,
    backgroundColor: mainColor,
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
    borderColor: mainColor,
    borderWidth: 4,
    borderRadius: 30,
    width: 130,
    height: 130,
    justifyContent: "center",
    alignItems: "center"
  },
  profilePicIcon: {
    backgroundColor: mainColor,
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
  },
  addIcon: {
    backgroundColor: mainColor,
    borderRadius: 10,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  addLang: {
    flexDirection: "row",
    gap: 10
  },
  close: {
    backgroundColor: "#FF6969",
    borderRadius: 10,
    padding: 7,
    justifyContent: "center",
    alignItems: "center"
  },
  otherLang: {
    flex: 1
  },
  level: {
    minWidth: 70
  }
});

export default ProfileInfoEdit;
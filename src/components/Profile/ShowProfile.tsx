import { View, Text, Image, StyleSheet, Pressable, ColorValue } from "react-native"
import { ItemTitleProfile, SectionProfile, HeaderProfileSection, InfoProfileSection } from "./ProfileSection"
import { whiteColor, grayColor, mainColor, buddyColor, successColor, errorColor } from "../../defaultColors"
import { IStudent } from "../../classes/IStudent"
import { lang_and_level } from "./OtherLanguagesList"
import { getPageColor, useAccountStore } from "../../storage/AccountStore"
import { IBuddy } from "../../classes/IBuddy"
import MainButton from "../Buttons/MainButton"
import { Screens, useLocale } from "../../locale"

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

interface ShowProfileProps {
  isBuddy: boolean
  userData: IBuddy | IStudent
  navigation: any, 
  edit: () => void,
  altEditButton?: boolean
}

const pageColor = getPageColor();
console.log(pageColor)

const ShowProfile: React.FC<ShowProfileProps> = ({ isBuddy, userData, navigation, edit, altEditButton }) => {
  const {locale} = useLocale(Screens.Profile);
  console.log(userData);
  
  return (
    <>
      <View style={styles.header}>
        <View>
          <Image source={require("../../assets/default-profile-pic.png")} style={styles.profilePic} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{userData.user?.user_info?.full_name}</Text>
          {!isBuddy &&
            <Text style={styles.otherInfo}>{userData.citizenship}</Text>
          }
          <Text style={styles.otherInfo}>{userData.sex}</Text>
        </View>
      </View>
      { altEditButton 
        ? 
        <View>
          <MainButton 
            title="Редактировать"
            color={buddyColor}
          />
        </View>
        :
        <View style={styles.buttons}>
          <View style={styles.navButton}>
            <Pressable onPress={edit}>
              <Image source={require('../../assets/profile/edit.png')} style={styles.icon} />
            </Pressable>
          </View>
          <View style={styles.navButton}>
            <Pressable onPress={() => {navigation.navigate("SelectLanguage")}}>
              <Image source={require('../../assets/profile/settings.png')} style={styles.icon} />
            </Pressable>
          </View>
        </View>
      }
      <SectionProfile>
        <HeaderProfileSection>
          {locale.Profile.contacts}
        </HeaderProfileSection>
        <InfoProfileSection>
          <View>
            <ItemTitleProfile>Email</ItemTitleProfile>
            <Text style={styles.itemValue}>{userData.user?.email}</Text>
          </View>
          <View>
            <ItemTitleProfile>{locale.Profile.phone}</ItemTitleProfile>
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
          {isBuddy &&
          <>
            <View>
              <ItemTitleProfile>Универститет</ItemTitleProfile>
              <Text style={styles.itemValue}>{getValue(userData.user?.university)}</Text>
            </View>
            <View>
              <ItemTitleProfile>Город</ItemTitleProfile>
              <Text style={styles.itemValue}>{getValue(userData.city)}</Text>
            </View>
          </>}
          <View>
            <ItemTitleProfile>{locale.Profile.nativeLanguage}</ItemTitleProfile>
            <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.native_language)}</Text>
          </View>
          <View>
            <ItemTitleProfile>{locale.Profile.otherLanguages}</ItemTitleProfile>
            <Text style={styles.itemValue}>{getOtherLanguages(userData.user?.user_info?.other_languages_and_levels)}</Text>
          </View>
          <View>
            <ItemTitleProfile>Дата рождения</ItemTitleProfile>
            <Text style={styles.itemValue}>{getDateValue(userData.user?.user_info?.birth_date)}</Text>
          </View>
          {!isBuddy &&
            <View>
              <ItemTitleProfile>Место проживания</ItemTitleProfile>
              <Text style={styles.itemValue}>{getValue(userData.accommodation)}</Text>
            </View>
          }
        </InfoProfileSection>
      </SectionProfile>
      {!isBuddy &&
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
                <Text style={styles.itemValue}>{getValue(userData.institute)}</Text>
              </View>
              <View>
                <ItemTitleProfile>Направление</ItemTitleProfile>
                <Text style={styles.itemValue}>{getValue(userData.study_program)}</Text>
              </View>
          </InfoProfileSection>
        </SectionProfile>
      }
        <SectionProfile>
          <HeaderProfileSection>
            Другое
          </HeaderProfileSection>
          {isBuddy 
            ? 
            <InfoProfileSection>
              <View>
                <ItemTitleProfile>Тип профиля</ItemTitleProfile>
                <Text style={styles.itemValue}>Сопровождающий</Text>
              </View>
              <View>
                <ItemTitleProfile>Статус Buddy</ItemTitleProfile>
                {userData.buddy_status 
                ? <Text style={[styles.itemValue, { color: successColor }]}>Подтверждён</Text>
                : <Text style={[styles.itemValue, { color: errorColor }]}>Неподтверждён</Text>
              }
              </View>
            </InfoProfileSection>
            : 
            <InfoProfileSection>
              <View>
                <ItemTitleProfile>Дата последнего приезда</ItemTitleProfile>
                <Text style={styles.itemValue}>{getValue(userData.last_arrival_date)}</Text>
              </View>
              <View>
                <ItemTitleProfile>Дата окончания последней визы</ItemTitleProfile>
                <Text style={styles.itemValue}>{getValue(userData.last_visa_expiration)}</Text>
              </View>
            </InfoProfileSection>
          }
        </SectionProfile>
      <SectionProfile>
          <HeaderProfileSection>
            Сопровождение
          </HeaderProfileSection>
          <InfoProfileSection>
              <View>
                <ItemTitleProfile>Последний сопровождающий</ItemTitleProfile>
                <Text style={styles.itemValue}>{getValue(userData.last_buddy)}</Text>
              </View>
          </InfoProfileSection>
        </SectionProfile>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    borderWidth: 4,
    borderColor: pageColor,
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
    backgroundColor: pageColor,
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
  }
});

export default ShowProfile;
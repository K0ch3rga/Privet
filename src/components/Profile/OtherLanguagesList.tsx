import { View, StyleSheet, Pressable, Image, Text } from "react-native";
import Select from "../Select";
import { mainColor } from "../../defaultColors";
import { ProfileEditProps } from "../../interfaces/ProfileEditProps";


export type lang_and_level = {
  language: string,
  level: string
}

const languages = ["Russian", "English", "Chinese"];
const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

const OtherLanguagesList: React.FC<ProfileEditProps> = ({ userData, setUserData }) => {

  const getLanguage = (index: number, langs: lang_and_level[] | undefined) => {
    if (!langs) {
      return ''
    }
    for (let i = 0; i < langs.length; i++) {
      if (i === index) {
        return langs[i].language
      }
    }
  }

  const getLevel = (index: number, langs: lang_and_level[] | undefined) => {
    if (!langs) {
      return ''
    }
    for (let i = 0; i < langs.length; i++) {
      if (i === index) {
        return langs[i].level
      }
    }
  }
  
  const changeLanguage = (index: number, newValue: string, langs: lang_and_level[] | undefined ) => {
    if (!langs) {
      return undefined
    }
    const newArray: lang_and_level[] = [];
    for (let i = 0; i < langs.length; i++) {
      if (i === index) {
        newArray.push({...langs[i], language: newValue})
      }
      else {
        newArray.push(langs[i])
      }
    }
    return newArray;
  }

  const changeLevel = (index: number, newValue: string, langs: lang_and_level[] | undefined) => {
    if (!langs) {
      return undefined
    }
    const newArray: lang_and_level[] = [];
    for (let i = 0; i < langs.length; i++) {
      if (i === index) {
        newArray.push({...langs[i], level: newValue})
      }
      else {
        newArray.push(langs[i])
      }      
    }
    return newArray;
  }

  const deleteValue = (index: number, langs: lang_and_level[] | undefined) => {
    if (!langs) {
      return undefined
    }
    const newArray: lang_and_level[] = [];
    for (let i = 0; i < langs.length; i++) {
      if (i !== index) {
        newArray.push(langs[i])
      }
    }
    return newArray;
  }
  
  return(
    <>
      {userData.user?.user_info?.other_languages_and_levels.map((item, index) => (
        <View style={styles.addLang} key={index}>
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
                      other_languages_and_levels: changeLanguage(index, text, userData.user?.user_info?.other_languages_and_levels)
                    }
                  }})
              }}
              initialValue={getLanguage(index, userData.user?.user_info?.other_languages_and_levels)}
            />
          </View>
          <View style={styles.level}>
            <Select 
              profile={true}
              data={levels}
              setChosenValue={(text: string) => {
                setUserData({
                  ...userData,
                  user: {
                    ...userData.user,
                    user_info: {
                      ...userData.user?.user_info,
                      other_languages_and_levels: changeLevel(index, text, userData.user?.user_info?.other_languages_and_levels)
                    }
                  }})
              }}
              initialValue={getLevel(index, userData.user?.user_info?.other_languages_and_levels)}
            />
          </View>
          <Pressable 
            style={styles.close}
            onPress={() => {
              setUserData({
                ...userData,
                user: {
                  ...userData.user,
                  user_info: {
                    ...userData.user?.user_info,
                    other_languages_and_levels: deleteValue(index, userData.user?.user_info?.other_languages_and_levels)
                  }
                }})
            }}
          >
            <Image source={require("../../assets/profile/close.png")} style={{ width: 20, height: 20 }} />
          </Pressable>
        </View>
        ))}
      <Pressable
        onPress={() => {
          setUserData({
            ...userData,
            user: {
              ...userData.user,
              user_info: {
                ...userData.user?.user_info,
                other_languages_and_levels: [...userData.user?.user_info?.other_languages_and_levels, {language: "", level: ""}]
              }
            }})
        }}
      >
        <View style={styles.addIcon}>
          <Image source={require("../../assets/profile/add.png")} style={{ width: 20, height: 20 }} />
        </View>
      </Pressable>
    </>
  )
}

export default OtherLanguagesList;

const styles = StyleSheet.create({
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
    alignItems: "center",
    maxHeight: 38
  },
  otherLang: {
    flex: 1
  },
  level: {
    minWidth: 70
  }
});
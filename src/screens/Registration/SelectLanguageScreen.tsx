import {View, Text, StyleSheet} from "react-native";
import BigLogoWithText from "../../components/Logos/BigLogoWithText";
import Select, {SelectProps, SelectOptionProps} from "../../components/Select";
import DropDown from "../../components/DropDown";
import RegMainButton from "../../components/Buttons/RegMainButton";
import {mainColor} from "../../defaultColors";
import {Languages, Screens, useLocale} from "../../locale";

const SelectLanguageScreen: React.FC = () => {
  const data: {text: string; lang: Languages}[] = [
    {text: "English", lang: Languages.EN},
    {text: "Russian", lang: Languages.RU},
  ];
  const {locale, dispatch} = useLocale(Screens.LanguageChoose);
  console.log(locale)
  const setLang = (lang: string) => {
    dispatch?.(data.find(d=> d.text==lang)?.lang);
  };

  return (
    <View style={styles.wrapper}>
      <BigLogoWithText />
      <View style={styles.nav}>
        <Text style={styles.header}>{locale.LanguageChoose.question}</Text>
        <Select data={data.map(d=>d.text)} setChosenValue={setLang} />
        <RegMainButton
          color={mainColor}
          onPress={() => console.log("Pressed")}
          title="Continue"
          showArrow={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 113,
  },
  nav: {
    display: "flex",
    gap: 14,
  },
  header: {
    fontSize: 24,
    fontFamily: "KumbhSans-Medium",
    textAlign: "center",
    color: "#455A64",
  },
});

export default SelectLanguageScreen;

import {View, Text, StyleSheet} from "react-native";
import BigLogoWithText from "../components/Logos/BigLogoWithText";
import Select, {SelectProps, SelectOptionProps} from "../components/Select";
import DropDown from "../components/DropDown";
import {Languages, useLocale, Screens} from "../locale";
import MainButton from "../components/Buttons/MainButton";
import {mainColor} from "../defaultColors";

const SelectLanguageScreen: React.FC = () => {
    const data: {lang: Languages; name: string}[] = [
        {lang: Languages.EN, name: "English"},
        {lang: Languages.RU, name: "Russian"},
    ];

    const {dispatch, locale} = useLocale(Screens.LanguageChoose);
    const changeLocale = (language: string) => {
        let lang = data.find(d => d.name == language)?.lang
        if (!!lang){
            dispatch({type: "CHANGE_LOCALE", payload: lang})
        }
    }

    console.log(locale.text[Screens.LanguageChoose]); // вот эту пасту надо заменить
    

    return (
        <View style={styles.wrapper}>
            <BigLogoWithText />
            <View style={styles.nav}>
                <Text style={styles.header}>{locale.text[Screens.LanguageChoose].question}</Text>
                <Select data={data.map((d) => d.name)} setChosenValue={changeLocale} />
                <MainButton
                    color={mainColor}
                    onPress={() => console.log("Pressed")}
                    title={locale.text[Screens.LanguageChoose].continue}
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

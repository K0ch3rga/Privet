import { StyleSheet, TextInput, View, Text } from "react-native";
import { ItemTitleProfile } from "../../components/Profile/ProfileSection";
import { errorColor, mainColor, secondBlackColor, successColor } from "../../defaultColors";
import MainButton from "../../components/Buttons/MainButton";
import { useState } from "react";


const AddStudentToArrival: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
  const [inputColor, setInputColor] = useState(mainColor);
  const [hintText, setHintText] = useState("");

  const studentAdded = () => {
    setInputColor(successColor)
    setHintText('Студент успешно добавлен в приезд')
  }

  const studentNotFound = () => {
    setInputColor(errorColor)
    setHintText('Не удалось найти студента с таким именем\nПроверьте правильность заполнения')
  }

  const studentNotPayed = () => {
    setInputColor(errorColor)
    setHintText('Студент есть в системе\nУслуги не оплачены')
  }

  return(
    <View style={styles.wrapper}>
      <View style={{ gap: 3 }}>
        <ItemTitleProfile>Полное имя</ItemTitleProfile>
        <TextInput 
          style={[styles.input, { borderColor: inputColor }]}
        />
      </View>
      <View style={styles.bottom}>
        {!!hintText &&
          <View style={{ height: 58, justifyContent: "center"}}>
            <Text style={styles.text}>{hintText}</Text>
          </View>
        }
          <MainButton 
            title="Добавить участника"
            color={mainColor}
            textStyle={styles.btnFont}
            onPress={studentNotPayed}
          />
          <MainButton 
            title="Отменить"
            color={errorColor}
            textStyle={styles.btnFont}
            onPress={handleClose}
          />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 30,
    width: "100%",
    gap: 30,
    flex: 1,
    justifyContent: "flex-start"
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 8,
    paddingLeft: 11,
    paddingRight: 7,

    color: secondBlackColor,
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 16
  },
  btnFont: {
    fontSize: 16
  },
  bottom: {
    paddingHorizontal: 40,
    gap: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  text: {
    color: secondBlackColor,
    textAlign: "center",
    fontFamily: "Manrope",
    fontSize: 14,
    fontWeight: "400"
  }
})

export default AddStudentToArrival;
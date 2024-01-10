import { StyleSheet, TextInput, View, Text, Image } from "react-native";
import { ItemTitleProfile } from "../../components/Profile/ProfileSection";
import { errorColor, mainColor, secondBlackColor, successColor } from "../../defaultColors";
import MainButton from "../../components/Buttons/MainButton";
import { useState } from "react";
// @ts-ignore
import {BASE_URL, BASE_TOKEN} from "@env";
import Popup from "../../components/Popup";
import { useAccountStore } from "../../storage/AccountStore";
import { ScreenProps } from "../../interfaces/ScreenProps";


const AddStudentToArrival: React.FC<ScreenProps> = ({ navigation }) => {
  const [inputColor, setInputColor] = useState(mainColor);
  const [hintText, setHintText] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [addedStudents, setAddedStudents] = useState<string[]>([]);
  const user_id = useAccountStore(state => state.user_id)

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

  const handleSend = async () => {
    const url = `${BASE_URL}/student/arrival-booking/add-student/`

    const data ={
      student_name: name,
      student_id: user_id
    }

    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": BASE_TOKEN
          },
          body: JSON.stringify(data),
      })

      if (!response.ok) {
        // setError(true)
        // setErrorMessage(JSON.stringify(json));
        studentNotFound();
      }
      else{
        studentAdded()
        setAddedStudents([...addedStudents, name])
        const json = await response.json();
        console.log("Успех:", JSON.stringify(json));
      }

    } catch (error) {
      console.error("Ошибка:", error)
    }
    setLoading(false);
  }

  console.log(name);

  return(
    <>
      <View style={styles.wrapper}>
        <View style={{ gap: 3 }}>
          <ItemTitleProfile>Полное имя</ItemTitleProfile>
          <TextInput 
            style={[styles.input, { borderColor: inputColor }]}
            value={name}
            onChangeText={(text: string) => {setName(text)}}
          />
        </View>
        <View style={{ gap: 10 }}>
          {addedStudents.length > 0 && 
            <Text>Добавленные участники:</Text>
          }
          {addedStudents.map((student) => {
            return(
              <View>
                <Text>{student}</Text>
              </View>
            )
          })}
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
              onPress={handleSend}
            />
            <MainButton 
              title="Продолжить"
              color={errorColor}
              textStyle={styles.btnFont}
              onPress={() => {navigation.navigate("ArrivalFinal")}}
            />
        </View>
      </View>
      {isLoading && 
        <Popup>
          <Text>Loading...</Text>
        </Popup>
      }
      {isError && 
        <Popup close={() => setError(false)}>
          <Text>{errorMessage}</Text>
        </Popup>
      }
    </>
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
import {View, Text, StyleSheet, Image} from "react-native";
import MainButton from "../../components/Buttons/MainButton";
import {mainColor, secondBlackColor, whiteColor} from "../../defaultColors";
import {ScreenProps} from "../../interfaces/ScreenProps";
import {useEffect, useState} from "react";
import {getArrivalUserInfo} from "../../requests/GetProfileForArrival";
import sendArrivalBooking from "../../requests/RegisterArrival";
import {IArrival} from "../../classes/IArrival";

const NoArrivalsScreen: React.FC<ScreenProps> = ({navigation}) => {
  const arrival: IArrival = {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");
  useEffect(() => {
    sendArrivalBooking(
      arrival,
      (l) => setLoading(l),
      (e) => setError(e),
      (r) => setResponse(r)
    ).catch((e)=>console.log(e));
  });

  return (
    <View style={styles.wrapper}>
      <View style={{alignItems: "center", gap: 8}}>
        <Text style={styles.text}>
          С этапами приезда вы можете ознакомиться на экране “Маршрут”
        </Text>
        <Image
          source={require("../../assets/icons/location.png")}
          style={{width: 24, height: 24}}
        />
      </View>
      <MainButton
        title="Создать приезд"
        color={mainColor}
        onPress={() => {
          navigation.navigate("CreateArrival");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 25,
    gap: 20,
    backgroundColor: whiteColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: secondBlackColor,
    textAlign: "center",
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 16,
  },
});

export default NoArrivalsScreen;

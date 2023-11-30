import { View, Text, StyleSheet, Image } from 'react-native';
import { useFonts } from "expo-font";


const CustomPicker: React.FC<{ currentItem: string }> = ({currentItem}) => {

  return(
  <View style={[styles.pickerBox, styles.shadowPickerBox]}>
    <Image source={require("../assets/flags/english.png")} style={styles.pickerIcon} />
    <Text style={styles.pickerLabel}>{currentItem}</Text>
    <Image source={require("../assets/arrow.png")} style={styles.pickerArrow} />
  </View>
  );
};


const DropDown: React.FC = () => {
  const [] = useFonts({
    "LilitaOne": require("../assets/fonts/LilitaOne-Rus.ttf"),
    "KumbhSans500": require("../assets/fonts/KumbhSans-Medium.ttf")
  });

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>What is your language?</Text>
      <CustomPicker currentItem='English' />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: "KumbhSans500",
    fontSize: 21,
    marginBottom: 10
  },
  pickerBox: {
    height: 51,
    width: 312,
    borderColor: '#FFD869',
    borderWidth: 3,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  shadowPickerBox: {
    shadowColor: '#FFD869',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.37,
    shadowRadius: 3,
  },
  pickerLabel: {
    fontFamily: "LilitaOne",
    fontSize: 25,
    color: "#455A64"
  },
  pickerIcon: {
    width: 25,
    height: 17
  },
  pickerArrow: {
    width: 24,
    height: 15
  }
});

export default DropDown;

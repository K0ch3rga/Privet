import { View, Text, Image, StyleSheet, TextStyle } from 'react-native';
import { useFonts } from "expo-font";

const LogoWithText: React.FC = () => {
  const [fontsLoaded] = useFonts({
    "Jua": require("../assets/fonts/Jua-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.label}>PRIVET</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 229,
    height: 229,
    resizeMode: 'contain',
  },
  label: {
    marginTop: 10,
    fontFamily: "Jua",
    fontSize: 60,
    fontWeight: "400",
    color: '#455A64'
  } as TextStyle,
});


export default LogoWithText;

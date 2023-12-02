import { View, Text, Image, StyleSheet, TextStyle } from 'react-native';

const BigLogoWithText: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
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


export default BigLogoWithText;

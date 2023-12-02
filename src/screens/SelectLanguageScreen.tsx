import { View, Text, StyleSheet } from 'react-native';
import BigLogoWithText from '../components/Logos/BigLogoWithText';
import Select, { SelectProps } from '../components/Select';
import DropDown from '../components/DropDown';
import MainButton from '../components/Buttons/MainButton';
import { mainColor } from '../defaultColors';

const SelectLanguageScreen: React.FC = () => {
  const data: SelectProps[] = [
    {text: 'English'},
    {text: 'Russian'},
    {text: 'Chinese'},
  ]; // Я не придумал ничего лучше, но с этим нужно что-то делать
  
  return (
    <View style={styles.wrapper}>
      <BigLogoWithText/>
      <View style={styles.nav}> 
        <Text style={styles.header}>What is your language?</Text>
        <Select data={data}/>
        <MainButton color={mainColor} onPress={() => console.log('Pressed')} title="Continue" showArrow={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
    gap: 113
  },
  nav: {
    display: 'flex',
    gap: 14
  },
  header: {
    fontSize: 24,
    fontFamily: "KumbhSans-Medium",
    textAlign: "center",
    color: "#455A64",
  }
});


export default SelectLanguageScreen;

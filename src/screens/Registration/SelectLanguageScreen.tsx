import { View, Text, StyleSheet } from 'react-native';
import BigLogoWithText from '../../components/Logos/BigLogoWithText';
import Select, { SelectProps, SelectOptionProps } from '../../components/Select';
import DropDown from '../../components/DropDown';
import RegMainButton from '../../components/Buttons/RegMainButton';
import { mainColor } from '../../defaultColors';

const SelectLanguageScreen: React.FC = () => {
  const data: SelectOptionProps[] = [
    {text: 'English'},
    {text: 'Russian'},
    {text: 'Chinese'},
  ]; // Я всё придумал
  
  return (
    <View style={styles.wrapper}>
      <BigLogoWithText/>
      <View style={styles.nav}> 
        <Text style={styles.header}>What is your language?</Text>
        <Select data={data}/>
        <RegMainButton color={mainColor} onPress={() => console.log('Pressed')} title="Continue" showArrow={true} />
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

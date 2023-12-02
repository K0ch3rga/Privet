import { View, Text, StyleSheet } from 'react-native';
import LogoWithText from './LogoWithText';
import YellowButton from './YellowButton';
import Select, { SelectProps } from './Select';
import DropDown from './DropDown';


const WelcomeScreen: React.FC = () => {
  const data: SelectProps[] = [
    {text: 'English'},
    {text: 'Russian'},
    {text: 'Chinese'},
  ]; // Я не придумал ничего лучше, но с этим нужно что-то делать
  
  return (
    <View style={styles.wrapper}>
      <LogoWithText/>
      <View style={styles.nav}> 
        <Text style={styles.header}>What is your language?</Text>
        <Select data={data}/>
        <YellowButton onPress={() => console.log('Pressed')} title="Continue" showArrow={true} />
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
    fontFamily: "KumbhSans500",
    textAlign: "center"
  }
});


export default WelcomeScreen;

import LogoWithText from './LogoWithText';
import YellowButton from './YellowButton';
import Select, { SelectProps } from './Select';
import DropDown from './DropDown';


const WelcomeScreen: React.FC = () => {
  const data: SelectProps[] = [
    {text: 'English'},
    {text: 'Rus'},
  ]; // Я не придумал ничего лучше, но с этим нужно что-то делать
  return (
    <>
      <LogoWithText/>
      <Select data = {data}/>
      <YellowButton onPress={() => console.log('Pressed')} title="Continue" showArrow={true} />
    </>
  );
};


export default WelcomeScreen;

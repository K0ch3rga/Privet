import LogoWithText from './LogoWithText';
import DropDown from './DropDown';
import YellowButton from './YellowButton';


const WelcomeScreen: React.FC = () => {
  return (
    <>
      <LogoWithText/>
      <DropDown />
      <YellowButton onPress={() => console.log('Pressed')} title="Continue" showArrow={true} />
    </>
  );
};


export default WelcomeScreen;

import CustomButton from "./CustomButton";
import { ButtonProps } from "../../interfaces/ButtonProps";


const SecondaryButton: React.FC<ButtonProps> = (props: ButtonProps) => {    
    return(
    <CustomButton 
        title={props.title}
        onPress={props.onPress}
        showArrow={props.showArrow}
        buttonStyle={{backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: props.color}}
        titleStyle={{color: props.color}} />
    )
}

export default SecondaryButton;
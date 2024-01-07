import { View, Text, Pressable, StyleProp, StyleSheet, Image } from "react-native"; 

export interface RegButton {
    title: string;
    onPress?: ()=>void;
    showArrow?: boolean;
    buttonStyle?: StyleProp<any>
    titleStyle?: StyleProp<any>
};

const RegButton: React.FC<RegButton> = (props: RegButton) => {    
    const buttonStyle = [defaultButtonStyle.button, props.buttonStyle];
    const titleStyle = [defaultButtonStyle.buttonTitle, props.titleStyle];

    return(
    <View>
        <Pressable onPress={props.onPress} style={buttonStyle}>
            <Text style={titleStyle}>{props.title}</Text>
            {props.showArrow && 
                <Image 
                    source={require("../../assets/arrow_right.png")} 
                    style={defaultButtonStyle.arrow} />
            }
        </Pressable>
    </View>
    )
}

const defaultButtonStyle = StyleSheet.create({
    button: {
        position: "relative",
        width: 312,
        height: 51,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    buttonTitle: {
        fontSize: 25,
        fontFamily: "LilitaOne"
    },
    arrow: {
        position: "absolute",
        right: 17,
        height: 24,
        width: 15
    }
})

export default RegButton;

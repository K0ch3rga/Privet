import { View, Text, Pressable, StyleProp, StyleSheet, ViewStyle, Image } from "react-native"; 

const YellowButton: React.FC<YellowButtonProps> = (props: YellowButtonProps) => {
    const buttonStyle = [defaultButtonStyle.button, props.buttonStyle];
    const titleStyle = [defaultButtonStyle.buttonTitle, props.titleStyle];
    console.log(props.buttonStyle);
    
    return(
    <View>
        <Pressable onPress={props.onPress} style={buttonStyle}>
            <Text style={titleStyle}>{props.title}</Text>
            {props.showArrow && <Image source={require("../assets/arrow_right.png")} 
                                        style={defaultButtonStyle.arrow} />}
        </Pressable>
    </View>
    )
}

const defaultButtonStyle = StyleSheet.create({
    button: {
        position: "relative",
        backgroundColor: "#FFD869",
        width: 312,
        height: 51,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    buttonTitle: {
        color: "#FFFFFF",
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

export interface YellowButtonProps {
    title: string;
    onPress?: ()=>void;
    showArrow?: boolean;
    buttonStyle?: StyleProp<ViewStyle> // FIXME разобраться со стилями
    titleStyle?: StyleProp<ViewStyle>
};

export default YellowButton;
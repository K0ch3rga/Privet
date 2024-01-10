import { Text, StyleProp } from 'react-native';

interface TextLinkProps{
  children: string
  onPress: () =>  void
  style?: StyleProp<any>
}

const TextLink: React.FC<TextLinkProps> = (props) => {
  const defaultStyle = {
    fontFamily: "Manrope",
    fontWeight: "300",
    fontSize: 13,
    color: "#455A64",
    textDecorationLine: "underline"
  };
  const style = [defaultStyle, props.style]

  return(
    <Text style={style} onPress={props.onPress}>{props.children}</Text>
  );
}

export default TextLink;
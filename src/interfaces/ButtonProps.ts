export interface ButtonProps {
  title: string;
  color: string;
  onPress?: ()=>void;
  showArrow?: boolean;
  style?: any,
  textStyle?: any
};
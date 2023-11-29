import { useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, Pressable, GestureResponderEvent } from "react-native";

const Select = (props: SelectProps) => {
  const [value, setValue] = useState(props.data[0].text);
  const [expanded, setExpanded] = useState(false);

  const openHandle = () => setExpanded(!expanded);

  const toggleselect = (value: string) => {
    setValue(value);
    setExpanded(false);
  };

  return (
    <View>
      <SelectButton text={value} onPress={openHandle} />
      {expanded && (
        <FlatList
          data={props.data}
          renderItem={({ item }) => (
            <SelectOption
              text={item.text}
              onPress={() => toggleselect(item.text)}
              selected={value}
            />
          )}
        />
      )}
    </View>
  );
};

export const SelectButton = (props: SelectButtonProps) => {
  return (
    <Pressable style={style.Button} onPress={props.onPress}>
      {props.imagePath && <Image source={require(props.imagePath)} />}
      <Text style={style.MainText}>{props.text}</Text>
      <Image
        source={require("../assets/arrow_right.png")}
        style={style.Arrow}
      />
    </Pressable>
  );
};

export const SelectOption = (props: SelectOptionProps) => {
  return (
    <Pressable onPress={props.onPress}>
      {props.imagePath && <Image source={require(props.imagePath)} />}
      {/* Объединение с подчёркиванием, чтобы знать что выбрано */}
      <Text
        style={[
          style.OptionText,
          {
            textDecorationLine:
              props.selected == props.text ? "underline" : "none",
          },
        ]}
      >
        {props.text}
      </Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  Button: {
    paddingVertical: 7,
    paddingHorizontal: 18,
    width: 312,
    height: 51,
    borderColor: "#FFD869",
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: 18,
    justifyContent: "center",
    alignContent: "center",
  },
  MainText: {
    fontFamily: "LilitaOne",
    fontSize: 25,
    fontWeight: "400",
  },
  OptionText: {
    // a чё?
  },
  Arrow: {
    backgroundColor: "#000",
  },
});

export interface SelectProps {
  data: { text: string; imagePath?: string }[]; // FIXME
}

export interface SelectOptionProps {
  imagePath?: string;
  text: string;
  selected: string;
  onPress: (e: GestureResponderEvent) => void;
}

export interface SelectButtonProps {
  text: string;
  imagePath?: string;
  onPress: () => void;
}

export default Select;

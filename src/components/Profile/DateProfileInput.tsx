import {useState} from "react";
import {StyleSheet, View, Text, Pressable, Image} from "react-native";
import {mainColor, whiteColor, grayColor} from "../../defaultColors";
import DateTimePicker, {DateTimePickerEvent, DatePickerOptions} from "@react-native-community/datetimepicker";

const DateProfileInput = (props: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(props.initialstate? props.initialstate: new Date());
  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setOpen(false);
    if (date)
      setDate(date);
    props.onChange()
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.itemTitle}>Дата рождения</Text>
      <Pressable style={styles.input} onPress={() => setOpen(true)}>
        <Text>{date.toLocaleDateString()}</Text>
        <Image source={require('../../assets/profile/Calendar.png')} />
      </Pressable>
      {open && <DateTimePicker value={date} mode="date" onChange={handleDateChange} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 5,
  },
  input: {
    height: 38,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: mainColor,
    backgroundColor: whiteColor,
    fontFamily: "Manrope-Regular",
    fontSize: 16,
    color: "#000",
    paddingLeft: 11,
    paddingRight: 7,
    paddingVertical: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  wrong: {
    borderColor: "#FF6969",
  },
  wrongText: {
    marginTop: 7,
    fontFamily: "Manrope-Light",
    fontSize: 15,
    color: "#455A64",
    textAlign: "center",
  },
  itemTitle: {
    color: grayColor,
    fontFamily: "Manrope-Regular",
    fontSize: 14,
  },
});

interface DatePickerProps {
  initialstate?: Date;
  onChange: () => void;
}

export default DateProfileInput;

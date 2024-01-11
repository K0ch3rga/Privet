import { StyleSheet, View, Text } from "react-native";
import { getPageColor } from "../../storage/AccountStore";
import { grayColor } from "../../defaultColors";

const pageColor = getPageColor();

export const SectionProfile: React.FC<{children: any}> = ({ children }) => {
  return (
    <View style={styles.sectionWrapper}>
      {children}
    </View>
  )
}

export const HeaderProfileSection: React.FC<{children: any}> = ({ children }) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>
      {children}
    </Text>
    </View>
  )
}

export const InfoProfileSection: React.FC<{children: any}> = ({ children }) => {
  return (
    <View style={styles.sectionInfo}>
      {children}
    </View>
  )
}

export const ItemTitleProfile: React.FC<{children: any}> = ({ children }) => {
  return (
    <Text style={styles.itemTitle}>
      {children}
    </Text>
  )
}


const styles = StyleSheet.create({
  sectionWrapper: {
    backgroundColor: "#F7F7F7",
    borderRadius: 30,
    gap: 10,
    width: "100%"
  },
  sectionHeader: {
    backgroundColor: pageColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    minWidth: 125,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "center"
  },
  sectionTitle: {
    alignSelf: "center",
    color: "#262626",
    fontFamily: "LilitaOne",
    fontSize: 25
  },
  sectionInfo: {
    paddingHorizontal: 30,
    paddingBottom: 20,
    gap: 10
  },
  itemTitle: {
    color: grayColor,
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 14,
  },
});
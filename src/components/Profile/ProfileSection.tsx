import { StyleSheet, View, Text } from "react-native";
import { mainColor, grayColor } from "../../defaultColors";

export const ProfileSection: React.FC<{children: any}> = ({ children }) => {
  return (
    <View style={styles.sectionWrapper}>
      {children}
    </View>
  )
}

export const ProfileSectionHeader: React.FC<{children: any}> = ({ children }) => {
  return (
    <View style={styles.sectionHeader}>
      {children}
    </View>
  )
}

export const ProfileSectionTitle: React.FC<{children: any}> = ({ children }) => {
  return (
    <Text style={styles.sectionTitle}>
      {children}
    </Text>
  )
}

export const ProfileSectionInfo: React.FC<{children: any}> = ({ children }) => {
  return (
    <View style={styles.sectionInfo}>
      {children}
    </View>
  )
}

export const ProfileItemTitle: React.FC<{children: any}> = ({ children }) => {
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
    gap: 10
  },
  sectionHeader: {
    backgroundColor: mainColor,
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
    fontFamily: "Manrope-Regular",
    fontSize: 14,
  },
});
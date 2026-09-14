import { StyleSheet, View } from "react-native";
import ProfileScreen from "@/components/profileScreen/profilePage";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <ProfileScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

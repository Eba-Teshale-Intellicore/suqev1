import { StyleSheet, View } from "react-native";
import HomeScreen from "@/components/homeScreen/homeSurface";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

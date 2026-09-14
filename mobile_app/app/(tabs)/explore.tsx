import { StyleSheet, View } from "react-native";
import ExploreScreen from "@/components/exploreScreen/explorePage";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <ExploreScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

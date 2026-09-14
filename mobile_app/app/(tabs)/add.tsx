import { StyleSheet, View } from "react-native";
import PostScreen from "@/components/postScreen/postPage";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <PostScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

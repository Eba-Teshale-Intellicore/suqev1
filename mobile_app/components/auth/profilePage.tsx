import { View, Text, Pressable, TextInput } from "react-native";

export default function EditProfilePage() {
  return (
    <View>
      <View>
        <Text>Edit your profile</Text>
        <Text> </Text>
      </View>
      <View>
        <View>
          <Text>username(this does not change)</Text>
          <TextInput></TextInput>
        </View>
        <View>
          <Text>Display name(can change)</Text>
          <TextInput></TextInput>
        </View>
        <View>
          <Text>Email(Does not change)</Text>
        </View>
        <View>
          <Text>phone no(can change)</Text>
          <TextInput></TextInput>
        </View>
      </View>
    </View>
  );
}

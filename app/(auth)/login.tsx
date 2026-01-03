import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#6B7C7C"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#6B7C7C"
        secureTextEntry
        style={styles.input}
      />

      <Pressable
        style={styles.button}
        onPress={() => router.replace("/(tabs)/home")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FAF9",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E3A3A",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7C7C",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE5E3",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#5DB9A8",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});

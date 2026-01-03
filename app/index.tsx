import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Welcome() {
  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>Sakoonify</Text>
        <Text style={styles.tagline}>A calm space for your mind</Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => router.replace("/(tabs)/home")}
        >
          <Text style={styles.primaryText}>Continue Anonymously</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.secondaryText}>Login</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.push("/(auth)/signup")}
        >
          <Text style={styles.secondaryText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FAF9",
    padding: 24,
  },
  header: {
    marginTop: 70,
    marginBottom: 50,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2E3A3A",
  },
  tagline: {
    fontSize: 16,
    color: "#6B7C7C",
    marginTop: 8,
  },
  actions: {
    flex: 1,
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#5DB9A8",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 14,
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#5DB9A8",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  secondaryText: {
    color: "#5DB9A8",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});

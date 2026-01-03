import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { useAppSettings } from "../../context/AppSettingsContext";
import { Colors } from "../../constants/theme";

const texts = {
  en: {
    greeting: "Hello",
    quoteTitle: "Daily Motivation",
    quote: "Healing takes time, and asking for help is strength.",
    diary: "My Diary",
    mood: "Track Mood",
    howAreYou: "How are you today?",
    habits: "Recommended Habits",
    streakTitle: "🌱 Self-care streak",
    streakDesc: "You’ve checked in 3 days in a row",
  },
  ur: {
    greeting: "سلام",
    quoteTitle: "روزانہ حوصلہ افزائی",
    quote: "شفا میں وقت لگتا ہے، اور مدد مانگنا طاقت ہے۔",
    diary: "میری ڈائری",
    mood: "موڈ ٹریک کریں",
    howAreYou: "آج آپ کیسا محسوس کر رہے ہیں؟",
    habits: "تجویز کردہ عادات",
    streakTitle: "🌱 خود کی دیکھ بھال کی اسٹریک",
    streakDesc: "آپ نے 3 دن مسلسل چیک کیا ہے",
  },
};

const moodOptions = ["😄", "🙂", "😐", "😔", "😢"];
const habitList = ["Drink Water", "Take a Walk", "Meditation"];

export default function HomePage() {
  const router = useRouter();
  const { isDark, toggleTheme, language } = useAppSettings();
  const colors = Colors[isDark ? "dark" : "light"];
  const t = texts[language];

  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      setSelectedMood(null);
    }, [])
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}
      contentContainerStyle={{ paddingBottom: 90 }}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.textPrimary }]}>{t.greeting} 👋</Text>
        <Pressable onPress={toggleTheme}>
          <Ionicons name={isDark ? "moon" : "sunny"} size={24} color={colors.primary} />
        </Pressable>
      </View>

      {/* DAILY QUOTE */}
      <View style={[styles.card, { backgroundColor: colors.primary }]}>
        <Text style={[styles.cardTitle, { color: colors.surface }]}>{t.quoteTitle}</Text>
        <Text style={[styles.quote, { color: colors.surface }]}>{t.quote}</Text>
      </View>

      {/* MOOD SELECTOR */}
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{t.howAreYou}</Text>
        <View style={styles.moodRow}>
          {moodOptions.map((mood) => (
            <Pressable
              key={mood}
              style={[
                styles.moodItem,
                selectedMood === mood && { backgroundColor: colors.primary },
              ]}
              onPress={() => {
                setSelectedMood(mood);
                router.push({ pathname: "/mood", params: { mood } });
              }}
            >
              <Text style={{ fontSize: 28 }}>{mood}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* ACTION CARDS */}
      <View style={styles.actionRow}>
        <Pressable
          style={[styles.actionCard, { backgroundColor: colors.primary }]}
          onPress={() => router.push("/mood")}
        >
          <Ionicons name="book" size={26} color={colors.surface} />
          <Text style={[styles.actionText, { color: colors.surface }]}>{t.diary}</Text>
        </Pressable>
        <Pressable
          style={[styles.actionCard, { backgroundColor: colors.primary }]}
          onPress={() => router.push("/mood")}
        >
          <Ionicons name="happy-outline" size={26} color={colors.surface} />
          <Text style={[styles.actionText, { color: colors.surface }]}>{t.mood}</Text>
        </Pressable>
      </View>

      {/* HABITS */}
      <View style={[styles.card, { backgroundColor: "#668B55" }]}>
        <Text style={[styles.cardTitle, { color: "#fff" }]}>{t.habits}</Text>
        {habitList.map((h, i) => (
          <View key={i} style={styles.habitRow}>
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={{ color: "#fff" }}>{h}</Text>
          </View>
        ))}
      </View>

      {/* STREAK */}
      <View style={[styles.card, { backgroundColor: "#845C40" }]}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>{t.streakTitle}</Text>
        <Text style={{ color: "#EAF4EC", marginTop: 6 }}>{t.streakDesc}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  greeting: { fontSize: 26, fontWeight: "700" },
  card: { borderRadius: 22, padding: 18, marginBottom: 20 },
  cardTitle: { fontSize: 16, fontWeight: "600" },
  quote: { fontSize: 14, fontStyle: "italic", marginTop: 4 },
  moodRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  moodItem: { padding: 10, borderRadius: 12 },
  actionRow: { flexDirection: "row", gap: 14, marginBottom: 20 },
  actionCard: { flex: 1, borderRadius: 22, paddingVertical: 26, alignItems: "center" },
  actionText: { fontSize: 14, fontWeight: "600" },
  habitRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 },
});

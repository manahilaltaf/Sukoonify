import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet, Linking } from "react-native";
import { useAppSettings } from "../../context/AppSettingsContext";
import { Colors } from "../../constants/theme";

// Texts for English and Urdu
const texts = {
  en: {
    moodTitle: "Mood Tracker",
    diary: "My Diary",
    calming: "Calming Sounds",
    helpline: "Helpline: 1166",
    community: "Community Support",
    analyticsTitle: "Mood Analytics",
    averageMood: "Average Mood",
    moodCounts: "Mood Counts",
  },
  ur: {
    moodTitle: "موڈ ٹریک کریں",
    diary: "میری ڈائری",
    calming: "پرسکون آوازیں",
    helpline: "ہیلپ لائن: 1166",
    community: "کمیونٹی سپورٹ",
    analyticsTitle: "موڈ تجزیہ",
    averageMood: "اوسط موڈ",
    moodCounts: "موڈ کی گنتی",
  },
};

// Mood options
const moodOptions = ["😄", "🙂", "😐", "😔", "😢"];
const calmingSounds = ["🌧️ Rain", "🐦 Birds", "🌊 Ocean Waves"];

export default function MoodScreen() {
  const router = useRouter();
  const { isDark, toggleTheme, language } = useAppSettings();
  const colors = Colors[isDark ? "dark" : "light"];
  const t = texts[language];

  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodHistory, setMoodHistory] = useState<string[]>([]); // store history for analytics

  useFocusEffect(
    useCallback(() => {
      setSelectedMood(null);
    }, [])
  );

  // Add mood to history
  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setMoodHistory((prev) => [...prev, mood]);
  };

  // Simple analytics
  const moodCounts = moodOptions.reduce((acc, m) => {
    acc[m] = moodHistory.filter((h) => h === m).length;
    return acc;
  }, {} as Record<string, number>);

  const averageMoodIndex =
    moodHistory.length > 0
      ? Math.round(
          moodHistory.reduce((sum, m) => sum + moodOptions.indexOf(m), 0) / moodHistory.length
        )
      : null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 90 }}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{t.moodTitle}</Text>
          <Pressable onPress={toggleTheme}>
            <Ionicons name={isDark ? "moon" : "sunny"} size={24} color={colors.primary} />
          </Pressable>
        </View>

        {/* MOOD SELECTOR */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <View style={styles.moodRow}>
            {moodOptions.map((mood) => (
              <Pressable
                key={mood}
                style={[
                  styles.moodItem,
                  selectedMood === mood && { backgroundColor: colors.primary },
                ]}
                onPress={() => handleMoodSelect(mood)}
              >
                <Text style={{ fontSize: 28 }}>{mood}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* MOOD ANALYTICS */}
        {moodHistory.length > 0 && (
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{t.analyticsTitle}</Text>
            <Text style={{ color: colors.textPrimary, marginTop: 6 }}>
              {t.averageMood}: {averageMoodIndex !== null ? moodOptions[averageMoodIndex] : "-"}
            </Text>
            <Text style={{ color: colors.textPrimary, marginTop: 4 }}>{t.moodCounts}:</Text>
            {moodOptions.map((m) => (
              <Text key={m} style={{ color: colors.textPrimary, marginLeft: 10 }}>
                {m}: {moodCounts[m]}
              </Text>
            ))}
          </View>
        )}

        {/* DIARY */}
        <Pressable
          style={[styles.card, { backgroundColor: colors.primary }]}
          onPress={() => router.push("/mood")}
        >
          <Ionicons name="book" size={26} color={colors.surface} />
          <Text style={[styles.actionText, { color: colors.surface, marginTop: 6 }]}>{t.diary}</Text>
        </Pressable>

        {/* CALMING SOUNDS */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{t.calming}</Text>
          {calmingSounds.map((sound, i) => (
            <Pressable key={i} style={styles.soundRow}>
              <Text style={{ color: colors.textPrimary }}>{sound}</Text>
              <Ionicons name="play-circle" size={22} color={colors.primary} />
            </Pressable>
          ))}
        </View>

        {/* COMMUNITY SUPPORT & HELPLINE */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Pressable onPress={() => Linking.openURL("tel:1166")}>
            <Text style={[styles.cardTitle, { color: colors.primary }]}>{t.helpline}</Text>
          </Pressable>
          <Pressable onPress={() => router.push("/mood")}>
            <Text style={[styles.cardTitle, { color: colors.primary, marginTop: 6 }]}>{t.community}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  card: { borderRadius: 22, padding: 18, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: "600" },
  moodRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  moodItem: { padding: 10, borderRadius: 12 },
  actionText: { fontSize: 14, fontWeight: "600" },
  soundRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
});

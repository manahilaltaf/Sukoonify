import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View, Linking } from "react-native";
import { useAppSettings } from "../../context/AppSettingsContext";
import { Colors } from "../../constants/theme";

const profileTexts = {
  en: {
    darkMode: "Dark Mode",
    language: "Language (English / Urdu)",
    notifications: "Notifications",
    privacy: "Privacy Policy",
    help: "Help & Support",
    about: "About Sakoonify",
    helpline: "Helpline: 1166",
    community: "Community Support",
  },
  ur: {
    darkMode: "ڈارک موڈ",
    language: "زبان (انگریزی / اردو)",
    notifications: "نوٹیفکیشنز",
    privacy: "پرائیویسی پالیسی",
    help: "مدد اور سپورٹ",
    about: "سکونفائی کے بارے میں",
    helpline: "ہیلپ لائن: 1166",
    community: "کمیونٹی سپورٹ",
  },
};

export default function ProfileScreen() {
  const { isDark, toggleTheme, language, toggleLanguage } = useAppSettings();
  const colors = Colors[isDark ? "dark" : "light"];
  const t = profileTexts[language];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: isDark ? "#1E2A24" : "#DDE8DF" }]}>
          <Text style={{ fontSize: 28 }}>🧠</Text>
        </View>
        <Text style={[styles.name, { color: colors.textPrimary }]}>Anonymous User</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Your privacy is protected
        </Text>
      </View>

      {/* Settings */}
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <SettingRow
          icon="moon"
          label={t.darkMode}
          onPress={toggleTheme}
          color={colors.primary}
        />
        <SettingRow
          icon="language"
          label={t.language}
          onPress={toggleLanguage}
          color={colors.primary}
        />
        <SettingRow icon="notifications" label={t.notifications} color={colors.primary} />
      </View>

      {/* App Info */}
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <SettingRow icon="shield-checkmark" label={t.privacy} color={colors.primary} />
        <SettingRow
          icon="help-circle"
          label={t.help}
          onPress={() => Linking.openURL("tel:1166")}
          color={colors.primary}
        />
        <SettingRow icon="people" label={t.community} color={colors.primary} />
        <Text style={[styles.helpline, { color: colors.textSecondary }]}>{t.helpline}</Text>
        <SettingRow icon="information-circle" label={t.about} color={colors.primary} />
      </View>
    </View>
  );
}

/* ------------------ Setting Row ------------------ */
function SettingRow({
  icon,
  label,
  onPress,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  color?: string;
}) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={22} color={color || "#6B8F71"} />
        <Text style={styles.rowText}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#AAA" />
    </Pressable>
  );
}

/* ------------------ Styles ------------------ */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { alignItems: "center", marginBottom: 30 },
  avatar: { width: 72, height: 72, borderRadius: 36, alignItems: "center", justifyContent: "center", marginBottom: 10 },
  name: { fontSize: 18, fontWeight: "700" },
  subtitle: { fontSize: 13 },
  card: { borderRadius: 20, padding: 6, marginBottom: 18, elevation: 2 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 14 },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  rowText: { fontSize: 15 },
  helpline: { fontSize: 13, marginTop: 6 },
});

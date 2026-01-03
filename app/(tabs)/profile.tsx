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
        <View style={[styles.avatar, { backgroundColor: colors.surface }]}>
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
          iconColor={colors.primary}
          textColor={colors.textPrimary}
          chevronColor={colors.textSecondary}
        />
        <SettingRow
          icon="language"
          label={t.language}
          onPress={toggleLanguage}
          iconColor={colors.primary}
          textColor={colors.textPrimary}
          chevronColor={colors.textSecondary}
        />
        <SettingRow
          icon="notifications"
          label={t.notifications}
          iconColor={colors.primary}
          textColor={colors.textPrimary}
          chevronColor={colors.textSecondary}
        />
      </View>

      {/* App Info */}
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <SettingRow
          icon="shield-checkmark"
          label={t.privacy}
          iconColor={colors.primary}
          textColor={colors.textPrimary}
          chevronColor={colors.textSecondary}
        />
        <SettingRow
          icon="help-circle"
          label={t.help}
          onPress={() => Linking.openURL("tel:1166")}
          iconColor={colors.primary}
          textColor={colors.textPrimary}
          chevronColor={colors.textSecondary}
        />
        <SettingRow
          icon="people"
          label={t.community}
          iconColor={colors.primary}
          textColor={colors.textPrimary}
          chevronColor={colors.textSecondary}
        />
        <Text style={[styles.helpline, { color: colors.textSecondary }]}>{t.helpline}</Text>
        <SettingRow
          icon="information-circle"
          label={t.about}
          iconColor={colors.primary}
          textColor={colors.textPrimary}
          chevronColor={colors.textSecondary}
        />
      </View>
    </View>
  );
}

/* ------------------ Setting Row ------------------ */
function SettingRow({
  icon,
  label,
  onPress,
  iconColor,
  textColor,
  chevronColor,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  iconColor?: string;
  textColor?: string;
  chevronColor?: string;
}) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={22} color={iconColor} />
        <Text style={[styles.rowText, { color: textColor }]}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={chevronColor} />
    </Pressable>
  );
}

/* ------------------ Styles ------------------ */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { alignItems: "center", marginBottom: 30 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  name: { fontSize: 18, fontWeight: "700" },
  subtitle: { fontSize: 13 },
  card: { borderRadius: 20, padding: 6, marginBottom: 18, elevation: 2 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 14 },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  rowText: { fontSize: 15 },
  helpline: { fontSize: 13, marginTop: 6 },
});

import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAppSettings } from "../../context/AppSettingsContext";
import { Colors } from "../../constants/theme";

/* ------------------ Types ------------------ */
type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

/* ------------------ Bot Replies ------------------ */
const botResponses: string[] = [
  "I'm here to listen. Tell me more about how you're feeling.",
  "That sounds challenging. It's okay to feel this way.",
  "Try taking a slow, deep breath 🌿",
  "You're doing great by reaching out.",
  "Would you like to try a calming exercise together?",
];

/* ------------------ Texts for EN/UR ------------------ */
const texts = {
  en: {
    placeholder: "Share your thoughts...",
    companionTitle: "Companion",
    companionSubtitle: "Always here for you",
    initialMessage:
      "Hello! I'm here to support you. How are you feeling today? 🌿",
  },
  ur: {
    placeholder: "اپنے خیالات شیئر کریں...",
    companionTitle: "ساتھی",
    companionSubtitle: "ہمیشہ آپ کے ساتھ",
    initialMessage:
      "سلام! میں آپ کی مدد کے لیے یہاں ہوں۔ آج آپ کیسا محسوس کر رہے ہیں؟ 🌿",
  },
};

/* ------------------ Screen ------------------ */
export default function ChatScreen() {
  const { isDark, language } = useAppSettings();
  const t = texts[language];
  const colors = Colors[isDark ? "dark" : "light"];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t.initialMessage,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const emojis = ["😊", "😢", "😰", "😡", "❤️", "🙏", "💪", "🌟"];

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { borderBottomColor: isDark ? "#2E4038" : "#E0E0E0" },
        ]}
      >
        <View style={styles.headerLeft}>
          <View
            style={[styles.avatar, { backgroundColor: isDark ? "#1E2A24" : "#DDE8DF" }]}
          >
            <Text style={{ fontSize: 20 }}>🤗</Text>
          </View>
          <View>
            <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
              {t.companionTitle}
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
              {t.companionSubtitle}
            </Text>
          </View>
        </View>

        <Ionicons name="help-circle-outline" size={24} color={colors.primary} />
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messages}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.bubbleWrap,
              msg.sender === "user" ? styles.right : styles.left,
            ]}
          >
            <View
              style={[
                styles.bubble,
                {
                  backgroundColor:
                    msg.sender === "user" ? colors.primary : colors.surface,
                  borderWidth: msg.sender === "bot" ? 1 : 0,
                  borderColor: msg.sender === "bot" ? colors.border : "transparent",
                },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  { color: msg.sender === "user" ? colors.surface : colors.textPrimary },
                ]}
              >
                {msg.text}
              </Text>
              <Text style={[styles.time, { color: colors.textSecondary }]}>
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Emoji Picker */}
      {showEmoji && (
        <View
          style={[
            styles.emojiBar,
            { borderTopColor: colors.border, backgroundColor: colors.surface },
          ]}
        >
          {emojis.map((e) => (
            <Pressable key={e} onPress={() => setInput(input + e)}>
              <Text style={{ fontSize: 26 }}>{e}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Input Bar */}
      <View
        style={[
          styles.inputBar,
          { backgroundColor: colors.surface, borderTopColor: colors.border },
        ]}
      >
        <Ionicons name="camera-outline" size={26} color={colors.icon} />

        <Pressable onPress={() => setShowEmoji(!showEmoji)}>
          <Ionicons name="happy-outline" size={26} color={colors.icon} />
        </Pressable>

        <TextInput
          style={[
            styles.input,
            { backgroundColor: isDark ? "#1E2A24" : "#F2F4F1", color: colors.textPrimary },
          ]}
          placeholder={t.placeholder}
          placeholderTextColor={colors.textSecondary}
          value={input}
          onChangeText={setInput}
          multiline
        />

        <Ionicons name="mic-outline" size={26} color={colors.icon} />

        <Pressable
          style={[styles.send, { backgroundColor: colors.primary }]}
          onPress={sendMessage}
        >
          <Ionicons name="send" size={18} color={colors.surface} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

/* ------------------ Styles ------------------ */
const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 16, fontWeight: "600" },
  headerSubtitle: { fontSize: 12 },

  messages: { flex: 1, padding: 20 },

  bubbleWrap: { marginBottom: 14, maxWidth: "75%" },
  left: { alignSelf: "flex-start" },
  right: { alignSelf: "flex-end" },

  bubble: { padding: 14, borderRadius: 18 },

  text: { fontSize: 14 },
  time: { fontSize: 10, opacity: 0.6, marginTop: 4 },

  emojiBar: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 12,
    gap: 10,
    borderTopWidth: 1,
  },

  inputBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    fontSize: 14,
  },
  send: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
});

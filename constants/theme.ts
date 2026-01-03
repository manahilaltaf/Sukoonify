import { Platform } from 'react-native';

/** Tint colors */
const tintColorLight = '#5F8F72';
const tintColorDark = '#7DB89A';

/** GLOBAL COLORS FOR LIGHT / DARK MODE */
export const Colors = {
  light: {
    background: '#F4F7F5',        // main background
    surface: '#FFFFFF',            // cards, containers
    primary: tintColorLight,       // buttons, icons
    textPrimary: '#24352D',        // main text
    textSecondary: '#6B7F76',      // secondary text
    border: '#E0E6E3',

    // legacy fields
    text: '#11181C',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },

  dark: {
    background: '#121916',
    surface: '#1E2A24',
    primary: tintColorDark,
    textPrimary: '#E6F2EC',
    textSecondary: '#9FBDB0',
    border: '#2E4038',

    // legacy fields
    text: '#ECEDEE',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

/** FONT FAMILY */
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

/* PALETTE HEX */
export const prussianBlue = 'rgba(30, 47, 68, 1)';
export const antiflashWhite = 'rgba(244, 248, 251, 1)';
export const prussianBlue2 = 'rgba(21, 43, 67, 1)';
export const amaranthPurple = 'rgba(166, 35, 65, 1)';
export const paynesGray = 'rgba(86, 108, 135, 1)';

/* Gradient */
export const gradientTop = `linear-gradient(0deg, ${prussianBlue}, ${antiflashWhite}, ${prussianBlue2}, ${amaranthPurple}, ${paynesGray}`;
export const gradientRight = `linear-gradient(90deg, ${prussianBlue}, ${antiflashWhite}, ${prussianBlue2}, ${amaranthPurple}, ${paynesGray}`;
export const gradientBottom = `linear-gradient(180deg, ${prussianBlue}, ${antiflashWhite}, ${prussianBlue2}, ${amaranthPurple}, ${paynesGray}`;
export const gradientLeft = `linear-gradient(270deg, ${prussianBlue}, ${antiflashWhite}, ${prussianBlue2}, ${amaranthPurple}, ${paynesGray}`;
export const gradientTopRight = `linear-gradient(45deg, ${prussianBlue}, ${antiflashWhite}, ${prussianBlue2}, ${amaranthPurple}, ${paynesGray}`;
export const gradientBottomRight = `linear-gradient(135deg, ${prussianBlue}, ${antiflashWhite}, ${prussianBlue2}, ${amaranthPurple}, ${paynesGray}`;
export const gradientTopLeft = `linear-gradient(225deg, ${prussianBlue}, ${antiflashWhite}, ${prussianBlue2}, ${amaranthPurple}, ${paynesGray}`;
export const gradientBottomLeft = `linear-gradient(315deg, ${prussianBlue}, ${antiflashWhite}, ${prussianBlue2}, ${amaranthPurple}, ${paynesGray}`;
export const gradientRadial = `radial-gradient(${prussianBlue}, ${antiflashWhite}, ${prussianBlue2}, ${amaranthPurple}, ${paynesGray}`;

export const Colors = {
  primary: prussianBlue,
  secondary: antiflashWhite,
  ternary: prussianBlue2,
  accent1: amaranthPurple,
  accent2: paynesGray,
};

export const ThemeColors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

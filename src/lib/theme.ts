// constants/theme.ts
// Unchanged from your design system — every screen below reads from here,
// nothing is hardcoded.

export const radius = {
  sm: 6,
  md: 8,
  lg: 10,
  xl: 14,
  '2xl': 18,
  '3xl': 22,
  '4xl': 26,
} as const;

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  // added for the helpdesk flow's "resolved" state — your palette had
  // no success color, everything else below maps to existing tokens
  success: string;
  successForeground: string;
}

export const lightTheme: ThemeColors = {
  background: '#FAF3EA',
  foreground: '#2B1B12',
  card: '#FFFDF9',
  cardForeground: '#2B1B12',
  popover: '#FFFDF9',
  popoverForeground: '#2B1B12',
  primary: '#6F4E37',
  primaryForeground: '#FFFDF9',
  secondary: '#E8D9C5',
  secondaryForeground: '#4B3621',
  muted: '#F0E6DA',
  mutedForeground: '#8B6F52',
  accent: '#C08552',
  accentForeground: '#2B1B12',
  destructive: '#DC2626',
  border: '#E0D0BC',
  input: '#E0D0BC',
  ring: '#6F4E37',
  chart1: '#6F4E37',
  chart2: '#A67B5B',
  chart3: '#C08552',
  chart4: '#8B6F52',
  chart5: '#4B3621',
  success: '#2F9E5B',
  successForeground: '#FFFDF9',
} as const;

export const darkTheme: ThemeColors = {
  background: '#12141C',
  foreground: '#FAFAF7',
  card: '#191C26',
  cardForeground: '#FAFAF7',
  popover: '#191C26',
  popoverForeground: '#FAFAF7',
  primary: '#D8A44D',
  primaryForeground: '#191C26',
  secondary: '#232735',
  secondaryForeground: '#FAFAF7',
  muted: '#232735',
  mutedForeground: '#BCBEC7',
  accent: '#D8A44D',
  accentForeground: '#191C26',
  destructive: '#E35B4F',
  border: 'rgba(255,255,255,0.1)',
  input: 'rgba(255,255,255,0.15)',
  ring: '#D8A44D',
  chart1: '#DEDEDE',
  chart2: '#8E8E8E',
  chart3: '#707070',
  chart4: '#5E5E5E',
  chart5: '#434343',
  success: '#34D399',
  successForeground: '#0B3B2A',
} as const;

export const theme = {
  light: lightTheme,
  dark: darkTheme,
  radius,
} as const;

export type ThemeMode = 'light' | 'dark';

export default theme;
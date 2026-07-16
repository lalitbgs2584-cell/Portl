
export const radius = {
  sm: 6,   // calc(radius * 0.6)
  md: 8,   // calc(radius * 0.8)
  lg: 10,  // base radius (0.625rem ≈ 10px)
  xl: 14,  // calc(radius * 1.4)
  '2xl': 18,
  '3xl': 22,
  '4xl': 26,
} as const;

export interface ThemeColors{
    background:string;
    foreground:string;
    card:string;
    cardForeground:string;
    popover:string;
    popoverForeground:string;
    primary:string;
    primaryForeground:string;
    secondary:string;
    secondaryForeground:string;
    muted:string;
    mutedForeground:string;
    accent:string;
    accentForeground:string;
    destructive:string;
    border:string;
    input:string;
    ring:string;
    chart1:string;
    chart2:string;
    chart3:string;
    chart4:string;
    chart5:string;

}
export const lightTheme: ThemeColors = {
  // Warm ivory canvas — not pure white, feels premium and warm
  background: '#FFFBF2',
  foreground: '#1C1007',

  // White cards pop against the warm background
  card: '#FFFFFF',
  cardForeground: '#1C1007',

  popover: '#FFFFFF',
  popoverForeground: '#1C1007',

  // Rich deep amber — brand continuity with the dark gold
  primary: '#B45309',
  primaryForeground: '#FFFFFF',

  // Soft amber tint for secondary surfaces
  secondary: '#FEF3C7',
  secondaryForeground: '#78340F',

  muted: '#FEF3C7',
  mutedForeground: '#92400E',

  accent: '#F59E0B',
  accentForeground: '#1C1007',

  destructive: '#DC2626',

  // Warm amber-tinted borders
  border: '#FDE68A',
  input: '#FDE68A',
  ring: '#B45309',

  chart1: '#F59E0B',
  chart2: '#D97706',
  chart3: '#B45309',
  chart4: '#92400E',
  chart5: '#78340F',
} as const;

export const darkTheme = {
  background: '#12141C',
  foreground: '#FAFAF7',

  card: '#191C26',
  cardForeground: '#FAFAF7',

  popover: '#191C26',
  popoverForeground: '#FAFAF7',

  // gold/amber accent — main brand color
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
} as const;


export const theme = {
  light: lightTheme,
  dark: darkTheme,
  radius,
} as const;

export type ThemeMode = 'light' | 'dark';

export default theme;
import theme, { ThemeColors } from '@/lib/theme';
import { useColorScheme } from 'react-native';


export function useTheme(): { colors: ThemeColors; radius: typeof theme.radius; mode: 'light' | 'dark' } {
  const scheme = useColorScheme();
  const mode = scheme === 'dark' ? 'dark' : 'light';

  return {
    colors: theme[mode],
    radius: theme.radius,
    mode,
  };
}
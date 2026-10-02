import { Platform } from 'react-native';

export const colors = {
  navy: '#06254F',
  navySoft: '#0B356B',
  warmWhite: '#FAFBFD',
  white: '#FFFFFF',
  amber: '#FFB000',
  amberPressed: '#E99F00',
  sky: '#D6E8F7',
  skyLight: '#EEF6FC',
  skyMap: '#E4F1FB',
  avatarWarm: '#FFF1D8',
  gray: '#E9EDF3',
  charcoal: '#101820',
  textMuted: '#5E6B7C',
  textTertiary: '#8390A2',
  textInverseMuted: '#DCE7F5',
  info: '#1769AA',
  success: '#16794B',
  danger: '#B42318',
  borderSoft: 'rgba(6, 37, 79, 0.10)',
  borderStrong: 'rgba(6, 37, 79, 0.22)',
  navyTranslucent: 'rgba(6, 37, 79, 0.94)',
} as const;

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const radius = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  pill: 999,
} as const;

export const typography = {
  ui: Platform.select({ ios: 'System', android: 'sans-serif', default: 'system-ui' }),
  display: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' }),
  mono: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
} as const;

export const shadows = {
  card: Platform.select({
    web: { boxShadow: '0 8px 24px rgba(6, 37, 79, 0.08)' },
    default: {
      shadowColor: colors.navy,
      shadowOpacity: 0.08,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
      elevation: 2,
    },
  }),
  floating: Platform.select({
    web: { boxShadow: '0 14px 36px rgba(6, 37, 79, 0.16)' },
    default: {
      shadowColor: colors.navy,
      shadowOpacity: 0.16,
      shadowRadius: 22,
      shadowOffset: { width: 0, height: 12 },
      elevation: 8,
    },
  }),
} as const;

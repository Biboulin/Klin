// KLIN Color Palette
// Minimal aesthetic: Cream/White + Sage Green + Pastels

export const Colors = {
  // Neutrals
  white: '#FFFFFF',
  cream: '#FFFBF5',
  lightGray: '#F5F5F5',
  gray: '#E8E8E8',
  darkGray: '#A8A8A8',
  charcoal: '#3A3A3A',
  black: '#1A1A1A',

  // Primary (Sage Green)
  primary: '#7C9B7E', // Sage green
  primaryLight: '#B8D4B8',
  primaryDark: '#5A7A5C',

  // Accent colors (Pastels)
  success: '#A8D5BA', // Soft green
  warning: '#F4D4A8', // Soft yellow
  danger: '#F4A8A8', // Soft red
  info: '#A8C8D4', // Soft blue

  // Semantic
  background: '#FFFBF5',
  surface: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#666666',
  border: '#E8E8E8',
  disabled: '#D0D0D0',
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
};

// KLIN Typography System
// Clean, minimal, readable

export const Typography = {
  // Font families
  fontFamily: {
    default: 'System', // Uses native font stack (San Francisco on iOS, Roboto on Android)
    mono: 'Menlo',
  },

  // Font sizes
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
  },

  // Font weights
  weights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Predefined text styles
export const TextStyles = {
  // Headings
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 1.2,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 1.2,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 1.3,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 1.4,
  },

  // Body
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 1.5,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 1.5,
  },
  bodyXs: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 1.5,
  },

  // Labels & Buttons
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 1.4,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 1.4,
  },

  // Captions
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 1.4,
  },
};

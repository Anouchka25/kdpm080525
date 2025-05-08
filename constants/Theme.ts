import { StyleSheet } from 'react-native';
import Colors from './Colors';

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  h1: 32,
  h2: 28,
  h3: 24,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 50,
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  safeArea: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    padding: SPACING.md,
  },
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZE.md,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.lg,
  },
  buttonText: {
    fontSize: FONT_SIZE.md,
    fontFamily: 'Poppins-Medium',
  },
  heading1: {
    fontSize: FONT_SIZE.h1,
    fontFamily: 'Poppins-Bold',
    color: Colors.neutral[900],
  },
  heading2: {
    fontSize: FONT_SIZE.h2,
    fontFamily: 'Poppins-Bold',
    color: Colors.neutral[900],
  },
  heading3: {
    fontSize: FONT_SIZE.h3,
    fontFamily: 'Poppins-Bold',
    color: Colors.neutral[900],
  },
  text: {
    fontSize: FONT_SIZE.md,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral[700],
  },
  caption: {
    fontSize: FONT_SIZE.sm,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral[500],
  },
});

export default {
  Colors,
  SPACING,
  FONT_SIZE,
  BORDER_RADIUS,
  GlobalStyles,
};
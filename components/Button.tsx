import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import Colors from '@/constants/Colors';
import { BORDER_RADIUS, SPACING } from '@/constants/Theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  variant = 'primary',
  loading = false,
  icon,
  fullWidth = false,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const getButtonStyles = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return styles.primaryButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return styles.outlineButton;
      case 'ghost':
        return styles.ghostButton;
      case 'danger':
        return styles.dangerButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyles = (): TextStyle => {
    switch (variant) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      case 'ghost':
        return styles.ghostText;
      case 'danger':
        return styles.dangerText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyles(),
        fullWidth && styles.fullWidth,
        style,
      ]}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'ghost' ? Colors.primary[500] : Colors.white} 
        />
      ) : (
        <>
          {icon && icon}
          <Text 
            style={[
              styles.text, 
              getTextStyles(),
              icon && { marginLeft: SPACING.sm },
              textStyle
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    minHeight: 48,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  // Primary
  primaryButton: {
    backgroundColor: Colors.primary[500],
  },
  primaryText: {
    color: Colors.white,
  },
  // Secondary
  secondaryButton: {
    backgroundColor: Colors.secondary[500],
  },
  secondaryText: {
    color: Colors.neutral[800],
  },
  // Outline
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary[500],
  },
  outlineText: {
    color: Colors.primary[500],
  },
  // Ghost
  ghostButton: {
    backgroundColor: 'transparent',
  },
  ghostText: {
    color: Colors.primary[500],
  },
  // Danger
  dangerButton: {
    backgroundColor: Colors.error[500],
  },
  dangerText: {
    color: Colors.white,
  },
});
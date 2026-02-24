import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { Colors } from '../constants';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const variantStyles = {
    primary: {
      backgroundColor: Colors.primary,
      borderColor: Colors.primary,
    },
    secondary: {
      backgroundColor: Colors.surface,
      borderColor: Colors.border,
    },
    danger: {
      backgroundColor: Colors.danger,
      borderColor: Colors.danger,
    },
  };

  const sizeStyles = {
    sm: {
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    md: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    lg: {
      paddingVertical: 14,
      paddingHorizontal: 16,
    },
  };

  const textColor = {
    primary: Colors.white,
    secondary: Colors.text,
    danger: Colors.white,
  };

  const textSizes = {
    sm: 14,
    md: 14,
    lg: 16,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        variantStyles[variant],
        sizeStyles[size],
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={textColor[variant]} size="small" />
      ) : (
        <>
          {icon && icon}
          <Text
            style={[
              {
                color: textColor[variant],
                fontSize: textSizes[size],
                fontWeight: '600',
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    minHeight: 48,
  },
  disabled: {
    opacity: 0.5,
  },
});

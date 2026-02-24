import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { Colors, TextStyles } from '../constants';

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
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    md: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    lg: {
      paddingVertical: 16,
      paddingHorizontal: 20,
    },
  };

  const textColor = {
    primary: Colors.white,
    secondary: Colors.text,
    danger: Colors.white,
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
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={textColor[variant]} />
      ) : (
        <>
          {icon && icon}
          <Text
            style={[
              TextStyles.button,
              { color: textColor[variant] },
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
  },
  disabled: {
    opacity: 0.5,
  },
});

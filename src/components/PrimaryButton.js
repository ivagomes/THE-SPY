import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        variant === 'secondary' && styles.secondaryButton,
        variant === 'danger' && styles.dangerButton,
        disabled && styles.disabledButton,
        style,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          variant === 'secondary' && styles.secondaryButtonText,
          disabled && styles.disabledButtonText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E63946',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  dangerButton: {
    backgroundColor: '#DC2626',
  },
  disabledButton: {
    backgroundColor: '#334155',
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  secondaryButtonText: {
    color: '#E2E8F0',
  },
  disabledButtonText: {
    color: '#94A3B8',
  },
});

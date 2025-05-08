import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { BORDER_RADIUS } from '@/constants/Theme';

interface PhoneInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function PhoneInput({ value, onChangeText, style, ...props }: PhoneInputProps) {
  const handleChangeText = (text: string) => {
    // Remove any non-numeric characters
    const numericText = text.replace(/[^0-9+]/g, '');
    onChangeText(numericText);
  };

  return (
    <TextInput
      value={value}
      onChangeText={handleChangeText}
      style={[styles.input, style]}
      keyboardType="phone-pad"
      placeholder="Numéro de téléphone"
      placeholderTextColor={Colors.neutral[400]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: Colors.neutral[50],
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.neutral[900],
  },
});
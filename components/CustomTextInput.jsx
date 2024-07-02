import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({ placeholder, value, onChangeText, secureTextEntry, keyboardType, style }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
  },
});

export default CustomTextInput;

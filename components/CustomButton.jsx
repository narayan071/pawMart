import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const CustomButton = ({ title, color = 'primary', size = 'medium', icon, onPress }) => {
  const backgroundColor = color === 'primary' ? '#A0522D' : '#000';
  const fontSize = size === 'large' ? 20 : size === 'small' ? 14 : 18;
  const paddingVertical = size === 'large' ? 14 : size === 'small' ? 8 : 10;

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor, paddingVertical }]} onPress={onPress}>
      {icon && <Ionicons name={icon} size={fontSize} color="white" style={styles.icon} />}
      <Text style={[styles.buttonText, { fontSize }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 10,
    width: 135,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  icon: {
    marginRight: 8,
  },
});

export default CustomButton;

import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import CustomButton from '../../components/CustomButton';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    navigation.navigate('Login');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground 
          source={require('../../assets/pet-bg.jpg')} 
          style={styles.background}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Signup</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={setName}
              value={name}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry
            />
            <CustomButton
              title="Signup"
              color='primary'
              size='medium'
              onPress={handleRegister}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.registerText}>Member already? Login here</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  contentContainer: {
    alignItems: 'center',
    marginEnd: 20,
    width: '60%',
  },
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
  title: {
    fontWeight: '800',
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
  },
  registerText: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Signup;

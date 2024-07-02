import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, router } from 'expo-router';
import CustomButton from '../../components/CustomButton';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    router.push('/Home');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground 
          source={require('../../assets/pet-bg.jpg')} 
          style={styles.background}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <CustomButton
              title="Login"
              color='primary'
              size='medium'
              onPress={handleLogin}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.registerText}>New user? Register here</Text>
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

export default Login;

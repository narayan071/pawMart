import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native'; 
import { Link, router, Redirect } from 'expo-router';

export default function Landing() {
  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground 
          source={require('../assets/pet-bg.jpg')} 
          style={styles.background}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.title}>pawMart</Text>
            <CustomButton 
              title="Login" 
              color="primary" 
              size="medium" 
              onPress={() => router.push('/Login')} 
            />
            <CustomButton 
              title="Signup" 
              color="secondary" 
              size="medium" 
              onPress={() => router.push('/Signup')} 
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

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
  },
  title: {
    fontWeight: '800',
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
  },
});

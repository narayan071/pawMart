import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login"  />
      <Stack.Screen name="Signup" />
    </Stack>
  );
};

export default AuthLayout;

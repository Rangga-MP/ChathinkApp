// Bungkam peringatan (jika belum ada)
(global as any).RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import OnboardingScreen from './OnboardingScreen';
import AuthScreen from './AuthScreen'; 
import HomeScreen from './HomeScreen'; 
import { RootStackParamList } from './types'; 

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null; // atau tampilkan splash screen

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // Jika pengguna sudah login, langsung ke halaman Home
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }}
            initialParams={{ userId: user.uid }}
          />
        ) : (
          // Jika belum login, tampilkan alur Onboarding -> Auth
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Auth" component={AuthScreen} options={{ title: 'Authentication' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

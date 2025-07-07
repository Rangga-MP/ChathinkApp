    import React from 'react';
    import { NavigationContainer } from '@react-navigation/native';
    import { createNativeStackNavigator } from '@react-navigation/native-stack';

    import OnboardingScreen from './OnboardingScreen';
    import VerificationScreen from './VerificationScreen';
    import OtpScreen from './OtpScreen';
    import { RootStackParamList } from './types'; 

    const Stack = createNativeStackNavigator<RootStackParamList>();

    export default function App() {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Onboarding">
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Verification" component={VerificationScreen} options={{ title: '' }} />
            <Stack.Screen name="Otp" component={OtpScreen} options={{ title: 'Enter Verification Code' }} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    
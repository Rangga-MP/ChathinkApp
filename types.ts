import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

// Mendefinisikan parameter yang akan dikirim antar halaman
export type RootStackParamList = {
  Onboarding: undefined;
  Verification: undefined;
  // Ganti parameter menjadi objek 'confirmation'
  Otp: { confirmation: FirebaseAuthTypes.ConfirmationResult }; 
};

// Mengekspor tipe props untuk setiap halaman
export type OnboardingScreenProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;
export type VerificationScreenProps = NativeStackScreenProps<RootStackParamList, 'Verification'>;
export type OtpScreenProps = NativeStackScreenProps<RootStackParamList, 'Otp'>;

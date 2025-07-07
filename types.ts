import type { NativeStackScreenProps } from '@react-navigation/native-stack';
// Impor tipe data dari pustaka yang benar
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

// Mendefinisikan parameter yang akan dikirim antar halaman
export type RootStackParamList = {
  Onboarding: undefined;
  Verification: undefined;
  // Saat menggunakan RNF, kita mengirim objek 'confirmation' ke halaman OTP
  Otp: { confirmation: FirebaseAuthTypes.ConfirmationResult }; 
};

// Mengekspor tipe props untuk setiap halaman
export type OnboardingScreenProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;
export type VerificationScreenProps = NativeStackScreenProps<RootStackParamList, 'Verification'>;
export type OtpScreenProps = NativeStackScreenProps<RootStackParamList, 'Otp'>;

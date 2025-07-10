import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Mendefinisikan parameter yang akan dikirim antar halaman
export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined; // Halaman Auth tidak memerlukan parameter
  Home: { userId: string }; // Halaman Home memerlukan userId sebagai string
};

// Mengekspor tipe props untuk setiap halaman
export type OnboardingScreenProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;
export type AuthScreenProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

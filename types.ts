import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Mendefinisikan parameter yang akan dikirim antar halaman
export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  // Home sekarang menerima uid dan unicode
  Home: { userId: string; unicode: string; }; 
};

// Mengekspor tipe props untuk setiap halaman
export type OnboardingScreenProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;
export type AuthScreenProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

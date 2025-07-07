import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, StatusBar, ImageSourcePropType, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { OnboardingScreenProps } from './types'; // <-- Impor tipe dari types.ts

// Gunakan tipe OnboardingScreenProps untuk mendapatkan 'navigation'
const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>What's up</Text>
          <Image
            source={require('./assets/dating-app.png') as ImageSourcePropType}
            style={styles.illustration}
          />
          <Text style={styles.subtitle}>
            Let's talk with your friends and family wherever and whenever
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          {/* PERUBAHAN DI SINI: Ganti alert dengan navigation.navigate */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Verification')}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.phoneButton]} onPress={() => navigation.navigate('Onboarding')}>
            <Text style={styles.buttonText}>Continue with phone</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Definisi tipe Styles Anda (sudah benar)
interface Styles {
  safeArea: ViewStyle;
  container: ViewStyle;
  content: ViewStyle;
  title: TextStyle;
  illustration: ImageStyle;
  subtitle: TextStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  phoneButton: ViewStyle;
  buttonText: TextStyle;
}

// Kode styles Anda (sudah benar)
const styles = StyleSheet.create<Styles>({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 40 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' },
  title: { fontSize: 34, fontWeight: 'bold', color: '#000', marginBottom: 40 },
  illustration: { width: 300, height: 250, resizeMode: 'contain', marginBottom: 40 },
  subtitle: { fontSize: 18, color: '#6c6c6c', textAlign: 'center', paddingHorizontal: 20 },
  buttonContainer: { width: '100%', paddingHorizontal: 20 },
  button: { backgroundColor: '#1c1c1e', paddingVertical: 18, borderRadius: 30, alignItems: 'center', marginBottom: 15 },
  phoneButton: {},
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default OnboardingScreen;

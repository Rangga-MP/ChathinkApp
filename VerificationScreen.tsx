import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert, ViewStyle, TextStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
// Impor dari 'firebase/auth' standar, bukan 'react-native'
import { PhoneAuthProvider, RecaptchaVerifier } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { VerificationScreenProps } from './types';

const VerificationScreen: React.FC<VerificationScreenProps> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  // Ref untuk menyimpan instance verifier
  const recaptchaVerifier = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    // Membuat instance RecaptchaVerifier saat komponen dimuat.
    // 'recaptcha-container' adalah ID elemen DOM yang akan dibuat oleh Firebase secara virtual.
    try {
      recaptchaVerifier.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
      });
    } catch (error) {
      console.error("Error creating RecaptchaVerifier:", error);
    }
  }, []);

  const sendVerificationCode = async () => {
    if (!recaptchaVerifier.current) {
      Alert.alert("Error", "reCAPTCHA verifier belum siap.");
      return;
    }
    setLoading(true);
    const fullPhoneNumber = `+62${phoneNumber}`;

    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        fullPhoneNumber,
        recaptchaVerifier.current
      );
      
      setLoading(false);
      navigation.navigate('Otp', { verificationId });

    } catch (err: any) {
      setLoading(false);
      Alert.alert("Error", `Terjadi kesalahan: ${err.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Wadah reCAPTCHA yang tidak terlihat oleh pengguna */}
      <View id="recaptcha-container" />
      
      <View style={styles.container}>
        <Text style={styles.title}>Enter your phone number</Text>
        <Text style={styles.subtitle}>Please confirm your region and enter your phone number</Text>
        <View style={styles.inputContainer}>
          <Feather name="globe" size={24} color="black" />
          <Text style={styles.regionText}>Indonesia (+62)</Text>
        </View>
        <View style={styles.inputContainer}>
          <Feather name="phone" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Nomor Telepon"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            autoFocus
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={sendVerificationCode} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Mengirim...' : 'Continue'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ... (kode styles tetap sama)
interface Styles {
  safeArea: ViewStyle;
  container: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  inputContainer: ViewStyle;
  regionText: TextStyle;
  input: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 30, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#6c6c6c', textAlign: 'center', marginBottom: 40 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 30, paddingHorizontal: 20, paddingVertical: 15, marginBottom: 20 },
  regionText: { marginLeft: 10, fontSize: 16, color: '#000' },
  input: { flex: 1, marginLeft: 10, fontSize: 16, color: '#000' },
  button: { backgroundColor: '#1c1c1e', paddingVertical: 18, borderRadius: 30, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default VerificationScreen;

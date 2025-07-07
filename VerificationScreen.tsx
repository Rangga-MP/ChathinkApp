import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert, ViewStyle, TextStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
// Impor dari pustaka yang benar, tidak ada lagi RecaptchaVerifier
import auth from '@react-native-firebase/auth';
import { VerificationScreenProps } from './types';

const VerificationScreen: React.FC<VerificationScreenProps> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const sendVerificationCode = async () => {
    if (phoneNumber.length < 9) {
      Alert.alert("Nomor Tidak Valid", "Silakan masukkan nomor telepon yang valid.");
      return;
    }
    setLoading(true);
    const fullPhoneNumber = `+62${phoneNumber}`;

    try {
      // Sintaks dari React Native Firebase, jauh lebih sederhana!
      const confirmation = await auth().signInWithPhoneNumber(fullPhoneNumber);
      
      setLoading(false);
      // Kirim objek 'confirmation' ke halaman Otp
      navigation.navigate('Otp', { confirmation });

    } catch (err: any) {
      setLoading(false);
      Alert.alert("Error", `Terjadi kesalahan: ${err.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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

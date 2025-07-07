import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert, ViewStyle, TextStyle } from 'react-native';
import { OtpScreenProps } from './types';

const OtpScreen: React.FC<OtpScreenProps> = ({ route, navigation }) => {
  // Ambil objek confirmation dari parameter route
  const { confirmation } = route.params;
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const verifyOtpCode = async () => {
    if (otp.length !== 6) {
      Alert.alert("Kode Tidak Valid", "OTP harus terdiri dari 6 digit.");
      return;
    }
    setLoading(true);
    try {
      // Gunakan objek konfirmasi untuk memverifikasi kode
      await confirmation.confirm(otp);
      setLoading(false);
      Alert.alert("Sukses!", "Nomor telepon berhasil diverifikasi.");
      // Nanti bisa navigasi ke halaman utama aplikasi
    } catch (error) {
      setLoading(false);
      Alert.alert("Verifikasi Gagal", "Kode OTP yang Anda masukkan salah.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>
          Kami telah mengirimkan kode OTP ke nomor Anda.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="------"
          placeholderTextColor="#ccc"
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
          maxLength={6}
          autoFocus
        />
        <TouchableOpacity style={styles.button} onPress={verifyOtpCode} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Memverifikasi...' : 'Verify'}</Text>
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
  input: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 30, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#6c6c6c', textAlign: 'center', marginBottom: 40 },
  input: { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 10, padding: 15, fontSize: 22, textAlign: 'center', letterSpacing: 10 },
  button: { backgroundColor: '#1c1c1e', paddingVertical: 18, borderRadius: 30, alignItems: 'center', marginTop: 40 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default OtpScreen;

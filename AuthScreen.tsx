import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert, ViewStyle, TextStyle } from 'react-native';
// Impor fungsi-fungsi dari React Native Firebase Auth
import auth from '@react-native-firebase/auth';
import { AuthScreenProps } from './types'; // Kita akan buat tipe ini nanti

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Fungsi untuk menangani registrasi pengguna baru
  const handleRegister = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Email dan password tidak boleh kosong.');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      Alert.alert('Registrasi Berhasil!', `Akun Anda telah dibuat. UID Anda: ${user.uid}`);
      // Navigasi ke Home dengan membawa UID
      navigation.replace('Home', { userId: user.uid });
    } catch (error: any) {
      // Menampilkan pesan error yang lebih ramah
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Gagal', 'Alamat email ini sudah terdaftar.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Gagal', 'Password terlalu lemah, minimal 6 karakter.');
      } else {
        Alert.alert('Gagal', error.message);
      }
    }
    setLoading(false);
  };

  // Fungsi untuk menangani login pengguna yang sudah ada
  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Email dan password tidak boleh kosong.');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      // Di sini kita mendapatkan UID pengguna yang sudah ada
      console.log('Login berhasil, UID:', user.uid);
      // Navigasi ke Home dengan membawa UID
      navigation.replace('Home', { userId: user.uid });
    } catch (error: any) {
      Alert.alert('Gagal', 'Email atau password salah.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Register or login to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? '...' : 'Register'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleLogin} disabled={loading}>
          <Text style={[styles.buttonText, styles.loginButtonText]}>{loading ? '...' : 'Login'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ... (kode styles)
interface Styles {
  safeArea: ViewStyle;
  container: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  input: TextStyle; // FIX: Changed from ViewStyle to TextStyle
  button: ViewStyle;
  buttonText: TextStyle;
  loginButton: ViewStyle;
  loginButtonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 30, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#6c6c6c', textAlign: 'center', marginBottom: 40 },
  // This line is now valid because 'input' is typed as TextStyle
  input: { height: 50, borderColor: '#e0e0e0', borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#1c1c1e', paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  loginButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#1c1c1e', marginTop: 10 },
  loginButtonText: { color: '#1c1c1e' },
});

export default AuthScreen;

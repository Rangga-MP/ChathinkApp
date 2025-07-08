import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ViewStyle,
  TextStyle,
} from 'react-native';
// Firebase Auth & Firestore
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// Tipe navigasi
import { AuthScreenProps } from './types';

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Fungsi untuk generate kode 6 digit random
  const generateUnicode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Handler registrasi
  const handleRegister = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Email dan password tidak boleh kosong.');
      return;
    }
    setLoading(true);
    try {
      // 1. Buat user di Firebase Auth
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // 2. Generate kode unicode
      const newUserUnicode = generateUnicode();

      // 3. Simpan ke Firestore
      await firestore().collection('users').doc(user.uid).set({
        email: user.email,
        unicode: newUserUnicode,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Registrasi Berhasil!', `Akun Anda telah dibuat. Unicode Anda: ${newUserUnicode}`);
      navigation.replace('Home', { userId: user.uid, unicode: newUserUnicode });

    } catch (error: any) {
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

  // Handler login
  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Email dan password tidak boleh kosong.');
      return;
    }
    setLoading(true);
    try {
      // 1. Login via Auth
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // 2. Ambil data dari Firestore
      const userDocument = await firestore().collection('users').doc(user.uid).get();

      // 3. Cek eksistensi dokumen dengan memanggil exists()
      if (userDocument.exists()) {
        const userData = userDocument.data();
        const userUnicode = userData?.unicode ?? 'N/A';
        navigation.replace('Home', { userId: user.uid, unicode: userUnicode });
      } else {
        Alert.alert('Error', 'Data pengguna tidak ditemukan.');
      }

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

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? '...' : 'Register'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={[styles.buttonText, styles.loginButtonText]}>
            {loading ? '...' : 'Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Definisi tipe style
interface Styles {
  safeArea: ViewStyle;
  container: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  input: TextStyle;           // menggunakan TextStyle agar fontSize valid
  button: ViewStyle;
  buttonText: TextStyle;
  loginButton: ViewStyle;
  loginButtonText: TextStyle;
}

// StyleSheet
const styles = StyleSheet.create<Styles>({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c6c6c',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,  // valid karena TextStyle
  },
  button: {
    backgroundColor: '#1c1c1e',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1c1c1e',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#1c1c1e',
  },
});

export default AuthScreen;

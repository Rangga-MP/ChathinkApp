import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { HomeScreenProps } from './types';

const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
  // Ambil userId yang kita kirim dari AuthScreen
  const { userId } = route.params;

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        // Ganti navigasi ke Onboarding setelah logout berhasil
        navigation.replace('Onboarding');
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Login Berhasil!</Text>
        <Text style={styles.subtitle}>Unique ID (UID) Anda adalah:</Text>
        <Text style={styles.uidText}>{userId}</Text>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  uidText: {
    fontSize: 12,
    color: '#333',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    fontFamily: 'monospace', // Agar mudah dibaca
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#ff3b30',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;

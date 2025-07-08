import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { HomeScreenProps } from './types';

const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
  const { userId, unicode } = route.params;

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.replace('Onboarding');
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Login Berhasil!</Text>
        
        <Text style={styles.subtitle}>Unicode (ID Publik) Anda:</Text>
        <Text style={styles.unicodeText}>{unicode}</Text>

        <Text style={styles.subtitle}>Firebase UID (ID Internal):</Text>
        <Text style={styles.uidText}>{userId}</Text>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  subtitle: { fontSize: 16, color: 'gray', marginTop: 20 },
  unicodeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c1c1e',
    backgroundColor: '#e8f0fe',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 5,
  },
  uidText: { fontSize: 12, color: '#333', backgroundColor: '#f0f0f0', padding: 10, borderRadius: 5, fontFamily: 'monospace', marginTop: 5, marginBottom: 40 },
  button: { backgroundColor: '#ff3b30', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default HomeScreen;

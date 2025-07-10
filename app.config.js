// app.config.js
module.exports = ({ config }) => ({
  ...config,
  plugins: [
    [
      "@react-native-firebase/app",
      {
        modules: ["auth", "firestore"]
      }
    ]
  ],
  // Untuk Android, link file google-services.json
  android: {
    ...config.android,
    googleServicesFile: "./google-services.json"
  }
  // kita tidak perlu menyentuh `ios` di sini
});

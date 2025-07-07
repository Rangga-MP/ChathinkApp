    // Learn more https://docs.expo.dev/guides/customizing-metro
    const { getDefaultConfig } = require('expo/metro-config');

    /** @type {import('expo/metro-config').MetroConfig} */
    const config = getDefaultConfig(__dirname);

    // Ini adalah baris yang memperbaiki error 'Cannot find module'
    config.resolver.sourceExts.push('cjs');

    module.exports = config;
    
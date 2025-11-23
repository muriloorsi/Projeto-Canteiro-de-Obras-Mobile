const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Desabilita a funcionalidade experimental de resolução de pacotes
config.resolver.unstable_enablePackageExports = false;

// Adiciona 'cjs' às extensões de origem
config.resolver.sourceExts.push('cjs');

module.exports = config;

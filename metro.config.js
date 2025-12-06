const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// Build a Metro config that supports importing .svg as React components
// using react-native-svg-transformer and also integrates nativewind.
const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...(config.resolver.sourceExts || []), 'svg'],
};

module.exports = withNativeWind(config, { input: './global.css' });

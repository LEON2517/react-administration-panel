import deepmerge from 'deepmerge';
import wcBaseConfig from '../webpack/baseConfig';

module.exports = (storybookBaseConfig) => {
  const nextRules = wcBaseConfig.module.rules;
  
  nextRules.shift();

  let nextConfig = {
    resolveLoader: {
      moduleExtensions: ['-loader'],
    },
    resolve: wcBaseConfig.resolve,
  };

  nextConfig = deepmerge(storybookBaseConfig, nextConfig);
  nextConfig.module.rules.push(...nextRules);
  nextConfig.plugins = storybookBaseConfig.plugins;
  return nextConfig;
};

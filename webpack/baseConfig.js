import path from 'path';
import ENV from './env';
import allLoaders from './allLoaders';
import plugins from './plugins';
import modulesDirectories from './modulesDirectories';
import pack from './package';

const {
  NODE_ENV,
  PWD,
  BUILD_DIR,
  DEV_PORT,
  API_IP,
  API_PORT,
  SOURCEMAP_MIN,
} = ENV;

process.traceDeprecation = true;
let devtool = 'inline-source-map';

if (NODE_ENV === 'production') {
  devtool = SOURCEMAP_MIN ? 'source-map' : false;
}

const config = {
  cache: true,
  context: PWD,
  externals: {},
  devtool,
  output: {
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    path: BUILD_DIR,
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  resolve: {
    modules: modulesDirectories,
    extensions: ['.json', '.js', '.jsx'],
    alias: {
    },
  },
  module: {
    rules: allLoaders,
  },
  plugins,
  devServer: {
    historyApiFallback: true,
    contentBase: BUILD_DIR,
    hot: true,
    port: DEV_PORT,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      '/api/**': `http://${API_IP}:${API_PORT}`,
    },
  },
};

config.resolve.alias[`${pack.name}`] = path.resolve(PWD, 'src');

export default config;

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ENV from './env';

const { BUILD_DIR, NODE_ENV } = ENV;

const isDev = NODE_ENV === 'development';
const isProd = NODE_ENV === 'production';
let useLoaders = [
  {
    loader: 'css-loader',
    options: {
      root: BUILD_DIR,
      importLoaders: 1,
      modules: false,
      minimize: isProd,
      camelCase: true,
      sourceMap: isDev,
    },
  },
];

if (isProd) {
  useLoaders = ExtractTextPlugin.extract(useLoaders);
} else {
  useLoaders.unshift('style-loader');
}

const cssLoader = {
  test: /\.css$/,
  use: useLoaders,
};

export default cssLoader;

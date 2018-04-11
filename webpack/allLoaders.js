import jsLoader from './jsLoader';
import cssLoader from './cssLoader';

const imageLoader = {
  test: /\.(jpe?g|png|gif|svg)$/i,
  loaders: [
    'file?hash=sha512&digest=hex&name=[hash].[ext]',
    {
      loader: 'image-webpack-loader',
      options: {
        query: {
          mozjpeg: {
            progressive: true,
          },
          gifsicle: {
            interlaced: true,
          },
          optipng: {
            optimizationLevel: 7,
          },
        },
      },
    },
  ],
};

const htmlLoader = {
  test: /\.html$/,
  loader: 'html-loader',
};


const fontsLoaders = [
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=10000&mimetype=application/font-woff',
  },
  {
    test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader',
  },
];

const allLoaders = [
  jsLoader,
  cssLoader,
  ...fontsLoaders,
  imageLoader,
  htmlLoader,
];

export default allLoaders;

import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import path from 'path';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import copyPluginSettings from './copyPluginSettings';
import ENV from './env';
import globalVars from './globalVars';

const {
  PROFILE,
  NODE_ENV,
  BUILD_DIR,
  CLEAN_BUILD,
  PWD,
  TEMPLATE_DIR,
  SKIP_MIN,
  SOURCEMAP_MIN,
  STORYBOOK,
} = ENV;

/**
 * Настройки для плагинов webpack.
 *
 * @returns {Array<*>} plugins - массив плагинов
 * @example no
 */
function fillPlugins() {
  let plugins = [
    new webpack.DefinePlugin(globalVars),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ];

  if (NODE_ENV !== 'test') {
    plugins = [
      ...plugins,
      new CopyPlugin(copyPluginSettings),
    ];

    if (!STORYBOOK) {
      plugins.push(new HtmlPlugin({
        filename: 'index.html',
        template: path.resolve(PWD, TEMPLATE_DIR, 'index.html'),
      }));
    }

    if (CLEAN_BUILD) {
      plugins.push(new CleanPlugin([BUILD_DIR], {
        root: PWD,
      }));
    }
  }

  if (PROFILE) {
    plugins = [
      ...plugins,
      new BundleAnalyzerPlugin(),
    ];
  }

  if (NODE_ENV === 'production') {
    plugins = [
      ...plugins,
      new ExtractTextPlugin('main.css'),
    ];
    if (!SKIP_MIN) {
      let configUglify = {
        extractComments: true,
      };
      if (SOURCEMAP_MIN) {
        configUglify = {
          ...configUglify,
          sourceMap: true,
        };
      }
      plugins = [
        ...plugins,
        new UglifyJSPlugin(configUglify),
      ];
    }
  }

  return plugins;
}

export default fillPlugins();

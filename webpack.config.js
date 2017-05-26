const path = require('path');

const config = { 
  entry: './src/index.js',
  output: {
    filename: './lib/index.js',
    libraryTarget: 'umd',
    library: 'fronto-connect'
  },
  externals: { 
    "mobx": "mobx",
  },
  module: { 
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ["es2015", { "modules": false }], 'es2017', 'stage-0'
          ],
          plugins: ['transform-async-to-generator', 'transform-regenerator',
                    'transform-runtime', 'transform-decorators-legacy'],
        },
      },
    }]
  }
};

module.exports = config;
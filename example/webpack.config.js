// http://necolas.github.io/react-native-web/docs/?path=/docs/guides-multi-platform--page#web-packaging-for-existing-react-native-apps

const path = require('path');
const fromRoot = _ => path.resolve(__dirname, _);

module.exports = {
  entry: fromRoot('index.js'),
  output: {
    path: fromRoot('dist'),
    filename: 'bundle.web.js',
  },
  devServer: {
    contentBase: fromRoot('dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader', options: { cacheDirectory: true } },
        include: [fromRoot('index.js'), fromRoot('src')],
      },
    ],
  },
  resolve: {
    alias: { 'react-native$': 'react-native-web' },
    extensions: ['.web.js', '.js'],
  },
};

const path = require('path')
const { EnvironmentPlugin } = require('webpack')
const { config } = require('dotenv')
const ESLintPlugin = require('eslint-webpack-plugin')

config()

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index.ts'),
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'node:http': require.resolve('http'),
    }
  },
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new EnvironmentPlugin(['PORT']),
    new ESLintPlugin({
      emitError: true,
      emitWarning: true,
      failOnError: true
    })
  ]
};
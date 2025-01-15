const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('../webpack.config.js');

// Bundle frontend files using Webpack
webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error('Webpack build failed:', err || stats.toString());
    process.exit(1);
  }

  console.log('Webpack build succeeded');
  
  // Copy static assets to the build directory
  const staticAssetsPath = path.join(__dirname, 'frontend', 'static');
  const buildPath = path.join(__dirname, '..', 'build');

  fs.copy(staticAssetsPath, buildPath, (err) => {
    if (err) {
      console.error('Failed to copy static assets:', err);
      process.exit(1);
    }

    console.log('Static assets copied successfully');
  });
});

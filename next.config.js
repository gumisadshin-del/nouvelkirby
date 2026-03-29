'use strict';

const withImages = require('next-images');

module.exports = withImages({
  /* config options here */
  webpack(config, options) {
    return config;
  },
});

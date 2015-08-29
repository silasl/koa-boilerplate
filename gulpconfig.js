var webpack = require('webpack');
var merge = require('object-merge');

module.exports = {
  paths: {
    dev: {
      output: './public/js',
      src: './client/js/**/*.js'
    },
    prod: {
      output: './public/js',
      src: './client/js/**/*.js'
    },
    bower: {
      src: './bower_components/**/*.js'
    }
  },

  eslint: {
    prod: {
      src: '{./server/,./client/js/}*.js'
    }
  },

  autoprefixer: {
    prod: {
      cascade: false
    },
    dev: {
      cascade: false
    }
  },

  webpack: {
    options: {
      entry: {
        bundle: ['./client/js/app.js']
      },
      output: {
        filename: 'app.js'
      },
      resolve: {
        modulesDirectories: ['node_modules', 'bower_components']
      },
      plugins: [
        new webpack.ResolverPlugin(new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main']))
      ],
      module: {
        loaders: [
          { test: /\.json$/, loader: 'json-loader' }
        ]
      }
    },
    get prod() {
      return this.options;
    },
    get dev() {
      this.options.devtool = 'source-maps';
      return this.prod;
    }
  },

  sass: {
    options: {
      entry: './client/scss/screen.scss',
      output: './public/css/',
      includePaths: 'bower_components'
    },
    get prod() {
      return merge(this.options, {
        outputStyle: 'compressed'
      });
    },
    get dev() {
      return merge(this.options, {
        dir: ['./client/sass/**/*.scss', './client/sass/*.scss'],
        sourceComments: true,
        outputStyle: 'expanded'
      });
    }
  }
};

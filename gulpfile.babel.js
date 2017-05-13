// import path from 'path'

import gulp from 'gulp'
// import watch from 'gulp-watch'
// import less from 'gulp-less'
import webpack from 'gulp-webpack'

import { argv } from 'yargs'

function bundler (watch = false) {
  return webpack({
    watch: watch,
    module: {
      loaders: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        },
        // {
        //   test: /\.scss$/,
        //   loader: 'sass-loader'
        // },
        {
          test: /\.txt$/,
          loader: 'raw-loader'
        }
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    output: {
      filename: 'bundle.js'
    }
  })
}

gulp.task('webpack', () => {
  return gulp.src('src/index.js')
    .pipe(bundler(argv.watch))
    .pipe(gulp.dest('static/'))
})

// gulp.task('less', () => {
//   function execute () {
//     return gulp.src('src/styles/main.less')
//       .pipe(less())
//       .pipe(gulp.dest('static/'))
//   }
//
//   if (argv.watch) {
//     return watch('src/**/*.less', execute)
//   } else {
//     return execute()
//   }
// })

gulp.task('all', ['webpack'])
gulp.task('default', ['all'])

const { series } = require('gulp');
const { src, dest } = require('gulp');
const del  = require('del');

function clean(cb) {
  return del([
    'dist/**','!dist/'
  ]);
};

function copyclient(cb){
  return src(['src/client/dist/**'])
  .pipe(dest('dist/'));  
}
function copyclient2(cb){
  return src(['src/client/dist/**/*','src/client/src/**/*'])
  .pipe(dest('dist/assets'));  
}
exports.default = series(clean);
exports.test = series(clean,copyclient2);
exports.clean=clean;
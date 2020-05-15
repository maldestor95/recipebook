var run = require('gulp-run');
const {  exec} = require('child_process');
const {  series, parallel} = require('gulp');
const {  src,  dest} = require('gulp');
var zip = require('gulp-zip');

const del = require('del');

function addZeroBefore(n) {
  return (n < 10 ? '0' : '') + n;
}

function clean(cb) {
  return del([
    'dist/**', '!dist/', 'test/**'
  ]);
};

function consoleDefault(cb){
  console.log (
    'Merci d\'utiliser un argument \n',
  ' `gulp clean`  nettoyage du répertoire dist \n',
  ' `gulp build` préparation du répertoire dist\n',
  ' `gulp test`  test du build; on démarre un serveur local\n',
  ' `gulp zip`  Création du ZIP prêt à être déposé sur Elastic Beanstalk\n',
  )
}

function buildClient(cb) {
    exec(' npm run build ',{cwd:'./src/client'},(err,stdout,stderr)=>{
      console.log(err,stdout,stderr)
      cb()
    })
}
function copyServer1(cb) {
  return src(['.ebextensions/**/*'])
    .pipe(dest('dist/.ebextensions'));
}
function copyServer2(cb) {
   return src(['src/server/**/*','!src/server/{test,test/**}','!src/server/{node_modules,node_modules/**}'])
    .pipe(dest('dist/'));
}
function makeZip(cb){
  let d=new Date()
  let y=d.getFullYear()
  let m=addZeroBefore(d.getMonth()+1)
  let dd=addZeroBefore(d.getDate())
let hh=addZeroBefore(d.getUTCHours())
let mn=addZeroBefore(d.getUTCMinutes())

  return src(['dist/**/*','.ebextensions/**/*'],
        {
            dot: true
        })
        .pipe(zip(y+'-'+m+'-'+dd+'-'+hh+mn+'-archive.zip'))
        .pipe(dest('zip/'))
}
function prepareTest(b){
  return src(['dist/**/*','.ebextensions/**/*'],
  {
      dot: true
  })
    .pipe(dest('test/'));
}
function installTestServer(cb) {
  exec(' npm install ',{cwd:'./test'},(err,stdout,stderr)=>{
    console.log(err,stdout,stderr)
    cb()
  })
}
function  TestServer(cb) {
  exec(' npm run start ',{cwd:'./test'},(err,stdout,stderr)=>{
    console.log(err,stdout,stderr)
    cb()
  })
}

exports.default = consoleDefault;
exports.clean = clean;
exports.build = series(clean,parallel(buildClient));
// exports.build = series(clean,parallel(buildClient,copyServer1,copyServer2));
exports.test=series(prepareTest,installTestServer,TestServer)
exports.zip=series(makeZip)

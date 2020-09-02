(module.exports = {
    diff: true,
    extension: ['js'],
    package: './package.json',
    reporter: 'spec',
    slow: 75,
    timeout: 2000,
    ui: 'bdd',
    bail:true,
    colors:true,
    'recursive':['./lib/**/*.spec.js'],
    'watch-files': ['./lib/**/*.js', '**/*.spec.js'],
    'watch-ignore': ['utils']
})
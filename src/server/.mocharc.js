(module.exports = {
    diff: true,
    extension: ['js','ts'],
    package: './package.json',
    reporter: 'spec',
    slow: 75,
    timeout: 2000,
    ui: 'bdd',
    bail:true,
    colors:true,
    // 'recursive':['./lib/**/*.spec.js'],
    'watch-files': ['./lib/**/*.js', 'src/**/*.spec.js','src/**/*.spec.ts'],
    'watch-ignore': ['utils']
})
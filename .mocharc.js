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
    'recursive':['./src/**/*.spec.js','./src/**/*.spec.ts'],
    'watch-files': ['src/**/*.spec.js','src/**/*.spec.ts','src/**/*.ts','src/**/*.js'],
    'watch-ignore': ['utils']
})
(module.exports = {
    diff: true,
    extension: ['js'],
    package: './package.json',
    reporter: 'spec',
    slow: 75,
    timeout: 2000,
    ui: 'bdd',
    'recursive':['./utils/**/*.spec.js'],
    'watch-files': ['./utils/**/*.js', '**/*.spec.js'],
    'watch-ignore': ['lib/vendor']
})
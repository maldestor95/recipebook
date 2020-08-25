
# cv ludo

Standalone VueJS app that show the CV

## how to update the content of the CV?
Just edit the cvdata.js file located in [./src/components/cvdata.js](./src/components/cvdata.js) 

# Development instruction
All commands below have to be performed within the cv folder

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

The output is saved into the [local dist folder](./dist/) and set the base URL to '/cv'

ExpressJS server then expose a static website [cf app.js](../server/app.js)

### Run your tests
```
npm run test
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

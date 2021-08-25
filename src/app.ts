#!/usr/bin/env node

const cb = function () {
    console.log("cactus")
}

import yargs from "yargs"
yargs
    .scriptName('Recipe Creator')
    .usage('$0 <cmd> [args]')
    .command('new-recipe <name> <filename>', 'welcome ter yargs!', (yargs) => {
        yargs.positional('name', {
            type: 'string',
            default: null,
            describe: 'name of the recipe in quotes'
        })
        yargs.positional('filename', {
            type: 'string',
            default: null,
            describe: 'filename without spaces and no extension'
        })
    }, function (argv) {
        console.log('Creation of ', argv.name, 'which correspond to', argv.filename)
    })
    .command('update-list <filename>', 'update recipe list', (yargs) => {
        yargs.positional('filename', {
            type: 'string',
            default: null,
            describe: 'filename without spaces and no extension'
        })
    }, function (argv) {
        console.log('update list with ', argv.filename)
    })
    .command({
        command: '*',
        handler() {
            yargs.showHelp()
        }
    })
    .help()
    .argv
//@ts-nocheck
//@ts-ignore
const fs = require('fs');
const path = require('path');
const english = require('./translation/translationEnglish.json');
const german = require('./translation/translationGerman.json');
const exec = require('child_process').exec;

const orderedEnglish = {};
Object.keys(english).sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
}).forEach(key => {
    orderedEnglish[key] = english[key];
});

const orderedGerman = {};
Object.keys(german).sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
}).forEach(key => {
    orderedGerman[key] = german[key];
});

fs.writeFile(path.resolve(__dirname, './translation/translationEnglish.json'), JSON.stringify(orderedEnglish, null, '\t'), function (err) {
    if (err) {
        throw err;
    }
});

fs.writeFile(path.resolve(__dirname, './translation/translationGerman.json'), JSON.stringify(orderedGerman, null, '\t'), function (err) {
    if (err) {
        throw err;
    }
});
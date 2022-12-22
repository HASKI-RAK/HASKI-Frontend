const fs = require('fs');
const path = require('path');
const english = require('./translation/translationEnglish.json');
const exec = require('child_process').exec;

const orderedEnglish = {};
Object.keys(english).sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
}).forEach(key => {
    orderedEnglish[key] = english[key];
});

fs.writeFile(path.resolve(__dirname, './translation/translationEnglish.json'), JSON.stringify(orderedEnglish, null, '\t'), function (err) {
    if (err) {
        throw err;
    }
});
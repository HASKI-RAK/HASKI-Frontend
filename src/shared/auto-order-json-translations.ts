/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
//@ts-ignore
const fs = require('fs');
const path = require('path');
const english = require('./translation/translationEnglish.json');
const german = require('./translation/translationGerman.json');

const orderTranslationFile = (translationObject, translationPath) => {

    const ordered = {};

    Object.keys(translationObject).sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    }).forEach(key => {
        ordered[key] = translationObject[key];
    });

    fs.writeFile(path.resolve(__dirname, translationPath), JSON.stringify(ordered, null, '\t'), (err) => {
        if (err) {
            throw err;
        }
    });
    return "";
};

orderTranslationFile(english, "./translation/translationEnglish.json");
orderTranslationFile(german, "./translation/translationGerman.json");
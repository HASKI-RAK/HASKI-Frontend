﻿import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all translation files
import translationEnglish from './translation/translationEnglish.json';
import translationGerman from './translation/translationGerman.json';

//define the available languages
const resources = {
    en: {
        translation: translationEnglish,
    },
    de: {
        translation: translationGerman,
    },
};

let lng="";

if(localStorage.getItem("i18nextLng") === null){
    localStorage.setItem("i18nextLng", "de");
}
else{
    lng = localStorage.getItem("i18nextLng") as string;
}

//initial value is german
i18next.use(initReactI18next).init({
    resources,
    lng: lng, // local storage get the language from the browser
    fallbackLng: 'de',
});

export default i18next;
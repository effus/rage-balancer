const locales = require('../locales.json');
const LanguageHelper = {
    localesList: ['en', 'ru'],
    locale: null,
    setLocale: function(locale) {
        if (!this.localesList.includes(locale)) {
            throw Error('Locale not supported');
        }
        this.locale = locale;
    },
    t: function(term) {
        let localeWord = locales[term][this.locale];
        if (typeof localeWord === 'undefined') {
            localeWord = locales[term]['en'];
        }
        return localeWord;
    }
};
export {LanguageHelper};
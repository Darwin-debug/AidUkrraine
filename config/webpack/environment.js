const { environment } = require('@rails/webpacker');

// convert rails translates to intl
const dumpTranslates = require('../../app/javascript/dumpTranslates')

dumpTranslates();

module.exports = environment

const yaml = require('js-yaml');
const fs = require('fs');
const path  = require('path');
const merge = require('lodash/merge');

const OUTPUT_FILE = 'translates.json';

const INPUT_DIR = path.join('config', 'locales');

function getTranslates (accumulator, objOrString, parentPath) {
    
    if (typeof objOrString === 'string') {
        accumulator[parentPath.join('.')] = objOrString;
        return;
    }
    if(!objOrString) return accumulator;
    Object.keys(objOrString).forEach(key => {
        getTranslates(accumulator, objOrString[key], [...parentPath, key])
    })
    return accumulator;
}
module.exports = function dumpTranslates () {
    const filesNames = fs.readdirSync(INPUT_DIR);

    let output = {};
    
    filesNames.forEach(fileName => {
        const inputfile = path.join(INPUT_DIR, fileName);
        obj = yaml.load(fs.readFileSync(inputfile, {encoding: 'utf-8'}));
        const translatesObj = {};
        Object.keys(obj).forEach(language => {
            translatesObj[language] = getTranslates({}, obj[language], []);
    
        })
        output = merge(output, translatesObj);
    })
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
};

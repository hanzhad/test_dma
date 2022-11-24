const _ = require('lodash');
const { readdir } = require("node:fs/promises");


module.exports.getDirectories = function (path) {
    return readdir(path, { encoding: null, withFileTypes: true })
        .then(
            (r) => _.chain(r)
                .filter((dir) => dir.isDirectory())
                .map((dir) => dir?.name)
                .value()
        )
}

module.exports.getDirContent = function (path) {
    return readdir(path, { encoding: null, withFileTypes: true })
        .then(
            (r) => _.chain(r)
                // .filter((dir) => dir.isDirectory())
                .map((dir) => dir?.name)
                .value()
        )
}

module.exports.getDirContentUrlNamesDictionary = async function (path) {
    const list = await module.exports.getDirContent(path);

    const dictionary = {};

    _.each(list, (name) => {
        dictionary[module.exports.fileNameToUrl(name)] = name;
    });

    return dictionary;
}

module.exports.fileNameToUrl = function (str) {
    return str
        .replace(/\s+/g, '-')
        .replace(/!/g, '')
        .replace('.md', '')
        .toLowerCase()
}

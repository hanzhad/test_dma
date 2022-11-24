const MarkdownIt = require('markdown-it');
const _ = require('lodash');
const { getDirectories, getDirContentUrlNamesDictionary, fileNameToUrl } = require('./utils');
const { NotFoundError } = require('./utils/erros');
const fs = require('fs').promises;

const getPage = async (req, res) => {
    const path = _.split(_.trim(req.url, '/'), '/');

    const [pageFolder, ...filePath] = path;

    if (_.size(filePath) !== 1) {
        throw new NotFoundError();
    }

    const pageFolderList = await getDirectories('./pages');

    if (!_.includes(pageFolder, pageFolderList)) {
        throw new NotFoundError();
    }

    const folderFilesDictionary = await getDirContentUrlNamesDictionary(`./pages/${pageFolder}`);

    const [fileName] = filePath;

    if (!folderFilesDictionary[fileName]) {
        throw new NotFoundError();
    }

    const fsFileName = folderFilesDictionary[fileName];

    const file = await fs.readFile(`./pages/${pageFolder}/${fsFileName}`);

    const md = new MarkdownIt();

    return md.render(file.toString());
}

module.exports = getPage;

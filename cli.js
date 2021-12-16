const fs = require('fs/promises');
const { lstatSync } = require('fs');
const inquirer = require('inquirer');
const yargs = require('yargs');
const path = require('path');

let currDir = process.cwd();
const options = yargs
    .positional('d', {
        describe: 'Путь к папке',
        default: process.cwd(),
    })
    .positional('p', {
        describe: 'Паттерн',
        default: '',
    }).argv;

class ListItem {
    constructor(path, fileName) {
        this.path = path;
        this.fileName = fileName;
    }

    get isDir() {
        return lstatSync(this.path).isDirectory();
    }
}

const start = async () => {
    const list = await fs.readdir(currDir, 'utf-8');
    const items = list.map(fileName =>
        new ListItem(path.join(currDir, fileName), fileName));

    const item = await inquirer
        .prompt([
            {
                name: 'fileName',
                type: 'list',
                message: `Выберите папку или файл: ${currDir}`,
                choices: items.map(item => ({ name: item.fileName, value: item })),
            }
        ])
        .then(answer => answer.fileName);

    if (item.isDir) {
        currDir = item.path;
        return await start();
    } else {
        const data = await fs.readFile(item.path, 'utf-8')

        if (options.p == null) console.log(data);
        else {
            const regExp = new RegExp(options.p, 'igm');
            console.log(data.match(regExp));
        }
    }
}

start();

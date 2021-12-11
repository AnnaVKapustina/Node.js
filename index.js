const fs = require('fs')
const readline = require('readline')

const readLogfile = fs.createReadStream('./access.log', 'utf8');
const writeLogfile_1 = fs.createWriteStream('./89.123.1.41_requests.log');
const writeLogfile_2 = fs.createWriteStream('./34.48.240.111_request.log');

const rl = readline.createInterface({
    input: readLogfile,
});

rl.on('line', (line) => {

    if (line.includes("89.123.1.41")) {
        writeLogfile_1.write(line + "\n")
    }

    if (line.includes("34.48.240.111")) {
        writeLogfile_2.write(line + "\n")
    }
})
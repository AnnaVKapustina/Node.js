const http = require('http');
const path = require('path');
const fs = require('fs');

http.createServer((req, res) => {
    const fullPath = path.join(process.cwd(), req.url);
    const isFile = (path) => fs.lstatSync(path).isFile();

    if (!fs.existsSync(fullPath)) return res.end('404 Not found');

    if (isFile(fullPath)) {
        return fs.createReadStream(fullPath).pipe(res);
    }

    let dataList = '';

    const urlParams = req.url.match(/[\d\w\.]+/gi);

    if (urlParams) {
        urlParams.pop();
        const prevUrl = urlParams.join('/');
        dataList = urlParams.length ? `<li><a href="/${prevUrl}">Назад</a></li>` : '<li><a href="/">Назад</a></li>';
    }

    fs.readdirSync(fullPath)
        .forEach(fileName => {
            const filePath = path.join(req.url, fileName);
            dataList += `<li><a href="${filePath}">${fileName}</a></li>`;
        });
    const HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8').replace('data', dataList);
    res.writeHead(200, {
        'Content-Type': 'text/html',
    })
    return res.end(HTML);
}).listen(5000);


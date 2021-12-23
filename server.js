const http = require("http");
const path = require("path");
const io = require("socket.io");
const fs = require("fs");
const user = require("./randomColor");

let online = 0;

const app = http.createServer((req, res) => {
    if (req.method === "GET") {
        const filePath = path.join(__dirname, "index.html");
        readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    } else if (req.method === "POST") {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            const parsedData = JSON.parse(data);
            console.log(parsedData);
            res.writeHead(200, { "Content-Type": "json" });
            res.end(data);
        });
    } else {
        res.statusCode = 405;
        res.end();
    }
});

class Client {
    constructor() {
        this.name = user.randomColor();
        this.color = `#${user.randomColor()}`;
    }
}

const socket = io(app);

socket.on("connection", (socket) => {
    let user = new Client();
    online++;
    socket.broadcast.emit("CLIENT_CONNECTED", {
        msg: `${user.name} вошел в чат`,
        online: online,
        color: user.color,
    });

    socket.on("CLIENT_MSG", (data) => {
        socket.emit("SERVER_MSG", {
            user: user.name,
            color: user.color,
            msg: data.msg.split("").reverse().join(""),
        });
        socket.broadcast.emit("SERVER_MSG", {
            user: user.name,
            color: user.color,
            msg: data.msg.split("").reverse().join(""),
        });
    });

    socket.on("disconnect", () => {
        online--;
        socket.broadcast.emit("CLIENT_DISCONNECTED", {
            msg: `${user.name} вышел из чата`,
            online: online,
        });
    });
});

app.listen(8888);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('A new client connected');

    setInterval(() => {
        ws.send(JSON.stringify({owner: 2, speed: Math.round(Math.random() * 5) - 2}))
    }, 500)
    setInterval(() => {
        ws.send(JSON.stringify({owner: 1, speed: -0.5}))
    }, 100)

    ws.on('message', function incoming(message) {
        const {sym, trueSym} = JSON.parse(message);

        if (sym === trueSym) {
            ws.send(JSON.stringify({owner: 1, speed: 5}));
        } else {
            ws.send(JSON.stringify({owner: 1, speed: -2}))
        }
    });

    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on port 8080');

import { WebSocketServer } from 'ws';
import { UserManger } from './UserManager';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, req) {
    const url = req.url;
    if(!url){
        return;
    }

    const urlParams = new URLSearchParams(url.split('?')[1]);
    const name = urlParams.get('name');
    UserManger.getInstance().addUser(ws, name || "Anonomous");

    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    ws.send('something');
});
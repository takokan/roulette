require("dotenv").config();
import { WebSocketServer } from 'ws';
import { UserManager } from './UserManager';

const wss = new WebSocketServer({ port: 8080 });
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

wss.on('connection', function connection(ws, req) {
    const url = req.url;
    if(!url) {
        return;
    }

    const queryParams = new URLSearchParams(url);
    const name = queryParams.get('name');
   
    UserManager.getInstance().addUser(ws, name || "Anonomous", name === ADMIN_PASSWORD);
});
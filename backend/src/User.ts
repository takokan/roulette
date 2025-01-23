import { WebSocket } from "ws"
import { COINS, OutGoingMessages } from "./Types";

const MULTIPLIER = 17;

export class User {
    id: number;
    name: string;
    ws: WebSocket;
    balance: number;
    locked: number;

    constructor(id: number, name: string, ws: WebSocket) {
        this.id = id;
        this.name = name;
        this.ws = ws;
        this.balance = 2500;
    }

    bet(amount: COINS){
        this.balance -= amount;
        this.locked += amount;
        this.ws.send(JSON.stringify({
            type: "bet", 
            amount: amount,
            balance: this.balance,
            locked: this.locked
        }));
    }

    send(payload: OutGoingMessages){
        this.ws.send(JSON.stringify(payload));
    }
}
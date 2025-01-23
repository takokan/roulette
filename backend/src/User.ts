import { WebSocket } from "ws"
import { COINS, OutGoingMessages, Number } from "./Types";
import { GameManager } from "./GameManager";

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
        this.locked = 0;
    }


    bet(clientId: string, amount: COINS, betNumber: Number){
        this.balance -= amount;
        this.locked += amount;
        const response = GameManager.getInstance().bet(amount, betNumber, this.id);
        if(response) {
            this.send({
                clientId,
                type: "bet",
                amount: amount,
                balance: this.balance,
                locked: this.locked
            })
        } else {
            this.send({
                clientId,
                type: "bet-undo",
                amount: amount,
                balance: this.balance,
                locked: this.locked 
            })
        }
    }

    won(){

    }
    send(payload: OutGoingMessages){
        this.ws.send(JSON.stringify(payload));
    }
}
import { WebSocket } from 'ws';
import { COINS, GameState, IncomingMessages, Number, OutgoingMessages } from './Types';
import { GameManager } from './GameManager';
const MULTIPLIER = 17;

export class User {
    id: number;
    name: string;
    balance: number;
    ws: WebSocket;
    isAdmin: boolean;
    locked: number;
    lastWon: number;

    constructor(id: number, name: string, ws: WebSocket, isAdmin: boolean) {
        this.id = id;
        this.name = name;
        this.balance = 2500;
        this.ws = ws;
        this.isAdmin = isAdmin;
        this.locked = 0;
        this.lastWon = 0;
        this.initHandler();
    }

    initHandler() {
        this.ws.on('message', (data: string) => {
            try {
                const message: IncomingMessages = JSON.parse(data);
                console.log(message);
                if(message.type === "bet") {
                    console.log("user bet");
                    this.bet(message.amount, message.number);
                }

                if(this.isAdmin && message.type === "start-game"){
                    console.log("start game")
                    if(GameManager.getInstance().state === GameState.GameOver){
                        GameManager.getInstance().start();
                    }
                }

                if(this.isAdmin && message.type === "end-game"){
                    console.log("end game")
                    if(GameManager.getInstance().state === GameState.CantBet) {
                        GameManager.getInstance().end(message.output);
                    }
                }

                if(this.isAdmin && message.type === "stop-bets") {
                    console.log("stop bets")
                    if(GameManager.getInstance().state === GameState.CanBet){
                        GameManager.getInstance().stopBets();
                    }
                }
            } catch (error) {
                console.log(error);
            }
        })
    }

    send(payload: OutgoingMessages) {
        this.ws.send(JSON.stringify(payload));
    }

    bet(amount: COINS, betNumber: Number) {
        if(this.balance < amount){
            this.send({
                type: "bet-undo",
                amount: amount,
                balance: this.balance,
                locked: this.locked,
            });
            return;
        }

        this.balance -= amount;
        this.locked += amount;

        const response = GameManager.getInstance().bet(amount, betNumber, this.id);
        if(response){
            this.send({
                type: "bet",
                amount: amount,
                balance: this.balance,
                locked: this.locked,
            })
        } else {
            this.send({
                type: "bet-undo",
                amount: amount,
                balance: this.balance,
                locked: this.locked,
            })
        }

    }

    won(amount: number, output: Number) {
        const wonAmount = amount * (output === Number.Zero ? MULTIPLIER*2 : MULTIPLIER);
        this.balance += wonAmount;
        this.locked -= amount;
        this.lastWon += wonAmount;
    }

    lost(amount: number, _output: Number) {
        this.locked -= amount;
    }

    flush(output: Number) {
        if (this.lastWon === 0) {
            this.send({
                type: "lost",
                balance: this.balance,
                locked: this.locked,
                outcome: output
            })
        } else {
            this.send({
                wonAmount: this.lastWon,
                type: "won",
                balance: this.balance,
                locked: this.locked,
                outcome: output
            })
        }
        this.lastWon = 0;
    }
}
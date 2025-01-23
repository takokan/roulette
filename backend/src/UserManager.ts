import { OutGoingMessages } from "./Types";
import { User } from "./User";
import { WebSocket } from "ws";

let ID = 1;

export class UserManger {
    private _users: {[key: string]: User} = {};
    private static _instance: UserManger;

    private constructor() { }

    public static getInstance(): UserManger {
        if (!this._instance) {
            this._instance = new UserManger();
        }
        return this._instance;
    }

    addUser(ws: WebSocket, name: string){
        let id = ID;
        const user = new User(id, name, ws);
        this._users[id] = user;

        ws.on('close', () => this.removeUser(id));
        ID++;
    }

    removeUser(id: number){
        delete this._users[id];
    }

    broadcast(message: OutGoingMessages, id?: number){
        Object.keys(this._users).forEach((userId) => {
            const user = this._users[userId] as User;
            if(id != user.id){
                user.send(message);
            }
        })
    }

    won(id: number, amount: number, output: number) {
        console.log("won");
        this._users[id]?.won();
    }
}
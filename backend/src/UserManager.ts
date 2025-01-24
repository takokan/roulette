import { GameManager } from "./GameManager";
import { Number, OutgoingMessages } from "./Types";
import { User } from "./User";
import { WebSocket } from 'ws';

let ID = 1;

export class UserManager {
    private _users: User[] = [];
    private static _instance: UserManager;

    private constructor() {}

    // insures only one instance of UserManager is created
    public static getInstance(){
        if(!this._instance){
            this._instance = new UserManager();
        }

        return this._instance;
    }

    // add user to the list of users
    addUser(ws: WebSocket, name: string, isAdmin: boolean){
        let id = ID;
        const user = new User(
            id, 
            name, 
            ws, 
            isAdmin
        );

        user.send({
            type: "current-state",
            state: GameManager.getInstance().state,
        })

        this._users[id] = user;
        ws.on('close', () => {this.removeUser(id)});

        ID++;
    }

    // removes user from the list of users
    removeUser(id: number){
        this._users = this._users.filter(user => user.id !== id);
    }

    // broadcast function
    broadcast(message: OutgoingMessages, id?: number) {
        this._users
        .filter(x => x.id != id).
        forEach(user => user.send(message));
    }

    won(id: number, amount: number, output: Number){
        console.log("won");
        this._users[id].won(amount, output);
    }

    lost(id: number, amount: number, output: Number){
        console.log("lost");
        this._users[id].lost(amount, output);
    }

    flush(output: Number) {
       this._users.forEach(user => {
            user.flush(output);
       });
    }
}
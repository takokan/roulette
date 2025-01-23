import { Bet, GameState, Number } from "./Types";

export class GameManager {
    state: GameState = GameState.gameOver;
    bets: Bet[] = [];
    private static _instance: GameManager;
    private _lastWinner: Number = Number.Zero;

    private constructor() { }

    public static getInstance(): GameManager {
        if (!this._instance) {
            this._instance = new GameManager();
        }
        return this._instance;
    }


    // end users will call this method to place a bet
    public bet(id: number, amount: number, betNumber: Number): boolean {
        if(this.state === GameState.peopleCanBet){
            this.bets.push({id, amount, number: betNumber});
            return true;
        }
        return false;
    }

    public start() {
        this.state = GameState.peopleCanBet;
    }

    public end(output: Number) {
        this._lastWinner = output;
        this.state = GameState.gameOver;
        this.bets.forEach((bet) => {
            if(bet.number === output){
                // UserManger.getInstance().won(bet.id, bet.amount * 17, output);
            }
        }
    }
}
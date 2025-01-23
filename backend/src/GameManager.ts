import { Bet, GameState, Number } from "./Types";

export class GameManager {
    state: GameState = GameState.gameOver;
    bets: Bet[] = [];
    private static _instance: GameManager;

    private constructor() { }

    public static getInstance(): GameManager {
        if (!this._instance) {
            this._instance = new GameManager();
        }
        return this._instance;
    }


    public bet(id: number, amount: number, betNumber: Number): boolean {
        if(this.state === GameState.peopleCanBet){
            this.bets.push({id, amount, number: betNumber});
            return true;
        }
        return false;
    }

}
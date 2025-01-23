
export type OutGoingMessages = {
    type: "bet",
    clientId: string,
    amount: number,
    balance: number,
    locked: number
} | {
    type: "bet-undo",
    clientId: string,
    amount: number,
    balance: number,
    locked: number
}
 
export enum COINS {
    One = 1,
    Five = 5,
    Ten = 10,
    TwentyFive = 25,
    Fifty = 50,
    Hundred = 100,
    TwoFifty = 250,
    FiveHundred = 500,
}

export enum Number {
    Zero,
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Eleven,
    Twelve,
    Thirteen,
    Fourteen,
    Fifteen,
    Sixteen,
    Seventeen,
    Eighteen,
    Nineteen,
    Twenty,
    TwentyOne,
    TwentyTwo,
    TwentyThree,
    TwentyFour,
    TwentyFive,
    TwentySix,
    TwentySeven,
    TwentyEight,
    TwentyNine,
    Thirty,
    ThirtyOne,
    ThirtyTwo,
    ThirtyThree,
    ThirtyFour,
    ThirtyFive,
}

export enum GameState {
    peopleCanBet,
    peopleCantBet,
    gameOver
}

export type Bet = {
    id: number;
    amount: number;
    number: number;
}
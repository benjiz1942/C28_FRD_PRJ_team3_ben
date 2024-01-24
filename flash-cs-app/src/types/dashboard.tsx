export interface revisionWords {
    date: string;
    count: number;
}

export interface getDailyTarget {
    "newCard": number,
    "newCardTarget": number
    "exerciseDone": number,
    "exerciseTarget": number
}

export interface getCorrectPercentage {
    isCorrect: boolean;
    createdAt: string;
}
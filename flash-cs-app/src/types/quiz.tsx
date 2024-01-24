export interface Quiz {
    id: number;
    userId: number;
    vocabulary: string;
    question: string;
    answer: string;
    notes: string;
    image?: any;
    interval: number;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
}
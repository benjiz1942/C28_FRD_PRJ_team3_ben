// export interface CardBack {
//   vocabulary: string;
//   deck: string;
//   notes: string;
//   photo: FileList;
//   question: string;
//   answer: string;
// }

export interface CardList {
  id: number;
  userId: number;
  vocabulary: string;
  question: string;
  answer: string;
  notes: string;
  image?: string;
  interval: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  topic: string;
}

export interface InCard {
  id: number;
  userId: number;
  vocabulary: string;
  question: string;
  answer: string;
  deckFlashcards: { deck: { topic: string; id: number } }[];
  notes: string;
  image: string | null;
  interval: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OutCard {
  id: number;
  userId: number;
  vocabulary: string;
  question: string;
  answer: string;
  deckFlashcards: { deck: { topic: string; id: number } }[];
  notes: string;
  image: FileList;
  interval: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
export interface Deck {
  id: number;
  userId: number;
  topic: string;
  createdAt: Date;
  updatedAt: Date;
}

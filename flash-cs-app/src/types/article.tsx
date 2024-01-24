export interface ArticleCard {
  id: number;
  articleTheme: string;
  articleLevel: string;
  creator: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface SpecificArticle {
  id: number;
  articleLevel: string;
  articleTheme: string;
  content: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
  exercises: Exercise[];
}
interface Exercise {
  id: number;
  question: string;
  option0: string;
  option1: string;
  option2: string;
  option3: string;
}
export interface ArticleCardContent {
  id: number;
  articleLevel: string;
  articleTheme: string;
  content: string;
  creator: string;
  createdAt: Date;
  updatedAt: Date;
}

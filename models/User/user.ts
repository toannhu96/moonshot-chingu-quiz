export interface QuizResult {
  date: string;
  numberCorrect: number;
  totalQuestions: number;
  name: string;
  secondsToComplete: number;
}

export interface UserData {
  quizResults?: QuizResult[]
}

export interface User {
  uid: number;
  username: string;
  email: string;
  avatar?: string;
  data?: UserData;
}
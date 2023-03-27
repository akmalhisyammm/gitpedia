export interface IQuiz {
  id: number;
  type: 'fill' | 'choice';
  question: string;
  answer: string;
  options?: string[];
}

export interface ILesson {
  id: number;
  title: string;
  content: string;
  quiz: IQuiz[];
}

export interface IChapter {
  id: number;
  title: string;
  thumbnail: string;
  lessons: ILesson[];
}

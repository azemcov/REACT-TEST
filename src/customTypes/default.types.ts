export interface IQuestionProps {
  questionID: number;
  question: string;
  answerOptions?: string[];
  action?: Function;
  memory: TMemory;
  currentQuestionNumber: number;
}
export interface IData {
  questionID: number;
  question: string;
  answerOptions?: string[];
  type: 'single' | 'much' | 'short' | 'detailed';
  answersCode: number | boolean[] | string;
}
export type TMemory = number | boolean[] | string;

import { ProblemType } from '../types/problem';

export default interface Runner {
  run: (problem: ProblemType, code: string) => any;
}

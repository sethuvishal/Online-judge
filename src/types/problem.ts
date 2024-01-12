import { $Enums } from '@prisma/client';

export type CreateProblem = {
  title: string;
  description: string;
  input_types: string[];
  code_snippets: string;
  test_cases: string;
};

export type ProblemType = {
  id: string;
  no: number;
  title: string;
  description: string;
  input_types: string[];
  test_cases: string;
  code_snippets: string;
  submission_count: number;
  accepted: number;
  difficulty: $Enums.Difficulty;
  timeLimit: number;
  memoryLimit: number;
};

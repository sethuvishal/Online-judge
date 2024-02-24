import { $Enums, CodeSnippet } from '@prisma/client';

export type CreateProblem = {
  title: string;
  description: string;
  codeSnippets: CodeSnippet[];
  test_cases: string;
};

export type UpdateProblem = {
  title: string;
  description: string;
  test_cases: string;
};

export type ProblemType = {
  id: string;
  no: number;
  title: string;
  description: string;
  test_cases: string;
  submission_count: number;
  accepted: number;
  codeSnippets: CodeSnippet[];
  difficulty: $Enums.Difficulty;
  timeLimit: number;
  memoryLimit: number;
};

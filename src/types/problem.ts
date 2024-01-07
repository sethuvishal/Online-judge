import { Prisma } from '@prisma/client';

export type CreateProblem = {
  title: string;
  description: string;
  input_types: string[];
  template?: string;
  test_cases: Prisma.InputJsonValue[];
};

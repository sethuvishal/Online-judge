import { JudgeStatus, Language } from '@prisma/client';

export type createSubmissionType = {
  code: string;
  language: Language;
  problemId: string;
};

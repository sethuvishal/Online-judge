import { Language } from '@prisma/client';

export type createCodeSnippet = {
  problemId: string;
  lang: Language;
  code: string;
};

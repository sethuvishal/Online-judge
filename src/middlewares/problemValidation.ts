import { body, check } from 'express-validator';

export const createProblemValidation = [
  check('title').isString(),
  check('description').isString(),
  check('test_cases').custom((testCases: string) => {
    try {
      JSON.parse(testCases);
      return true;
    } catch (err) {
      console.log(err);
    }
    return false;
  }),
];

export const testCaseValidation = [
  body('test_cases').custom((testCases: string) => {
    try {
      JSON.parse(testCases);
      return true;
    } catch (err) {}
    return false;
  }),
];

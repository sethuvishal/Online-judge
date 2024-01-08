import { body, check } from 'express-validator';

export const createProblemValidation = [
  check('title').isString(),
  check('description').isString(),
  check('input_types')
    .isArray()
    .custom((types: string[]) =>
      types.every((type) => typeof type === 'string')
    ),

  check('test_cases')
    .optional()
    .isArray()
    .custom((types: JSON[]) =>
      types.every((type: JSON) => {
        try {
          JSON.stringify(type);
          return true;
        } catch (err) {
          throw new Error('Invalid JSON format for test_cases');
        }
      })
    ),
];

export const testCaseValidation = [
  body('test_cases')
    .isArray()
    .custom((types: JSON[]) =>
      types.every((type: JSON) => {
        try {
          JSON.stringify(type);
          return true;
        } catch (err) {
          throw new Error('Invalid JSON format for test_cases');
        }
      })
    ),
];

import { NextApiRequest, NextApiResponse } from 'next';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

export const errorHandler = (error: Error, req: NextApiRequest, res: NextApiResponse) => {
  if (error instanceof ValidationError) {
    const errors: ValidationErrors = {};

    error.inner.forEach((err) => {
      errors[err.path] = err.errors;
    });

    return res.status(400).json({ message: 'Validation Error', errors });
  }
  return res.status(500).json({ message: 'Internal server error' });
};

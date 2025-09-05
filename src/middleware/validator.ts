import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { ApiError } from './errorHandler';

// Middleware to validate request data
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Execute all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Format validation errors
    const extractedErrors: { [key: string]: string } = {};
    errors.array().forEach(err => {
      if (err.type === 'field' && err.path) {
        extractedErrors[err.path] = err.msg;
      }
    });

    // Return validation errors
    return next(new ApiError(400, 'Validation Error: ' + JSON.stringify(extractedErrors)));
  };
};
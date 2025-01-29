/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../interface/error';
import { ZodError } from 'zod';
import handleZodError from '../error/handleZodError';
import mongoose from 'mongoose';
import handleMongooseValidationError from '../error/handleMongooseValidationError';
import handleCastError from '../error/handleCastError';
import handleDuplicateError from '../error/handleDuplicateError';
import AppError from '../error/AppError';
import handleAppError from '../error/handleAppError';
import NotFoundError from '../error/NotFoundError';
import handleNotFoundError from '../error/handleNotFoundError';
import AuthError from '../error/AuthError';
import handleAuthError from '../error/handleAuthError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const message = err.message || 'Something went wrong';

  const errorSources: TErrorSources = [
    {
      path: '',
      message: message,
    },
  ];
  let simplifiedError = {
    statusCode: 500,
    message,
    error: errorSources,
  };
  if (err instanceof ZodError) {
    simplifiedError = handleZodError(err);
  } else if (err instanceof mongoose.Error.ValidationError) {
    simplifiedError = handleMongooseValidationError(err);
  } else if (err instanceof mongoose.Error.CastError) {
    simplifiedError = handleCastError(err);
  } else if (err?.code === 11000) {
    simplifiedError = handleDuplicateError(err);
  } else if (err instanceof AppError) {
    simplifiedError = handleAppError(err);
  } else if (err instanceof AuthError) {
    simplifiedError = handleAuthError(err);
  } else if (err instanceof NotFoundError) {
    simplifiedError = handleNotFoundError(err);
  } else {
    simplifiedError = {
      ...simplifiedError,
      message: err?.message,
    };
  }
  res.status(simplifiedError.statusCode).json({
    success: false,
    ...simplifiedError,
  });
};

export default globalErrorHandler;

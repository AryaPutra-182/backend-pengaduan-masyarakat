export function successResponse(res, data, message = 'Success') {
  return res.status(200).json({
    message,
    data,
  });
}

export function createdResponse(res, data, message = 'Resource created successfully') {
  return res.status(201).json({
    message,
    data,
  });
}

export function errorResponse(res, error, message = 'An error occurred') {
  return res.status(error.status || 500).json({
    message,
    errors: error.errors || [error.message],
  });
}

// Backwards-compatible helpers that return plain objects (used by controllers)
export function SuccessResponse(data, message = 'Success') {
  return { message, data };
}

export function ErrorResponseObject(message = 'An error occurred', error = null) {
  return { message, errors: error?.errors || [error?.message || message] };
}

export function notFoundResponse(res, message = 'Resource not found') {
  return res.status(404).json({
    message,
  });
}

export function unauthorizedResponse(res, message = 'Unauthorized') {
  return res.status(401).json({
    message,
  });
}

export function forbiddenResponse(res, message = 'Forbidden') {
  return res.status(403).json({
    message,
  });
}

const defaultExport = {
  successResponse,
  createdResponse,
  errorResponse,
  notFoundResponse,
  unauthorizedResponse,
  forbiddenResponse,
};

export default defaultExport;

// Backwards-compatible ErrorResponse class used throughout the codebase
export class ErrorResponse extends Error {
  constructor(message = 'An error occurred', status = 500, errors = null) {
    super(message);
    this.status = status;
    this.errors = errors || [message];
  }
}

// Also include in default export
defaultExport.ErrorResponse = ErrorResponse;
defaultExport.SuccessResponse = SuccessResponse;
defaultExport.ErrorResponseObject = ErrorResponseObject;
defaultExport.ErrorResponse = ErrorResponse;
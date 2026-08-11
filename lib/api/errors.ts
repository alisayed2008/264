export abstract class ApiError extends Error {
  abstract readonly code: string;
  abstract readonly httpStatus: number;
}
export class ValidationError extends ApiError { readonly code = "VALIDATION_ERROR"; readonly httpStatus = 400; }
export class UnauthenticatedError extends ApiError { readonly code = "UNAUTHENTICATED"; readonly httpStatus = 401; constructor(message = "Authentication required.") { super(message); } }
export class ForbiddenError extends ApiError { readonly code = "FORBIDDEN"; readonly httpStatus = 403; constructor(message = "You don't have access to this resource.") { super(message); } }
export class NotFoundError extends ApiError { readonly code = "NOT_FOUND"; readonly httpStatus = 404; constructor(message = "Not found.") { super(message); } }
export class ConflictError extends ApiError { readonly code = "CONFLICT"; readonly httpStatus = 409; }
export class RateLimitedError extends ApiError { readonly code = "RATE_LIMITED"; readonly httpStatus = 429; constructor(message = "Too many requests. Try again shortly.") { super(message); } }
export class InternalError extends ApiError { readonly code = "INTERNAL_ERROR"; readonly httpStatus = 500; constructor(message = "Something went wrong on our end.") { super(message); } }

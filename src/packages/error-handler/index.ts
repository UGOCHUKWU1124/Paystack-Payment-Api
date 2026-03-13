export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly details?: Record<string, any>; // 👈 always an object
    public readonly errorCode: string;

    constructor(
        message: string,
        statusCode: number,
        errorCode = "APP_ERROR",
        isOperational = true,
        details?: Record<string, any>
    ) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;
        this.errorCode = errorCode;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            success: false,
            errorCode: this.errorCode,
            message: this.message,
            ...(this.details ? { details: this.details } : {}),
        };
    }
}

// Not Found Error
export class NotFoundError extends AppError {
    constructor(message = "Resource not found", details?: Record<string, any>) {
        super(message, 404, "NOT_FOUND", true, details);
    }
}

// Validation Error
export class ValidationError extends AppError {
    constructor(message = "Invalid request data", details?: Record<string, any>) {
        super(message, 400, "VALIDATION_ERROR", true, details);
    }
}


// Database Error
export class DatabaseError extends AppError {
    constructor(message = "Database error", details?: Record<string, any>) {
        super(message, 500, "DATABASE_ERROR", true, details);
    }
}

//Bad request error
export class BadRequestError extends AppError {
    constructor(message = "Bad request", details?: Record<string, any>) {
        super(message, 400, "BAD_REQUEST", true, details);
    }
}
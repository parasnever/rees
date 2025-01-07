export class AppError extends Error {
  status: number;
  message: string;
  meta?: any;
  constructor(message: string, status: number, meta?: any) {
    super(message);
    this.message = message;
    this.status = status;
    this.meta = meta;

    Error.captureStackTrace(this);
  }
}

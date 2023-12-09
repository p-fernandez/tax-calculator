export class BadRequestError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    this.status = 400;
  }
}

export class InternalServerError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = 'InternalServerError';
    this.status = 500;
  }
}

export class NotFoundError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

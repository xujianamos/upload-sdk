export class UploadError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'UploadError';
  }
}

export class TokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenError';
  }
}
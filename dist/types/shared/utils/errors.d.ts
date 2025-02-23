export declare class UploadError extends Error {
    code: string;
    constructor(message: string, code: string);
}
export declare class TokenError extends Error {
    constructor(message: string);
}

import { status } from '@grpc/grpc-js';
export const MAPPING = new Map([
    // 1xx Informational
    [100, status.UNKNOWN], // Continue
    [101, status.UNKNOWN], // Switching Protocols
    [102, status.UNKNOWN], // Processing
    [103, status.UNKNOWN], // Early Hints
    // 2xx Success
    [200, status.OK], // OK
    [201, status.OK], // Created
    [202, status.OK], // Accepted
    [203, status.OK], // Non-Authoritative Information
    [204, status.OK], // No Content
    [205, status.OK], // Reset Content
    [206, status.OK], // Partial Content
    [207, status.OK], // Multi-Status
    [208, status.OK], // Already Reported
    [226, status.OK], // IM Used
    // 3xx Redirection
    [300, status.UNKNOWN], // Multiple Choices
    [301, status.UNKNOWN], // Moved Permanently
    [302, status.UNKNOWN], // Found
    [303, status.UNKNOWN], // See Other
    [304, status.UNKNOWN], // Not Modified
    [305, status.UNKNOWN], // Use Proxy
    [307, status.UNKNOWN], // Temporary Redirect
    [308, status.UNKNOWN], // Permanent Redirect
    // 4xx Client errors
    [400, status.INVALID_ARGUMENT], // Bad Request
    [401, status.UNAUTHENTICATED], // Unauthorized
    [402, status.FAILED_PRECONDITION], // Payment Required
    [403, status.PERMISSION_DENIED], // Forbidden
    [404, status.NOT_FOUND], // Not Found
    [405, status.UNIMPLEMENTED], // Method Not Allowed
    [406, status.INVALID_ARGUMENT], // Not Acceptable
    [407, status.UNAUTHENTICATED], // Proxy Authentication Required
    [408, status.DEADLINE_EXCEEDED], // Request Timeout
    [409, status.ABORTED], // Conflict
    [410, status.NOT_FOUND], // Gone
    [411, status.INVALID_ARGUMENT], // Length Required
    [412, status.FAILED_PRECONDITION], // Precondition Failed
    [413, status.RESOURCE_EXHAUSTED], // Payload Too Large
    [414, status.INVALID_ARGUMENT], // URI Too Long
    [415, status.INVALID_ARGUMENT], // Unsupported Media Type
    [416, status.OUT_OF_RANGE], // Range Not Satisfiable
    [417, status.FAILED_PRECONDITION], // Expectation Failed
    [418, status.UNKNOWN], // I'm a teapot
    [421, status.INVALID_ARGUMENT], // Misdirected Request
    [422, status.INVALID_ARGUMENT], // Unprocessable Entity
    [423, status.PERMISSION_DENIED], // Locked
    [424, status.FAILED_PRECONDITION], // Failed Dependency
    [425, status.ABORTED], // Too Early
    [426, status.FAILED_PRECONDITION], // Upgrade Required
    [428, status.FAILED_PRECONDITION], // Precondition Required
    [429, status.RESOURCE_EXHAUSTED], // Too Many Requests
    [431, status.INVALID_ARGUMENT], // Request Header Fields Too Large
    [451, status.PERMISSION_DENIED], // Unavailable For Legal Reasons
    [499, status.CANCELLED], // Client Closed Request
    // 5xx Server errors
    [500, status.INTERNAL], // Internal Server Error
    [501, status.UNIMPLEMENTED], // Not Implemented
    [502, status.UNAVAILABLE], // Bad Gateway
    [503, status.UNAVAILABLE], // Service Unavailable
    [504, status.DEADLINE_EXCEEDED], // Gateway Timeout
    [505, status.UNIMPLEMENTED], // HTTP Version Not Supported
    [506, status.UNKNOWN], // Variant Also Negotiates
    [507, status.RESOURCE_EXHAUSTED], // Insufficient Storage
    [508, status.INTERNAL], // Loop Detected
    [510, status.UNIMPLEMENTED], // Not Extended
    [511, status.UNAUTHENTICATED], // Network Authentication Required
]);
export function errToStatus(err) {
    return MAPPING.get(err.httpStatus) ?? status.UNKNOWN;
}

export const ERROR = {
    NOT_FOUND: 'User ID not found. Please check the ID and try again',
    INVALID_URL: 'Invalid endpoint: please check and try again',
    INVALID_ID: 'Invalid ID: please check the ID and try again',
    SERVER_ERROR: 'Internal server error',
    INVALID_METHOD: 'Invalid method: please check and try again',
    CONTAIN_FIELDS: 'Request body does not contain required fields',
    WRONG_TYPES: 'Request body fields have wrong types',
    STH_WRONG: 'Something is wrong! Please check and try again'
}

export const STATUS = {
    INVALID: 400,
    NOT_FOUND: 404,
    SUCCESS: 200,
    CREATE: 201,
    REMOVE: 204,
    SERVER_ERROR: 500
}
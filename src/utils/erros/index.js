module.exports.NotFoundError = class NotFoundError extends Error {
    constructor(message = 'Not Found') {
        super(message);
        this.name = "NotFoundError";
        this.code = 404;
    }
};

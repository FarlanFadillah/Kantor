class CustomError extends Error {
    constructor(text, type, status = 500) {
        super(text);
        this.type = type;
        this.status = status;
    }
}

module.exports = {
    CustomError
}
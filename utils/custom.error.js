class CustomError extends Error {
    constructor(text, type) {
        super(text);
        this.type = type
    }
}

module.exports = {
    CustomError
}
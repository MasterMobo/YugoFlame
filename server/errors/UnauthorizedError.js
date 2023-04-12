const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./CustomAPIError");

class UnauthorizedError extends CustomAPIError {
    constructor(message) {
        super(message || "Access denied", StatusCodes.UNAUTHORIZED);
    }
}

module.exports = UnauthorizedError;

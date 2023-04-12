const CustomAPIError = require("./CustomAPIError");
class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message || "Not found", 404);
    }
}
module.exports = NotFoundError;

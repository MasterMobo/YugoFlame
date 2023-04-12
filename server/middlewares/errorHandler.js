const errorHandler = (error, req, res, next) => {
    const defaultError = {
        status: error.statusCode || 500,
        message: error.message || "Something went wrong",
    };

    res.status(defaultError.status).json({ message: defaultError });
};

module.exports = errorHandler;

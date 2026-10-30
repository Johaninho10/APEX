const errorMiddleware = async (err, req, res, next) => {
    console.log(err);
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
        success: false,
        message: res.statusCode === 200 ? "Internal server error" : err.message,
    });
};
export default errorMiddleware;
//# sourceMappingURL=error.middleware.js.map
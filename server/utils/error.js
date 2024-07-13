const errorHandler = (statusCode,message) =>{
    const error = new Error();
    error.statusCode = statusCode;
    errorhandler.message = message;
    return error;
};

export default errorHandler;
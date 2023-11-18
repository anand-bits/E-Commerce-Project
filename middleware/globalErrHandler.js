export const globalErrHandler = (err, req, res, next) => {
    // Stack
    const stack = err?.stack;
    // Status Code
    const statusCode = err?.statusCode || 500;
    // Message
    const message = err?.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        stack
    });
};


export const notFound=(req,res,next)=>
{
    const err= new Error(`Route ${req.orginalUrl} not found`);
    next(err);
    
}

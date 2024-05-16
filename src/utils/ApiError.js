// This ApiError class extends the built-in Error 
//class in JavaScript to create custom error objects
// that can be used in an API. It allows you to specify 
//a status code, message, and optional errors array
// for more detailed error handling.

class ApiError extends Error{
    constructor(
     statusCode,
     message="Something went wrong",
     errors=[],
     stack=""
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false
        this.errors=errors

        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}
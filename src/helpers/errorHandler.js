const { request, response } = require("express");

const errorHandler = (res, err) =>{
    if(err?.message?.includes("unauthorized")){
        return res.status(400).json({
            success: false,
            message: "Error: authorization is failed!"
        })
    }
    console.log(err)
    return res.status(500).json({
        success: false,
        message: "Error: Internal server error"
    })
}

module.exports = errorHandler

const userModel = require("../../../models/users/users.model")
const profileModel = require("../../../models/users/profile.model")
const forgotRequestModel = require("../../../models/users/forgotPassword.model")
const errorHandler = require("../../../helpers/errorHandler")
const jwt = require("jsonwebtoken")
const {APP_SECRET}= process.env
const argon = require("argon2")

exports.register = async (req, res)=>{
    try {
        const {password} = req.body
        const hash = await argon.hash(password)
        const data = {
            ...request.body,
            password: hash
        }
        const register = await userModel.insert(data)
        console.log(register)
        if(register){
            const dataProfile = {
                userId: register.id
            }
            await profileModel.insert(dataProfile)
            const token = jwt.sign({id: user.id}, APP_SECRET)
            return res.json({
                success: true,
                message: "Register Success!",
                results: (token)
            })
        }
        
    } catch (err) {
        return errorHandler(res,err)
    }
}

exports.login = async (req, res)=>{
    try {
        const {email, password} = req.body
        const user = await userModel.findOneByEmail(email)
        if(!user.email){
            throw Error("wrong_credentials")
        }
        const verify = await argon.verify(user.password, password)
        if(!verify){
            throw Error("wrong_credentials")
        }
        const token = jwt.sign({id: user.id}, APP_SECRET)
        return res.json({
            success: true,
            message: "Login Success",
            results: token
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.forgotPassword = async(request, response)=>{
    try {
        const {email} = request.body
        const user = await userModel.findOneByEmail(email)
        if(!user){
            throw Error("user not found")
        }
        const randomNumber = Math.random()
        const rounded = Math.round(randomNumber * 100)
        const padded = String(rounded).padEnd(6, "0")

        const reqForgotPassword = await requestRequestModel.insert({
            email: user.email,
            code: padded
        })
        if(!reqForgotPassword){
            throw Error("request_failed")
        }
        return response.json({
            success: true,
            message: "Request resets passwod success"
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}

exports.resetPassword = async (request, response) =>{
    try {
        const {code, email, password} = request.body
        const findReq = await forgotRequestModel.findOneByEmail(email)
        if(!findReq){
            throw Error("reset_failed")
        }
        if(code !== findReq.code){
            throw Error("code_wrong")
        }
        const userData = await userModel.findOneByEmail(email)
        const data ={
            password: await argon.hash(password)
        }

        const user = await userModel.update(userData.id, data)
        if(!user){
            throw Error("reset_failed")
        }
        return response.json({
            success: true,
            message: "Reset password success"
        })
    } catch (err) {
        return errorHandler(res,err)
    }
}



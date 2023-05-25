const profileModel = require("../models/profile.model");
const errorHendler = require("../helpers/errorHandler.helper");
const userModel = require("../models/users.model");

exports.getProfileByUserId = async (req, res)=>{
    try {
        const {id} = req.user;
        const data = await profileModel.findOne(id);
        if(!data){
            throw Error("user not found");
        }
        return res.json({
            success: true,
            message: "Get profile success",
            results: data
        });
    } catch (err) {
        return errorHendler(res, err);
    }
};

exports.update = async(req, res)=>{
    try {
        const {id} = req.user;
        const data = {...req.body};
        const profileUpdate = await profileModel.update(id, data);
        if(!profileUpdate){
            throw Error("Update profile failed");
        }

        if(req.file){
            data.picture = req.file.path;
        }

        let userData;
        if(data.email){
            userData = await userModel.update(id, data);
        }else{
            userData = await userModel.findOne(id);
        }

        const update = {
            ...data,
            email: userData?.email,
            username: userData?.username
        };

        return res.json({
            success: true,
            message: "Update profile success",
            results: update
        });
    } catch (err) {
        return errorHendler(res, err);
    }
};





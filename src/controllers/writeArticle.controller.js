const articleModel = require("../models/articles.model");
const categoryModel = require("../models/categories.model");
const errorHandler = require("../helpers/errorHandler.helper");
const usersModel = require("../models/users.model");

exports.createArticle = async (request, response) => {
    try {
        const { id } = request.user;
        const user = await usersModel.findOne(id);
        if(!user){
            throw Error("user not found");
        }
        let data;
        if(user.role === "superadmin"){
            console.log("test");
            data = {
                ...request.body,
                createdBy: id,
                status: true,
            };
        }else{
            data = {
                ...request.body,
                createdBy: id,
                status: false,
            };
        }
        if (request.file) {
            data.picture = request.file.path;
        }
        const category = await categoryModel.findOne(data.categoryId);
        if (!category) {
            throw Error("category_not_found");
        }
        const crtArticle = await articleModel.insert(data);
        if (!crtArticle) {
            throw Error("Create article failed");
        }
        return response.json({
            success: true,
            message: "Write article success",
            results: crtArticle,
        });
    } catch (err) {
        return errorHandler(response, err);
    }
};

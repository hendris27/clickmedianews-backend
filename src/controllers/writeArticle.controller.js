const articleModel = require("../models/articles.model");
const categoryModel = require("../models/categories.model");
const errorHandler = require("../helpers/errorHandler.halper");

exports.createArticle = async (request, response) =>{
    try {
        const {id} = request.user;
        const data = {
            ...request.body,
            createdBy: id,
            status: false
        };
        const crtArticle = await articleModel.insert(data);
        if(!crtArticle){
            throw Error("Create article failed");
        }
        if(request.file){
            data.picture = request.file.path;
        }
        await categoryModel.insert(data.category);
        return response.json({
            success: true,
            message: "Write article success",
            results: crtArticle
        });
    } catch (err) {
        return errorHandler(response, err);
    }
};

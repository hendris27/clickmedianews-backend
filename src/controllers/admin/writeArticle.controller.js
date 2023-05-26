const articleModel = require("../../models/articles.model");
const errorHandler = require("../../helpers/errorHandler.helper");
const categoryModel = require("../../models/categories.model");

exports.createArticle = async (request, response) =>{
    try {
        const {id} = request.user;
        console.log(id);
        const data = {
            ...request.body,
            createdBy: id,
            status: false
        };
        if (request.file) {
            data.picture = request.file.path;
        }
        console.log(data);
        const dataCategory = await categoryModel.findOne(data.category);
        if(!dataCategory){
            throw Error("category_not_found");
        }
        const crtArticle = await articleModel.insert(data);
        console.log(crtArticle);
        if(!crtArticle){
            throw Error("Create article failed");
        }
        return response.json({
            success: true,
            message: "Write article success",
            results: crtArticle
        });
    } catch (err) {
        return errorHandler(response, err);
    }
};

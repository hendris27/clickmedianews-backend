const articleModel = require("../../models/articles.model");
const errorHandler = require("../../helpers/errorHandler.helper");

exports.getArticle = async (request, response) => {
    try {
        const article = await articleModel.findAllArticle(request.query);
        return response.json({
            success: true,
            message: "article",
            results: article,
        });
    } catch (err) {
        return errorHandler(response, err);
    }
};

exports.createArticle = async (request, response) => {
    try {
        const createArticle = await articleModel.insert(request.body);
        return response.json({
            success: true,
            message: `Create Article ${request.body.name} successfully`,
            result: createArticle
        });
    }catch(err) {
        errorHandler(response, err);
    }
};

exports.updateArticle = async (request, response) => {
    try {
        const updateArticle = await articleModel.update(request.params.id, request.body);
        if(!updateArticle){
            throw Error("id_doesn't_exist");
        }
        if(validate("idParams")){
            return response.json({
                success: true,
                message: "Update Article successfully",
                results: updateArticle
            });
        }
    }catch(err) {
        errorHandler(response, err);
    }
};

exports.deleteArticle = async (request, response) => {
    try {
        const data = await articleModel.destroy(request.params.id);
        if(data) {
            return response.json({
                success: true,
                message: "Delete article successfully",
                result: data
            });
        }
        return response.status(404).json({
            success: false,
            message: "Error: article not found",
        });
    }catch(err) {
        errorHandler(response, err);
    }
};

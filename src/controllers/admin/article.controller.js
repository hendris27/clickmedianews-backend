const articleModel = require("../../models/articles.model");
const errorHandler = require("../../helpers/errorHandler.helper");

exports.getArticle = async function (request, response) {
    try {
        const { rows: results, pageInfo } = await articleModel.findAllArticle(request.params);
        return response.json({
            success: true,
            message: "Get save post success",
            pageInfo,
            results,
        });
    } catch (error) {
        return errorHandler(response, error);
    }
};

exports.getOneArticle = async function(request, response){
    try {
        const data = await articleModel.findOne(request.params.id);
        if(!data){
            throw Error("article not found");
        }
        return response.json({
            success: true,
            message: "Article get success",
            results: data
        });
    } catch (error) {
        return errorHandler(response, error);
    }
};

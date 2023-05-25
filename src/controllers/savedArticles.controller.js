const savePosteModel = require("../models/savedArticles.model");
const errorHandler = require("../helpers/errorHandler.helper");

exports.getSavePost = async function (request, response) {
    try {
        const { id } = request.user;
        const { rows: results, pageInfo } = await savePosteModel.findAll(
            request.params,
            id
        );
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

exports.deleteSavePost = async function (request, response) {
    try {
        const data = await savePosteModel.findOne(
            request.body.id,
            request.user
        );
        if (!data) {
            throw Error("article not found");
        }
        const dltArticle = await savePosteModel.destroy(
            request.body.id,
            request.user
        );
        if (dltArticle) {
            return response.json({
                success: true,
                message: "Article unsave success",
                results: dltArticle,
            });
        }
    } catch (error) {
        return errorHandler(response, error);
    }
};

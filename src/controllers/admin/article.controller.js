const articleModel = require("../../models/articles.model");
const errorHandler = require("../../helpers/errorHandler.helper");

exports.getArticle = async function (request, response) {
    try {
        const { rows: results, pageInfo } = await articleModel.findAllArticle(request.query);
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

exports.getArticleManage = async function (request, response) {
    try {
        const {id} = request.user;
        if(!id){
            throw Error("article not found");
        }
        const { rows: results, pageInfo } = await articleModel.findAllArticleManage(request.query, id);
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

exports.getOneArticleManage = async function (request, response) {
    try {
        const {id} = request.user;
        if(!id){
            throw Error("article not found");
        }
        const { rows: results, pageInfo } = await articleModel.findOneArticleManage(request.query, id, request.params.id);
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

exports.deleteArticle = async function(request, response){
    try {
        const data = await articleModel.findOne(request.params.id);
        if(!data){
            throw Error("article not found");
        }
        const deleteData = await articleModel.destroy(request.params.id);
        return response.json({
            success: true,
            message: "Delete article success",
            results: deleteData
        });
    } catch (error) {
        return errorHandler(response,error);
    }
};

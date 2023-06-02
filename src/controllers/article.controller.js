const articleModel = require("../models/articles.model");
const articleLikeModel = require("../models/articleLikes.model");
const notificationModel = require("../models/notification.model");
const userModel = require("../models/users.model");
const errorHandler = require("../helpers/errorHandler.helper");

exports.getAllArticle = async function (request, response) {
    try {
        const { rows: results, pageInfo } = await articleModel.findAllArticle(
            request.query
        );
        return response.json({
            success: true,
            message: "List of all articles",
            pageInfo,
            results,
        });
    } catch (error) {
        return errorHandler(response, error);
    }
};

exports.getDetailArticle = async (req, res) => {
    const { id } = req.params;
    const article = await articleModel.findOne(id);
    return res.json({
        success: true,
        message: `${article.title}`,
        results: article,
    });
};

exports.getDetailArticleLoggedUser = async (req, res) => {
    const { id } = req.user;
    const article = await articleModel.findOneByUserId(id, req.params.id);
    return res.json({
        success: true,
        message: `${article.title}`,
        results: article,
    });
};

exports.toggleLikes = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await userModel.findOne(id);
        const article = await articleModel.findOne(req.params.id);
        if (!article) {
            throw Error("article_not_found");
        }
        const like = await articleLikeModel.findOneByUserAndArticleId(
            id,
            req.params.id
        );
        if (like) {
            await articleLikeModel.destroy(like.id);
        } else {
            await articleLikeModel.insert({
                userId: id,
                articleId: req.params.id,
            });
            await notificationModel.insert({
                text: `${user.email} just like your post ${article.title}`,
                articleId: article.id,
                recipientId: article.createdBy,
                senderId: user.id,
            });
        }
        return res.json({
            success: true,
            message: "Toggle likes success",
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.getArticleManage = async function (request, response) {
    try {
        const { id } = request.user;
        if (!id) {
            throw Error("article not found");
        }
        const { rows: results, pageInfo } =
            await articleModel.findAllArticleManage(request.query, id);
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
        const { id } = request.user;
        if (!id) {
            throw Error("article not found");
        }
        const { rows: results, pageInfo } =
            await articleModel.findOneArticleManage(
                request.query,
                id,
                request.params.id
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

exports.deleteArticle = async function (request, response) {
    try {
        const article = await articleModel.findOne(request.params.id);
        if (!article) {
            throw Error("article not found");
        }
        const data = await articleModel.destroy(request.params.id);
        return response.json({
            success: true,
            message: "Delete article success",
            results: data,
        });
    } catch (error) {
        return errorHandler(response, error);
    }
};

//UNTUK HOME CATEGORY
exports.getArticleInCategories = async (request, response) => {
    try {
        const category = await articleModel.findArticleInCategories12(
            request.query
        );
        return response.json({
            success: true,
            message: "category",
            results: category,
        });
    } catch (err) {
        return errorHandler(response, err);
    }
};

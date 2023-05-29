const savePosteModel = require("../models/savedPost.model");
const articleModel = require("../models/articles.model");
// const profileModel = require("../models/profile.model");
const errorHandler = require("../helpers/errorHandler.helper");

exports.getAllSavedPost = async (req, res) => {
    try {
        const data = { ...req.query };
        const savedPost = await savePosteModel.findAllSavedArticle(data);
        return res.json({
            success: true,
            message: "List of all saved article",
            results: savedPost,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

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

exports.getALLSavePost = async function (request, response) {
    try {

        const {id} = request.user;
        const findArticle = await articleModel.findAllSavedArticle(id);
        return response.json({
            success: true,
            message: "savePost",
            results: findArticle

        });
    } catch (err) {
        return errorHandler(response, err);
    }
};

exports.getSavePosts = async (request, response) => {
    try {
        const {id} = request.user;
        const {articleId} = request.body;
        const savePost = await savePosteModel.findOne(articleId, id);
        if(savePost) {
            return response.json({
                success: true,
                message: "save article",
                results: savePost
            });
        }
    }catch(err) {
        return errorHandler(response, err);
    }
};

// exports.deleteSavePost = async function (request, response) {
//     try {
//         const data = await savePosteModel.findOne(
//             request.body.id,
//             request.user
//         );
//         if (!data) {
//             throw Error("article not found");
//         }
//         const dltArticle = await savePosteModel.destroy(
//             request.body.id,
//             request.user
//         );
//         if (dltArticle) {
//             return response.json({
//                 success: true,
//                 message: "Article unsave success",
//                 results: dltArticle,
//             });
//         }
//     } catch (error) {
//         return errorHandler(response, error);
//     }
// };

exports.deleteSavePost = async (request, response) => {
    try {
        const {id} = request.user;
        const articleId = request.params.id;
        const savePost = await savePosteModel.destroy(articleId, id);
        return response.json({
            success: true,
            message: "Delete save post successfully",
            result: savePost,
        });
    } catch (err) {
        errorHandler(response, err);
    }
};

exports.createSavePost = async (request, response) => {
    try {
        const { id } = request.user;
        let { articleId } = request.body;
        const findArticle = await articleModel.findOne(articleId);
        if (!findArticle) {
            throw Error("article_not_found");
        }
        const createSavePost = await savePosteModel.insert({
            articleId,
            userId: id,
        });
        createSavePost;
        return response.json({
            success: true,
            message: "Create save post successfully",
            result: createSavePost,
        });
    } catch (err) {
        errorHandler(response, err);
    }
};

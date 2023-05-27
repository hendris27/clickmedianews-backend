const savePosteModel = require("../models/savedPost.model");
const articleModel = require("../models/articles.model");
// const profileModel = require("../models/profile.model");
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

exports.getSavePost1 = async function (request, response) {
    try {
        const {id} = request.user;
        // const savePost = await savePosteModel.findAllSavedArticle(id);
        const findArticle = await articleModel.findAllSavedArticle(id);
        return response.json({
            success: true,
            message: "savePost",
            results: findArticle
        });
    }catch(err) {
        return errorHandler(response, err);
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

// exports.createSavePost = async (request, response) => {
//     try {
//         const {id} = request.user;
//         let {articleId} = request.body;
//         const createSavePost = await savePosteModel.insert({articleId, userId: id});
//         console.log(createSavePost, "1");
//         const findArticle = await articleModel.findAllArticle1(articleId);
//         console.log(findArticle, "2");
//         const findProfile = await profileModel.findOneByUserId(id);
//         console.log(findProfile, "3");

//         const result = {
//             findArticle,
//             findProfile
//         };

//         createSavePost;
//         return response.json({
//             success: true,
//             message: "Create save post successfully",
//             result
//         });
//     }catch(err) {
//         errorHandler(response, err);
//     }
// };

const commentModel = require("../models/articleComments.model");
// const articleModel = require("../models/articles.model");
const errorHandler = require("../helpers/errorHandler.helper");


// exports.createComment = async (request, response) => {
//     try {
//         const {id} = request.user;
//         let {articleId} = request.body;
//         const findArticle = await articleModel.findOne(articleId);
//         if(findArticle){
//             await commentModel.insert({
//                 userId: id, 
//                 articleId: findArticle.id, 
//                 commentText: request.body.commentText
//             });
            
//             const findComment = await commentModel.findOneByUserIdAndArticleId(id, findArticle.id);
//             return response.json({
//                 success: true,
//                 message: "comment",
//                 results: findComment
//             });
//         }
//     }catch(err) {
//         return errorHandler(response, err);
//     }
// };

exports.createComment = async (request, response) => {
    try {
        const {id} = request.user;
        let {articleId, commentText} = request.body;
        const insertComment = await commentModel.insert({articleId, userId: id, commentText});

        insertComment;
        return response.json({
            success: true,
            message: "Create comment successfully",
            results: insertComment
        });
    }catch(err) {
        return errorHandler(response, err);
    }
};

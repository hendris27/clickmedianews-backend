const commentModel = require("../../../models/comments.model");
const articleModel = require("../../../models/article.model");
const errorHandler = require("../../../helpers/errorHandler");


exports.createComment = async (request, response) => {
    try {
        const {id} = request.user;
        let {articleId, commentUser} = request.body;
        const findArticle = await articleModel.findOne(articleId);
        if(findArticle){
            await commentModel.insert({userId: id, articleId: findArticle.id, textComment: commentUser});
            
            const findComment = await commentModel.findOneByUserIdAndArticleId(id, findArticle.id);
            return response.json({
                success: true,
                message: "comment",
                results: findComment
            });
        }
    }catch(err) {
        return errorHandler(response, err);
    }
};

const errorHandler = require("../../helpers/errorHandler.helper");
const savedArticleModel = require("../../models/savedArticles.model");
// const userModel = require("../../models/admin/users.model");

exports.getSavedArticle = async (request, response) => {
    try {
        const { id } = request.user;
        const savedArticle = await savedArticleModel.findOneByUserId(id);
        if (!savedArticle) {
            throw Error("unauthorized");
        }
        return response.json({
            success: true,
            message: "Saved article",
            results: savedArticle,
        });
    } catch (err) {
        return errorHandler(response, err);
    }
};

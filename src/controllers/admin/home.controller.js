const articleModel = require("../../models/articles.model");
const errorHandler = require("../../helpers/errorHandler.halper");

exports.getHomeAdmin = async (request, response) => {
    try {
        const article = await articleModel.findAllArticle(request.query);
        return response.json({
            success: true,
            message: "home",
            results: article
        });
    }catch(err) {
        return errorHandler(response, err);
    }
};

const articleModel = require("../../../models/article.model");
const errorHandler = require("../../../helpers/errorHandler");

exports.getHome = async (request, response) => {
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

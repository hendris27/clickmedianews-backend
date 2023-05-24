const articleModel = require("../../../models/home.model");
const errorHandler = require("../../../helpers/errorHandler");

exports.getArticle = async (request, response) => {
    try {
        const article = await articleModel.findAllArticle(request.query);
        return response.json({
            success: true,
            message: "article",
            results: article
        });
    }catch(err) {
        return errorHandler(response, err);
    }
};

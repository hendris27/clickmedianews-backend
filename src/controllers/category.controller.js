const categoriesModel = require("../models/categories.model");
const articleModel = require("../../../models/article.model");
const errorHandler = require("../../../helpers/errorHandler");


exports.getCategory = async (request, response) => {
    try {
        const category = await categoriesModel.findAll(request.query);
        const article = await articleModel.findAllArticle(request.query);
        const results = {
            category,
            article: article.picture
        };
        return response.json({
            success: true,
            message: "category",
            results
        });
    }catch(err) {
        return errorHandler(response, err);
    }
};

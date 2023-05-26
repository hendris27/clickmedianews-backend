const categoriesModel = require("../models/categories.model");
const articleModel = require("../models/articles.model");
const errorHandler = require("../helpers/errorHandler.helper");


exports.getCategory = async (request, response) => {
    try {
        const category = await categoriesModel.findAll(request.params);
        const article = await articleModel.findAllArticle(request.params);
      
        const results = {
            category,
            article: article.picture
        };
        return response.json({
            success: true,
            message: "category",
            results: results.category
        });
    }catch(err) {
        return errorHandler(response, err);
    }
};

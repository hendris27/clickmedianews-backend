const articleCategoriesModel = require("../models/articleCategories.model");
const errorHandler = require("../helpers/errorHandler.helper");

exports.getAllArticleCategory = async (request, response) => {
    try {
        const data = { ...request.query };
        const category = await articleCategoriesModel.findAllArticleCategory(data);
        if (!category) {
            return errorHandler(response, undefined);
        }
        return response.json({
            success: true,
            message: "categories",
            results: category,
        });
    } catch (err) {
        return errorHandler(response, err);
    }
};

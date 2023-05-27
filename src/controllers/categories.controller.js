const categoriesModel = require("../models/categories.model");
const articleModel = require("../models/articles.model");
const articleCategoriesModel = require("../models/articleCategories.model");
const errorHandler = require("../helpers/errorHandler.helper");

exports.createArticleCategories = async (request, response) => {
    try {
        let {articleId, categoryId} = request.body;
        const createArticleCategories = await articleCategoriesModel.insert({articleId, categoryId});
        const findCategories = await categoriesModel.findOne(categoryId);
        console.log(findCategories)
        const findArticle = await articleModel.findOne(articleId);
        console.log(findArticle)
        const result = {
            picture: findArticle.picture,
            category: findCategories.name
        };

        createArticleCategories;
        return response.json({
            success: true,
            message: "Create article categories successfully",
            result
        });
    }catch(err) {
        errorHandler(response, err);
    }
};

exports.getCategory = async (request, response) => {
    try {
        const category = await categoriesModel.findAllCategories(request.params);

        return response.json({
            success: true,
            message: "category",
            results: category
        });
    }catch(err) {
        return errorHandler(response, err);
    }
};

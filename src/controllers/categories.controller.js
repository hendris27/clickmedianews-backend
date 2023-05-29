const categoriesModel = require("../models/categories.model");
const articleModel = require("../models/articles.model");
const articleCategoriesModel = require("../models/articleCategories.model");
const errorHandler = require("../helpers/errorHandler.helper");

exports.getAllCategory = async (request, response) => {
    try {
        const data = { ...request.query };
        const category = await categoriesModel.findAll(data);
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

exports.getArticleInCategories = async (request, response) => {
    try {
        const category = await categoriesModel.findArticleInCategories(
            request.params
        );
        return response.json({
            success: true,
            message: "category",
            results: category,
        });
    } catch (err) {
        return errorHandler(response, err);
    }
};

exports.createArticleCategories = async (request, response) => {
    try {
        let { articleId, categoryId } = request.body;
        const findArticle = await articleModel.findOne(articleId);
        const findCategories = await categoriesModel.findOne(categoryId);
        if (!findArticle) {
            throw Error("article not found");
        }
        if (!findCategories) {
            throw Error("category_not_found");
        }
        const createArticleCategories = await articleCategoriesModel.insert({
            articleId,
            categoryId,
        });
        const result = {
            picture: findArticle.picture,
            category: findCategories.name,
        };

        createArticleCategories;
        return response.json({
            success: true,
            message: "Create article categories successfully",
            result,
        });
    } catch (err) {
        errorHandler(response, err);
    }
};

exports.deleteCategories = async (request, response) => {
    try {
        console.log("tes");
        const categoryId = request.params.id;
        console.log(categoryId);
        const { role } = request.user;
        console.log(role);
        if (role !== "Super Admin") {
            return response.status(401).json({
                success: false,
                message: "Unauthorized: Only admin can delete categories",
            });
        }
        const deletedCategory = await articleCategoriesModel.destroy(
            categoryId
        );
        if (deletedCategory) {
            return response.json({
                success: true,
                message: "Delete category successfully",
                result: deletedCategory,
            });
        }
        return response.status(404).json({
            success: false,
            message: "Error: Category not found",
        });
    } catch (err) {
        errorHandler(response, err);
    }
};

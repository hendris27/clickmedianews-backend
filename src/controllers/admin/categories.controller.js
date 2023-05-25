const categoriesModel = require("../../models/categories.model");
const articleModel = require("../../models/articles.model");
const errorHandler = require("../../helpers/errorHandler.halper");


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

exports.createCategories = async (req, res) => {
    try {
        const data = { ...req.body };
        const createCategories = await categoriesModel.insert(data);
        return res.json({
            success: true,
            message: "Create categories successfully",
            results: createCategories,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.updateCategories = async (req, res) => {
    try {
        const data = { ...req.body };
        const Categories = await categoriesModel.update(
            req.params.id,
            data
        );
        if (!Categories) {
            return errorHandler(res, undefined);
        }
        return res.json({
            success: true,
            message: "Update categories successfully",
            results: Categories,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.deleteCategories = async (req, res) => {
    try {
        const data = await categoriesModel.destroy(req.params.id);
        if (!data) {
            return errorHandler(res, undefined);
        }
        return res.json({
            success: true,
            message: "Delete categories successfully",
            results: data,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

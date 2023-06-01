const articleModel = require("../../models/articles.model");
const errorHandler = require("../../helpers/errorHandler.helper");
const categoryModel = require("../../models/categories.model");

exports.createArticle = async (request, response) => {
    try {
        const { id } = request.user;
        const data = {
            ...request.body,
            createdBy: id,
            status: true,
        };
        if (request.file) {
            data.picture = request.file.path;
        }
        const dataCategory = await categoryModel.findOne(data.categoryId);
        if (!dataCategory) {
            throw Error("category_not_found");
        }
        const crtArticle = await articleModel.insert(data);
        if (!crtArticle) {
            throw Error("Create article failed");
        }
        return response.json({
            success: true,
            message: "Write article success",
            results: crtArticle,
        });
    } catch (err) {
        return errorHandler(response, err);
    }
};

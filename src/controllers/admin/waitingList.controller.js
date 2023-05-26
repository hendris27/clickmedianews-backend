const articleModel = require("../../models/articles.model");
const errorHandler = require("../../helpers/errorHandler.helper");

exports.getArticle = async (request, response) => {
    try {
        const article = await articleModel.findAllArticle(request.query);
        return response.json({
            success: true,
            message: "article",
            results: article,
        });
    } catch (err) {
        return errorHandler(response, err);
    }
};

exports.updateArticle = async function (request, response) {
    try {
        const article = await articleModel.findOne(request.body);
        if (!article) {
            throw Error("Article not found");
        }
        if (!article.status) {
            const data = {
                ...request.body,
            };
            if (request.file) {
                data.picture = request.file.path;
            }
            const accPublished = await articleModel.update(article.id);
            return response.json({
                success: true,
                message: "Article published success",
                results: accPublished,
            });
        }
    } catch (err) {
        return errorHandler(response, err);
    }
};

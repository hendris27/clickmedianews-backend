const articleModel = require("../../models/articles.model");
const errorHandler = require("../../helpers/errorHandler.helper");

exports.getAllArticle = async (request, response) => {
    try {
        const { rows: article, pageInfo } = await articleModel.findAllArticle(
            request.query
        );
        return response.json({
            success: true,
            message: "List of all articles",
            pageInfo,
            results: article,
        });
    } catch (err) {
        return errorHandler(response, err);
    }
};

exports.updateArticle = async function (request, response) {
    try {
        const { articleId } = request.body;
        const article = await articleModel.findOne(articleId);
        if (!article) {
            throw Error("Article not found");
        }
        if (!article.status) {
            const data = {
                ...request.body,
                status: true,
            };
            if (request.file) {
                data.picture = request.file.path;
            }
            const accPublished = await articleModel.update(article.id, data);
            if (accPublished) {
                return response.json({
                    success: true,
                    message: "Article published success",
                    results: accPublished,
                });
            } else {
                throw Error("published failed");
            }
        }
    } catch (err) {
        return errorHandler(response, err);
    }
};

exports.ignoreArticle = async function (request, response) {
    try {
        const { articleId } = request.body;
        const data = await articleModel.findOne(articleId);
        if (!data) {
            throw Error("article not found");
        }
        const deleteArticle = await articleModel.destroy(articleId);
        if (deleteArticle) {
            return response.json({
                success: true,
                message: "Delete aticle success",
                results: deleteArticle,
            });
        } else {
            throw Error("Ignore article failed");
        }
    } catch (error) {
        return errorHandler(response, error);
    }
};

exports.updateArticleByParams = async function (request, response) {
    try {
        const { id } = request.params;
        const article = await articleModel.findOne(id);
        if (!article) {
            throw Error("Article not found");
        }
        if (article) {
            const data = {
                ...request.body,
                status: true,
            };
            if (request.file) {
                data.picture = request.file.path;
            }
            const accPublished = await articleModel.update(id, data);
            if (accPublished) {
                return response.json({
                    success: true,
                    message: "Article published success",
                    results: accPublished,
                });
            } else {
                throw Error("published failed");
            }
        }
    } catch (err) {
        return errorHandler(response, err);
    }
};

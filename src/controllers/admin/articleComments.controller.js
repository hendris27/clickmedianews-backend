const articleCommentModel = require("../../models/articleComment.model");
const errorHandler = require("../../helpers/errorHandler.helper");

exports.getAllArticleComment = async (req, res) => {
    try {
        const data = { ...req.query };
        const articleComment = await articleCommentModel.findAll(data);
        return res.json({
            success: true,
            message: "List of all article comment",
            results: articleComment,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.getOneArticleComment = async (req, res) => {
    try {
        const data = await articleCommentModel.findOne(req.params.id);
        if (!data) {
            return errorHandler(res, undefined);
        }
        return res.json({
            success: true,
            message: "Detail article comment",
            results: data,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.createArticleComment = async (req, res) => {
    try {
        const data = { ...req.body };
        const articleComment = await articleCommentModel.insert(data);
        return res.json({
            success: true,
            message: "Create article comment successfully",
            results: articleComment,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.updateArticleComment = async (req, res) => {
    try {
        const data = { ...req.body };
        const articleComment = await articleCommentModel.update(
            req.params.id,
            data
        );
        if (!articleComment) {
            return errorHandler(res, undefined);
        }
        return res.json({
            success: true,
            message: "Update article comment successfully",
            results: articleComment,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.deleteArticleComment = async (req, res) => {
    try {
        const data = await articleCommentModel.destroy(req.params.id);
        if (!data) {
            return errorHandler(res, undefined);
        }
        return res.json({
            success: true,
            message: "Delete article comment successfully",
            results: data,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

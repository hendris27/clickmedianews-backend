const articleLikeModel = require("../models/articleLikes.model");
const errorHandler = require("../helpers/errorHandler.halper");

exports.getAllArticleLike = async (req, res) => {
    try {
        const data = { ...req.query };
        const articleLike = await articleLikeModel.findAll(data);
        return res.json({
            success: true,
            message: "List of all article like",
            results: articleLike,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.getOneArticleLike = async (req, res) => {
    try {
        const data = await articleLikeModel.findOne(req.params.id);
        if (!data) {
            return errorHandler(res, undefined);
        }
        return res.json({
            success: true,
            message: "Detail article like",
            results: data,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.createArticleLike = async (req, res) => {
    try {
        const data = { ...req.body };
        const articleLike = await articleLikeModel.insert(data);
        return res.json({
            success: true,
            message: `Create article like ${req.body.fullName} successfully`,
            results: articleLike,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.updateArticleLike = async (req, res) => {
    try {
        const data = { ...req.body };
        const articleLike = await articleLikeModel.update(req.params.id, data);
        if (!articleLike) {
            return errorHandler(res, undefined);
        }
        return res.json({
            success: true,
            message: "Update article like successfully",
            results: articleLike,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

exports.deleteArticleLike = async (req, res) => {
    try {
        const data = await articleLikeModel.destroy(req.params.id);
        if (!data) {
            return errorHandler(res, undefined);
        }
        return res.json({
            success: true,
            message: "Delete articleLike successfully",
            results: data,
        });
    } catch (err) {
        return errorHandler(res, err);
    }
};

const articleComments = require("../models/articleComments.model");
const errorHandler = require("../helpers/errorHandler.helper");

exports.getAllByArticleId = async (request, response) => {
    try {
        const { id } = request.params;
        const { rows: results, pageInfo } =
            await articleComments.findAllByArticleId(request.query, id);
        if (!results) {
            throw Error("nothing commants");
        }
        return response.json({
            success: true,
            message: "Get commants success",
            pageInfo,
            results,
        });
    } catch (error) {
        return errorHandler(response, error);
    }
};

exports.createComment = async (request, response) => {
    try {
        const { id } = request.user;
        const data = {
            ...request.body,
            userId: id,
        };
        const comment = await articleComments.insert(data);
        if (!comment) {
            throw Error("create comment failed");
        }
        return response.json({
            success: true,
            message: "Create comment success",
            results: comment,
        });
    } catch (error) {
        return errorHandler(response, error);
    }
};

exports.deleteComments = async (request, response) => {
    try {
        const { id } = request.user;
        const comment = await articleComments.destroyByUserIdArticleId(
            request.params.id,
            id
        );
        if (!comment) {
            throw Error("comment delete failed");
        }
        return response.json({
            success: true,
            message: "Delete comments success",
            results: comment,
        });
    } catch (error) {
        return errorHandler(response, error);
    }
};

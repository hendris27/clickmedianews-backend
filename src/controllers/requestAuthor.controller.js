const requestAuthorModel = require("../models/requestAuthor.model");
const errorHandler = require("../helpers/errorHandler.helper");

exports.reqAuthor = async (request, response)=>{
    try {
        const {id} = request.user;
        const isAuthor = await requestAuthorModel.insert(id);
        if(!isAuthor){
            throw Error("request author failed");
        }
        return response.json({
            success: true,
            message: "Request author sented",
            results: isAuthor
        });
    } catch (error) {
        return errorHandler(response, error);
    }
};

exports.deleteRequest = async (request, response)=>{
    try {
        const {id} = request.params;
        const dataRequestAuthor = await requestAuthorModel.findOne(id);
        if(!dataRequestAuthor){
            throw Error("request author not found");
        }
        console.log(dataRequestAuthor);
        const deleteRequest = await requestAuthorModel.destroy(id);
        return response.json({
            success: true,
            message: "Delete request success",
            results: deleteRequest
        });
    } catch (error) {
        return errorHandler(response, error);
    }
};

exports.getAll = async (request, response)=>{
    try {
        const reqAuthor = await requestAuthorModel.findAll(request.query);
        return response.json({
            success: true,
            message: "Get request author",
            results: reqAuthor
        });
    } catch (error) {
        return errorHandler(response, error);
    }
};

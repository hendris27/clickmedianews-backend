const articleModel = require("../../../models/articles.model");
const errorHandler = require("../../../helpers/errorHandler.halper");


exports.getArticle = async (request, response) => {
    try {
        const article = await articleModel.findAllArticle(request.query);
        return response.json({
            success: true,
            message: "article",
            results: article
        });
    }catch(err) {
        return errorHandler(response, err);
    }
};

exports.createArticle = async (request, response) =>{
    try {
        const {id} = request.user;
        const data = {
            ...request.body,
            createdBy: id
        };
        const crtArticle = await articleModel.insert(data);
        if(!crtArticle){
            throw Error("Create article failed");
        }
        if(request.file){
            data.picture = request.file.path;
        }
        return response.json({
            success: true,
            message: "Write article success",
            results: crtArticle
        });
    } catch (err) {
        return errorHandler(response, err);
    }
};

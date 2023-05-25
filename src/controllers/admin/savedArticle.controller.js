const errorHandler = require("../../helpers/errorHandler.halper");
const profileModel = require("../../models/admin/profile.model");
// const userModel = require("../../models/admin/users.model");

exports.getSavedArticle = async (request, response) => {
    try {
        const {id} = request.user;
        const profile = await profileModel.findOneByUserId(id);
        if(!profile) {
            throw Error("unauthorized");
        }
        return response.json({
            success: true,
            message: "Profile",
            results: profile
        });
    }catch(err) {
        return errorHandler(response, err);
    }
};

exports.createSavedArticle= async (request, response) => {
    try {
        const createSavedArticle= await profileModel.insert(request.body);
        return response.json({
            success: true,
            message: `Create SavedArticle${request.body.name} successfully`,
            result: createSavedArticle
        });
    }catch(err) {
        errorHandler(response, err);
    }
};

exports.updateSavedArticle= async (request, response) => {
    try {
        const updateSavedArticle= await profileModel.update(request.params.id, request.body);
        if(!updateSavedArticle){
            throw Error("id_doesn't_exist");
        }
        if(validate("idParams")){
            return response.json({
                success: true,
                message: "Update SavedArticlesuccessfully",
                results: updateSavedArticle
            });
        }
    }catch(err) {
        errorHandler(response, err);
    }
};

exports.deleteSavedArticle= async (request, response) => {
    try {
        const data = await profileModel.destroy(request.params.id);
        if(data) {
            return response.json({
                success: true,
                message: "Delete SavedArticle successfully",
                result: data
            });
        }
        return response.status(404).json({
            success: false,
            message: "Error: SavedArticle not found",
        });
    }catch(err) {
        errorHandler(response, err);
    }
};

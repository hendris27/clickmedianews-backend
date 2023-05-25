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

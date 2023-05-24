const homeModel = require("../../../models/home.model");
const errorHandler = require("../../../helpers/errorHandler");

exports.getHome = async (request, response) => {
    try {
        const home = await homeModel.findAllArticle(request.query);
        return response.json({
            success: true,
            message: "home",
            results: home
        });
    }catch(err) {
        return errorHandler(response, err);
    }
};

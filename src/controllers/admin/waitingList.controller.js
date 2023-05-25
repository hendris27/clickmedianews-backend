const articleModel = require("../../models/articles.model")
const categoryModel = require("../../models/categories.model")

exports.getAll = async function(req, res){
    try {
        const data = await articleModel.findAllArticle(id)
    } catch (err){
        
    }
}

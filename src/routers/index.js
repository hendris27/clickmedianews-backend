const router = require("express").Router();
const authMiddleweres = require("../middlewares/auth.middleware");

router.get("/", (req, res) => {
    return res.json({
        success: true,
        massage: "Backend is running well",
    });
});

router.use("/admin", require("./admin"));
router.use("/auth", require("./auth.router"));
router.use("/admin/articles", require("./admin/articles.router"));
router.use("/admin/article-likes", require("./admin/articleLikes.router"));
router.use(
    "/admin/article-comments",
    require("./admin/articleComments.router")
);
router.use("/admin/category", require("./admin/categories.router"));
router.use("/admin/users", require("./admin/users.router"));
router.use("/admin/write-article",  authMiddleweres, require("./admin/writeArticle.router"));
router.use("/admin/waiting-lists", require("./admin/waitingLists.router"));
router.use("/admin/saved-article", require("./admin/savedArticle.router"));
router.use("/admin/search-result", require("./admin/searchResult.router"));

router.use("/articles", require("./articles.router"));
router.use("/categories", require("./categories.router"));
router.use("/profile", require("./profile.router"));
router.use("/article-view", require("./articleView.router"));
router.use("/write-article", authMiddleweres, require("./writeArticle.router"));
router.use("/saved-article", require("./savedArticles.router"));
router.use("/article-likes", require("./articleLikes.router"));

router.use("*", (req, res) => {
    return res.status(404).json({
        success: false,
        massage: "Resorce not found",
    });
});

module.exports = router;

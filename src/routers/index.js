const router = require("express").Router();

router.get("/", (req, res) => {
    return res.json({
        success: true,
        massage: "Backend is running well",
    });
});

router.use("/auth/admin", require("./auth/admin/auth.router"));
router.use("/admin", require("./admin/admin.router"));
router.use("/admin/articles", require("./admin/articles.router"));
router.use("/admin/categories", require("./admin/categories.router"));
router.use("/admin/write-article", require("./admin/writeArticle.router"));
router.use("/admin/waiting-list", require("./admin/waitingList.router"));
router.use("/admin/saved-article", require("./admin/savedArticle.router"));
router.use("/admin/search-result", require("./admin/searchResult.router"));

router.use("/auth/users", require("./auth/users/auth.router"));
router.use("/users/articles", require("./users/articles.router"));
router.use("/users/categories", require("./users/categories.router"));
router.use("/users/profile", require("./users/profile.router"));
router.use("/users/article-view", require("./users/articleView.router"));
router.use("/users/write-article", require("./users/writeArticle.router"));
router.use("/users/saved-article", require("./users/savedArticles.router"));
router.use("/users/article-likes", require("./users/articleLikes.router"));

router.use("*", (req, res) => {
    return res.status(404).json({
        success: false,
        massage: "Resorce not found",
    });
});

module.exports = router;

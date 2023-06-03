const router = require("express").Router();
const authMiddleweres = require("../middlewares/auth.middleware");

router.get("/", (req, res) => {
    return res.json({
        success: true,
        massage: "Backend is running well",
    });
});

router.use("/admin", authMiddleweres, require("./admin"));
router.use("/auth", require("./auth.router"));
router.use("/admin/articles", require("./admin/articles.router"));
router.use("/admin/category", require("./admin/categories.router"));
router.use(
    "/admin/article-view",
    authMiddleweres,
    require("./admin/articleView.router")
);
router.use("/admin/users", authMiddleweres, require("./admin/users.router"));
router.use(
    "/admin/waiting-lists",
    authMiddleweres,
    require("./admin/waitingLists.router")
);
router.use("/admin/search-result", require("./admin/searchResult.router"));

router.use("/articles", require("./articles.router"));
router.use(
    "/request-author",
    authMiddleweres,
    require("./requestAuthor.router")
);
router.use("/categories", require("./categories.router"));
router.use("/articlesCategories", require("./articlesCategories.router"));
router.use("/profile", authMiddleweres, require("./profile.router"));
router.use("/article-view", require("./articleView.router"));
router.use("/article-comments", require("./articleComments.router"));
router.use("/write-article", authMiddleweres, require("./writeArticle.router"));
router.use(
    "/saved-article",
    authMiddleweres,
    require("./savedArticles.router")
);
router.use("/article-likes", authMiddleweres, require("./articleLikes.router"));
router.use("/notifications", authMiddleweres, require("./notification.router"));

router.use("*", (req, res) => {
    return res.status(404).json({
        success: false,
        massage: "Resorce not found",
    });
});

module.exports = router;

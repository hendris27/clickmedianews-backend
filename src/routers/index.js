const router = require("express").Router();

router.get("/", (req, res) => {
    return res.json({
        success: true,
        massage: "Backend is running well",
    });
});

router.use("/auth/admin", require("./auth/admin/auth.router"));
router.use("/auth/user", require("./auth/users/auth.router"));
router.use("/admin", require("./admin/admin.router"));
router.use("/article/user", require("./users/article.router"));
router.use("/category/user", require("./users/category.router"));
router.use("/home/user", require("./users/home.router"));
router.use("/profile/user", require("./users/profile.router"));
router.use("/articleView/users", require("./users/articleView.router"));

router.use("*", (req, res) => {
    return res.status(404).json({
        success: false,
        massage: "Resorce not found",
    });
});

module.exports = router;

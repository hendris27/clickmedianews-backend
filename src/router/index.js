const router = require("express").Router();
// const authMiddleweres = require("../middlewares/auth.middleware");

router.get("/", (req, res)=>{
    return res.json({
        success: true,
        massage: "Backend is running well"
    })
})

router.use("/auth/user", require("./users/auth.router"))
router.use("/home", require("./home.router"));
router.use("/article", require("./article.router"));
router.use("/category", require("./category.router"));


router.use("*", (req, res)=>{
    return res.status(404).json({
        success: false,
        massage: "Resorce not found"
    });
});

module.exports = router;


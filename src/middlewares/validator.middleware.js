const { body, param, validationResult } = require("express-validator");

const emailFormat = body("email").isEmail().withMessage("Email is not valid");

const passwordFormat = body("password")
    .isStrongPassword()
    .withMessage(
        "Password must be strong, at least 8 characters and must include capital letters, numbers and symbols"
    );

const confirmPasswordFormat = body("confirmPassword")
    .custom((value, { req }) => {
        return value === req.body.password;
    })
    .withMessage("Confirm password does not match");

const phoneNumberFormat = body("phoneNumber")
    .isLength({ min: 10 })
    .withMessage("Number length must be at least 10 digits");

const rules = {
    authLogin: [emailFormat],
    authRegister: [emailFormat, passwordFormat, phoneNumberFormat],
    authForgotPassword: [emailFormat],
    authResetPassword: [
        body("code")
            .isLength({ min: 6 })
            .withMessage("Code length must be at least 6 digits"),
        emailFormat,
        passwordFormat,
        confirmPasswordFormat,
    ],
    updateProfile: [
        body("username")
            .optional()
            .isLength({ min: 3 })
            .withMessage("Username length is not valid, at least 3 characters"),
        body("fullName")
            .optional()
            .isLength({ min: 3, max: 80 })
            .withMessage(
                "Full name length is not valid, at least 3 characters"
            ),
        body("email").optional().isEmail().withMessage("Email is not valid"),
        body("password")
            .optional()
            .isStrongPassword()
            .withMessage(
                "Password must be strong, at least 8 characters and must include capital letters, numbers and symbols"
            ),
        body("profession")
            .optional()
            .isLength({ min: 2 })
            .withMessage(
                "Profession length is not valid, at least 2 characters"
            ),
        body("about")
            .optional()
            .isLength({ max: 250 })
            .withMessage("About length is not valid, max 250 characters"),
    ],
    idParams: [
        param("id")
            .toInt()
            .isDecimal()
            .withMessage("Id is not valid")
            .isInt({ min: 1 })
            .withMessage("Id need to be more than 0"),
    ],
};

const validator = (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            throw Error("validation");
        }
        return next();
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            results: errors.array(),
        });
    }
};

const validate = (selectedRules) => [rules[selectedRules], validator];

module.exports = validate;

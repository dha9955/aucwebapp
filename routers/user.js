const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConfig = require("../middleware/passport");

//
const userController = require("../controllers/user");
const user = require("../controllers/user");

//
router
  .route("/")
  .get(userController.getAllUsers)
  .delete(userController.deleteUser);

// A
router
  .route("/auth/google")
  .post(
    passport.authenticate("google-token", { session: false }),
    userController.authGoogle
  );
router
  .route("/auth/facebook")
  .post(
    passport.authenticate("facebook-token", { session: false }),
    userController.authFacebook
  );

// S
router.route("/signup").post(userController.signUp);
router
  .route("/signin")
  .post(
    passport.authenticate("local", { session: false }),
    userController.signIn
  );
router
  .route("/secret")
  .get(passport.authenticate("jwt", { session: false }), userController.secret);

module.exports = router;

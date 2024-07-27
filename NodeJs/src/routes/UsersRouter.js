const UserController = require("../controllers/UserController");
const express = require("express");
const router = express.Router();
const upload = require("../cloudinary/multer");
const middlewaresUser = require("../middlewares/AuthenticationUser");
router.post("/checkUser", UserController.checkUser);
router.post("/sendSMSEmail", UserController.sendSMSEmail);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/createUser", UserController.createUser);
router.post(
  "/updateUser",
  middlewaresUser.authenticationUser,
  UserController.updateUser
);
router.post("/getUser", UserController.getUsers);
router.get("/getAllUser", UserController.getAllUsers);
router.post("/getListAddresss", UserController.getListAddresss);
router.post("/deleteUser", UserController.deleteUser);
router.post(
  "/AdminUploadAvatar",
  upload.single("images"),
  UserController.AdminUploadAvatar
);
router.post("/createNewAddress", UserController.createNewAddress);
router.post(
  "/setAddressDefault",
  middlewaresUser.authenticationUser,
  UserController.updateDefaultAddress
);
router.post(
  "/updatePhone",
  middlewaresUser.authenticationUser,
  UserController.updatePhone
);
router.post(
  "/updatePassword",
  middlewaresUser.authenticationUser,
  UserController.updatePassword
);
router.post("/createUserAdmin", UserController.createUserAdmin);
router.post(
  "/updatePasswordByEmail",
  middlewaresUser.authenticationUser,
  UserController.updatePasswordByEmail
);
router.post("/refreshTokenByUser", UserController.refreshTokenByUser);
router.post(
  "/checkAccessUser",
  middlewaresUser.authenticationUser,
  UserController.checkAccessUser
);
router.post(
  "/updateListAddress",
  middlewaresUser.authenticationUser,
  UserController.updateListAddress
);
router.post(
  "/uploadAvatar",
  upload.single("images"),
  middlewaresUser.authenticationUser,
  UserController.uploadAvatar
);
router.post("/AdminSearchUser", UserController.AdminSearchUser);
router.post("/loginWithSocial", UserController.loginWithSocial);

module.exports = router;

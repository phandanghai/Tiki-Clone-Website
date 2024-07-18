const UserController = require('../controllers/UserController');
const express = require('express');
const router = express.Router();
const upload = require('../cloudinary/multer');

router.post('/checkUser', UserController.checkUser);
router.post('/sendSMSEmail', UserController.sendSMSEmail);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/createUser', UserController.createUser);
router.post('/updateUser', UserController.updateUser);
router.post('/getUser', UserController.getUsers);
router.get('/getAllUser', UserController.getAllUsers);
router.post('/getListAddresss', UserController.getListAddresss);
router.post('/deleteUser', UserController.deleteUser);
router.post('/uploadAvatar', upload.single('images'), UserController.uploadAvatar);
router.post('/createNewAddress', UserController.createNewAddress);
router.post('/setDefaultAddress', UserController.setDefaultAddress);
router.post('/updatePhone', UserController.updatePhone);
router.post('/updatePassword', UserController.updatePassword);
router.post('/createUserAdmin', UserController.createUserAdmin);
router.post('/updatePasswordByEmail', UserController.updatePasswordByEmail);

module.exports = router;

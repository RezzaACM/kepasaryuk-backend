const router = require('express').Router()
const categoryController = require('../controllers/category.controller');
const adminController = require('../controllers/admin.controller');
const userController = require('../controllers/user.controller')
const verify = require('../middleware/verifyToken');

// routing

// category
router.post('/category/create', categoryController.create);
router.get('/category/get', verify, categoryController.findAll);
router.get('/category/getId/:id', categoryController.findById);

// admin 
router.post('/admin/register', adminController.register)
router.post('/admin/login', adminController.login)

// auth user
router.post('/user/register', verify, userController.register)
router.post('/user/login', verify, userController.login)
router.get('/user/email_verification/:token', userController.findTokenUser);

module.exports = router;
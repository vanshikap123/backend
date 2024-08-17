const express = require('express');
const { createUser, loginUser, getAllUsers, deleteUser, updateUser, getSingleUser, testing, testingDelete, forgetpassword, getUserToken, updatePassword } = require('../controller/userController');
const varify = require('../middelware/varifyToken');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
// router.delete('/del',deleteUser);
router.delete('/del/:_id', deleteUser);
router.put('/update', updateUser);
router.get('/single/:_id', getSingleUser)
router.post('/testing', varify, testing)
router.get('/reset/:token', getUserToken)
router.post('/reset/:token', updatePassword)
router.delete('/testingDelete/:_id', varify, testingDelete)
router.post('/forgetpassword', forgetpassword)

module.exports  =  router;
const express = require('express');
const { createpost, getAllpost, updatepost, deletepost, singlepost, getAllUserspost } = require('../controller/postController');
const router = express.Router();

router.post('/create', createpost),
    router.get('/allpost/:_id', getAllpost),
    router.put('/update/:_id', updatepost),
    router.delete('/delete/:_id', deletepost)
router.get('/single/:_id', singlepost)
router.get('/allposts', getAllUserspost)



module.exports = router;
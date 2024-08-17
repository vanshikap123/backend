const userpost = require('../models/postSchema')

let createpost = async(req, res) => {
    let { title, image, author, content } = req.body
    try {
        let post = await userpost.create({
            title,
            image,
            author,
            content,

        })
        res.json({ msg: "post created successfully", post })
    } catch (error) {
        res.json({ msg: "error in creating post", error })
    }
}

let getAllpost = async(req, res) => {


    try {
        let post = await userpost.find({ author: req.params._id }).populate({ path: "author" })
        res.json({ msg: "all post fetched successfully", post })
    } catch (error) {
        res.json({ msg: "error in fetching all posts", error })
    }



}
let getAllUserspost = async(req, res) => {
    try {
        let posts = await userpost.find().populate({ path: "author" })
        res.json({ msg: "all post fetched successfully", posts })
    } catch (error) {
        res.json({ msg: "error in fetching all posts", error })

    }
}

let updatepost = async(req, res) => {
    const { title, image, content, author } = req.body
    let obj = {};
    if (title) {
        obj.title = title
    }
    if (image) {
        obj.image = image
    }
    if (content) {
        obj.content = content
    }
    try {
        let post = await userpost.findByIdAndUpdate(req.params._id, { $set: obj }, { new: true })
        res.json({ msg: "post updated successfully", post })
    } catch (error) {
        res.send({ msg: "update is not successfully", error })
    }


}
let singlepost = async(req, res) => {
    try {
        let single = await userpost.findById(req.params._id)
        res.json({ msg: "post updated successfully", single })
    } catch (error) {
        res.send({ msg: "update is not successfully", error })

    }

}
let deletepost = async(req, res) => {
    try {
        let post = await userpost.findByIdAndDelete(req.params._id)
        res.json({ msg: "post deleted successfully", post })
    } catch (error) {
        res.json({ msg: "error in deleting post", error })
    }
}



module.exports = {
    createpost,
    getAllpost,
    updatepost,
    singlepost,
    deletepost,
    getAllUserspost
}
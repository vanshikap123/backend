const express = require('express');
const app = express()
const port = 4000
const connecttodb = require('./db');
const UserSchema = require('./models/UserSchema');
let userrouter = require('./routes/userroutes');
const postSchema = require('./models/postSchema');
const postRoutes = require('./routes/postRoutes');
const multer = require('multer')
const cloudinary = require('cloudinary').v2
app.use(express.json({ limit: '50mb' }))
connecttodb()
const cors = require('cors')
app.use(cors())
app.set('view engine', 'ejs');
app.use('/user', userrouter)
app.use('/posts', postRoutes)



cloudinary.config({
    cloud_name: 'dmlnlyo8j',
    api_key: '114893969542199',
    api_secret: 'pB7UEHkNv25pRJxivihLETHFjiA'
})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})


const upload = multer({ storage: storage })

app.post('/uploadvideo', upload.single('video'), async(req, res) => {
    let { title, author, content } = req.body
        // res.send(`File uploaded successfully: ${req.file.originalname}`)
    let result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "video",
            folder: "uploads"
        })
        // res.send(result.secure_url)

    let post = await postSchema.create({
        title: title,
        video: result.secure_url,
        author: author,
        content: content
    })
    res.send({ msg: "video saved successfully", post })
})

app.post('/uploadImage', upload.single('image'), async(req, res) => {
    let { title, author, content } = req.body
        // res.send(`File uploaded successfully: ${req.file.originalname}`)
    let result = await cloudinary.uploader.upload(req.file.path)
    console.log(result)
        // res.send(result.secure_url)

    let post = await postSchema.create({
        title: title,
        image: result.secure_url,
        author: author,
        content: content
    })
    res.send({ msg: "image saved successfully", post })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
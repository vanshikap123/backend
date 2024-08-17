let UserModel = require('../models/UserSchema')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Jwt_Secret = "hellboy"
const crypto = require('crypto')
const nodemailer = require('nodemailer')
    // create user

let createUser = async(req, res) => {

    let { name, email, password, address } = req.body

    if (!name) {
        return res.json({ msg: "name is required", success: false })
    }
    if (!email) {
        return res.json({ msg: "email is required", success: false })
    }
    if (!password) {
        return res.json({ msg: "password is required", success: false })
    }
    // if(!address){
    //     return res.json({msg:"address is required",success:false})
    // }

    let existingUser = await UserModel.findOne({ email: email })

    if (existingUser) {
        return res.json({ msg: "user already registered", success: false })
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(password, salt);
        console.log(password)
        console.log(hashpassword)
        try {
            let data = await UserModel.create({
                name: req.body.name,
                email: req.body.email,
                password: hashpassword
            })
            return res.json({ msg: "data saved successfully", data, success: true })
        } catch (error) {
            res.json({ msg: "error in saving data", error, success: false })
        }
    }


}

// get all users
let getAllUsers = async(req, res) => {
    let alldata = await UserModel.find()
    res.json({ data: alldata })
}

let loginUser = async(req, res) => {
    // res.send("this is login route")

    let { email, password } = req.body;
    if (!email) {
        return res.json({ msg: "email is required", success: false })
    }
    if (!password) {
        return res.json({ msg: "password is required", success: false })
    }
    let existingUser = await UserModel.findOne({ email })
    console.log(existingUser)

    if (existingUser) {
        let comparePassword = await bcrypt.compareSync(password, existingUser.password);
        if (comparePassword) {
            var token = jwt.sign({ _id: existingUser._id }, Jwt_Secret);

            return res.json({ msg: "login successfull", token, success: true, id: existingUser._id })
        } else {
            return res.json({ msg: "incorrect password", success: false })
        }
    } else {
        return res.json({ msg: "username not found", success: false })
    }

}

let updateUser = async(req, res) => {
    const { password, name, email, address, profilepic, coverPicture } = req.body

    let updatedData = await UserModel.updateOne({ email: email }, { $set: { name: name, address: address, profilepic, coverPicture, password } })
    res.send("user upadted successfully", updatedData)

}
let deleteUser = async(req, res) => {
    // console.log(req.body)
    // console.log(req.body.email)
    // await UserModel.deleteOne({email:req.body.email})
    // res.send("User deleted successfully")
    let user = await UserModel.findByIdAndDelete({ _id: req.params._id })
    res.json("user deleted successfully")
}

let getSingleUser = async(req, res) => {

    let id = req.params._id
    let user = await UserModel.findById({ _id: id })
    res.json({ data: user })

}

const testing = async(req, res) => {
    res.json({ id: req.user })

}


const testingDelete = async(req, res) => {
    console.log(req.user)
    console.log(req.params._id)
    if (req.user._id === req.params._id) {
        await UserModel.findByIdAndDelete(req.params._id)
        res.json({ msg: "user deleted successfully" })
    } else {
        res.json({ msg: "you can delete only your account" })
    }
}
const forgetpassword = async(req, res) => {
    const { email } = req.body;
    const existingUser = await UserModel.findOne({ email })
    if (!existingUser) {
        return res.json({ msg: "user not found or email wrong" })
    } else {
        let resetToken = await Tonken()
        await UserModel.updateOne({ _id: existingUser._id }, { resetToken })
        sendReset(email, resetToken)
        res.send("email send seccessfully ")

    }
}

function Tonken() {
    return crypto.randomBytes(20).toString('hex')
}

function sendReset(email, token) {
    const transp = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "abhip2517@gmail.com",
            pass: "bmtg ifhn okqz shby"
        }
    });
    const mailOptions = {
        from: "abhip2517@gmail.com",
        to: email,
        subject: "Reset Password",
        text: `To reset your password,please click on the following link: http://localhost:4000/user/reset/${token}`
    }
    transp.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("Error sending email", err);
        } else {
            console.log("Email sent: ", info.response);
        }
    })
}
const getUserToken = async(req, res) => {
    let token = req.params.token;
    let user = await UserModel.findOne({ resetToken: token })
    if (!user) {
        return res.json({ msg: "user not found or token expired" })

    } else {
        res.render('updatePassword', { token })
    }

}
const updatePassword = async(req, res) => {
    let token = req.params.token;
    console.log(token)
    let updatedToken = token.trim()
    let password = req.body.password;
    console.log(password)
    let user = await UserModel.findOne({ resetToken: updatedToken })
    console.log(user)
    if (!user) {
        return res.json({ msg: "user not found or token expired" })
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(password, salt);
        await UserModel.updateOne({ resetToken: updatedToken }, { $set: { password: hashpassword, resetToken: "" } })
        res.json({ msg: "updated successfully" })
    }
}
module.exports = {
    createUser,
    getAllUsers,
    loginUser,
    updateUser,
    deleteUser,
    getSingleUser,
    testing,
    testingDelete,
    forgetpassword,
    getUserToken,
    updatePassword

}
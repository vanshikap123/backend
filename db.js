const mongoose = require('mongoose');
require('dotenv').config()

const connecttodb = () => {
    mongoose.connect(`mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASS}@blogapp.bmtet.mongodb.net/?retryWrites=true&w=majority&appName=blogapp`)
        .then(() => console.log('Connected mongodb successfully'))
        .catch(err => console.error('Could not connect to mongodb', err))

}
module.exports = connecttodb
const mongoose = require('mongoose')

exports.connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongodb Connected')
    } catch (error) {
        console.log(error)
    }
}
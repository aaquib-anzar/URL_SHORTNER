const mongoose = require("mongoose")

const dbConnect = async(req, res) => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27018/url")
        console.log(`MongoDB connected: ${conn.connection.host}`)

    } catch (error) {
        
        console.error(`Error connection to MongoDB : ${error.message}`)
        process.exit(1)
    }
}
module.exports = {dbConnect}
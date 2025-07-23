const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
     foodType: {
        type: String,
        required:true
    },
    isHealthy:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const food = mongoose.model("Fruit",foodSchema)

module.exports = food
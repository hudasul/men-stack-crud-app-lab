// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const mongoose = require("mongoose")
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const food = require("./models/food")



// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT



async function conntectToDB(){
    try{
        await mongoose.connect(process.env.MONGOO_URL)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}

conntectToDB()





// Routes go here



// For posting we need 2 routes

app.get("/food/new",async (req,res)=>{
try{

res.render("new.ejs")


}catch(error){
    console.log(error)
}
    
})


app.post("/food/new",async (req,res)=>{
    if(req.body.isHealthy === "on"){
        req.body.isHealthy = true
    }

    try{
       const createdFood = await food.create(req.body)
       console.log(createdFood)
 
    }catch(error){
        console.log(error)
    }
    

})

app.get("/food",async (req,res)=>{
    try{
    const allFood= await food.find()
    res.render("allFood.ejs",{allFood: allFood})

    }
    catch(error){
        console.log(error)
    }
})

app.get("/food/:id",async (req,res)=>{
    try{
    const foundFood = await food.findById(req.params.id)
    res.render("food_Detail.ejs",{foundFood})
    }
    catch(error){
        console.log(error)
    }
})


app.get("/food/:id/edit",async (req,res)=>{
    try{
    res.render("new.ejs")    
    }
    catch(error){
        console.log(error)
    }
})






app.listen(3000,()=>{
    console.log("Listening on port 3000")
}) // Listen on port 3000
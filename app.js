const express=require("express");
const app=express();
const mongoose=require("mongoose");
const listing=require("./models/listing.js");
const { title } = require("process");

main()
    .then(()=>{
        console.log("connected to db");
    }) .catch((error)=>{
        console.log("error");
    });

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/myproject');
}

app.get("/",(req,res)=>{
    res.send("working");
});

app.get("/listing",async (req,res)=>{
    let samplelisting=new listing({
        title:"house",
        description:"this house is very good house every one can get this house",
        image:"https://unsplash.com/photos/brown-and-white-wooden-house-near-green-trees-during-daytime-2gDwlIim3Uw",
        price:"$10000",
        location:"TAXIES",
        country:"USA"

    });
    await samplelisting.save();
    console.log("sample was save");
    res.send("sucessfully testing");
})
app.listen(8080,()=>{
    console.log("listing to port")
});
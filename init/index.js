const mongoose=require("mongoose");
const initData=require("./data.js");
const listing=require("../models/listing.js");

main()
    .then(()=>{
        console.log("connected to db");
    }) .catch((error)=>{
        console.log("error");
    });

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/myproject');
}

const initDB=async ()=>{
    await listing.deleteMany({});
    await listing.insertMany(initData.data);
    console.log("data is insert");
}

initDB();
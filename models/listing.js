const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    } ,
    description:String,
    image:[
        {
            filename:{
                type:String,
            },
            url:{
                type:String,
                default:"https://unsplash.com/photos/a-large-library-filled-with-lots-of-books-zb9Hg1Ln76s",
                set:(v)=>
                v===""
                ?"https://unsplash.com/photos/a-large-library-filled-with-lots-of-books-zb9Hg1Ln76s"
                :v,
            }
        }
    ], 
    price:String,
    location:String,
    country:String

});


const listing=mongoose.model("listing",listingSchema);
module.exports=listing;










































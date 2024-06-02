const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const path = require("path");//to use ejs file from anywhere
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"views")));

main()
    .then(() => {
        console.log("connected to db");
    })
    .catch((error) => {
        console.log("error", error);
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/myproject');
}

app.get("/", (req, res) => {
    res.send("working");
});

// main route 
app.get("/listings", async (req, res) => {
    const allistings = await listing.find({});
    res.render("./listing/index.ejs", { allistings });
});

// new route
app.get("/listings/new", async (req, res) => {
    res.render("./listing/new.ejs");
});

// show route 
app.get("/listings/:id/show", async (req, res) => {
    let { id } = req.params;
    const listings = await listing.findById(id);
    res.render("./listing/show.ejs", { listings });
});

// create route 
app.post("/listings", async (req, res) => {
    const newlisting = new listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
});

// edit route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listings = await listing.findById(id);
    res.render("./listing/edit.ejs", { listings });
});

// update route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}/show`);
});

// delete route
app.delete("/listings/:id",async(req,res)=>{
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listings");
})
app.listen(8080, () => {
    console.log("listening to port 8080");
});

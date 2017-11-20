var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Yellowstone", 
//     image:"https://farm5.staticflickr.com/4324/35405231644_28698d7af1.jpg"}, 
//     function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Newly Created Campground: ");
//         console.log(campground);
//     }
// });


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){    
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log("Somethings wrong");
        } else {
            res.render("campgrounds", {campgrounds: campgrounds});
        }
    });
    //res.render("campgrounds",{campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = {name: name, image: image};
    Campground.create(newCamp, function(err, newcamp){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    //res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});




app.listen(5000, function(){
    console.log("Yelpcamp server up....");
});
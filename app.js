var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var seedDB = require("./seeds");
var Comment = require("./models/comment");

seedDB();
Campground = require("./models/campground")
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){    
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log("Somethings wrong");
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
    //res.render("campgrounds",{campgrounds: campgrounds});
});



app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCamp = {name: name, image: image, description: desc};
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
    res.render("campgrounds/new");
});

//SHOW route
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
        } else {
        res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                campground.comments.push(comment);
                campground.save();
                res.redirect('/campgrounds/' + campground._id);
            });
        }
    }); 
});


app.listen(5000, function(){
    console.log("Yelpcamp server up....");
});
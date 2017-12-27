var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
//=================
//Campground Routes
//=================

//INDEX - show all acmpgrounds

router.get("/", function(req, res){    
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log("Somethings wrong");
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds, currentUser: req.user});
        }
    });
    //res.render("campgrounds",{campgrounds: campgrounds});
});


//CREATE - create new campground

router.post("/", function(req, res){
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

//NEW = show for to create new campground

router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

//SHOW - show more info for one campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

module.exports = router;
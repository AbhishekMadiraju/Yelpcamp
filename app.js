var express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Yosemite", image: "https://farm6.staticflickr.com/5027/5727199986_af9cf218f0.jpg"},
    {name: "Yellowstone", image:"https://farm5.staticflickr.com/4324/35405231644_28698d7af1.jpg"},
    {name: "Kumara Parvatha", image:"https://farm1.staticflickr.com/110/263941869_7fa3b8930b.jpg"},
    {name: "Yosemite", image: "https://farm6.staticflickr.com/5027/5727199986_af9cf218f0.jpg"},
    {name: "Yellowstone", image:"https://farm5.staticflickr.com/4324/35405231644_28698d7af1.jpg"},
    {name: "Kumara Parvatha", image:"https://farm1.staticflickr.com/110/263941869_7fa3b8930b.jpg"}
];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){    
    res.render("campgrounds",{campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = {name: name, image: image};
    campgrounds.push(newCamp);
    res.redirect("/campgrounds");

});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});




app.listen(5000, function(){
    console.log("Yelpcamp server up....");
});
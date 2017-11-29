var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: "Yosemite", 
        image: "https://www.nationalparks.org/sites/default/files/yosemite-merced.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque cursus nunc vitae dui bibendum, id malesuada magna sodales. Sed non lacus viverra, bibendum lorem et, posuere nisl. In hac habitasse platea dictumst. Nulla sed odio felis. Quisque eu urna ac odio pharetra aliquet. Aliquam rhoncus aliquam lacus. In hac habitasse platea dictumst."
    },
    {
        name: "Yellowstone", 
        image: "https://www.nationalparks.org/sites/default/files/yellowstone-header.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque cursus nunc vitae dui bibendum, id malesuada magna sodales. Sed non lacus viverra, bibendum lorem et, posuere nisl. In hac habitasse platea dictumst. Nulla sed odio felis. Quisque eu urna ac odio pharetra aliquet. Aliquam rhoncus aliquam lacus. In hac habitasse platea dictumst."
    },
    {
        name: "Glacier", 
        image: "http://www.mountainphotography.com/images/large/201207_crackerLakeTent.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque cursus nunc vitae dui bibendum, id malesuada magna sodales. Sed non lacus viverra, bibendum lorem et, posuere nisl. In hac habitasse platea dictumst. Nulla sed odio felis. Quisque eu urna ac odio pharetra aliquet. Aliquam rhoncus aliquam lacus. In hac habitasse platea dictumst."
    }
];

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("Added Camp");
                    Comment.create(
                        {
                            text: "No Derp. Very Much Nice",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created Comment");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;
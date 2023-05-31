//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");



//connecting our server with the mongodb database server:-
mongoose.connect("mongodb://0.0.0.0:27017/blogDB", {useNewUrlParser: true})
.then(function(res){
  console.log("Connected to the mongodb server");
})
.catch(function(err){
  console.log(err);
});

//making the post schema for the storing composed posts as documents in a 'posts' collection in the database:-

const PostSchema = {
  title:String,
  content:String
};

//now creating a model which corresponds to the posts collection in the database :-

const Post = new mongoose.model("Posts",PostSchema);



//now we can  create documents using the Post model:-





const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req, res){

  Post.find({})
  .then(function(posts){
    res.render("home", {
      startingContent:homeStartingContent,
      posts:posts
      });
  })
  .catch(function(err){
    console.log(err);
  });

  
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});0

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save();

  res.redirect("/");

});

app.get("/posts/:post_id", function(req, res){
    //now first we store the id passed on to the post route:-
    const requiredPost_id = req.params.post_id;
    //now using this post id to find the matching post in our mongodb database in the collection 'posts' through the
    //Post model:-
    Post.findOne({_id:requiredPost_id})
    .then(function(post){
      res.render("post",{title:post.title,
        content:post.content
      });
    })
    .catch(function(err){
      console.log(err);
    }); 













  //this block of code takes the title entered by the username after the post route i.e /posts/_____ and 
  //matches the entered required title with the 'title' property of all the posts in the posts array and passses that post as the object to be rendered
  //along with the post template file for user display....
  // const requestedTitle = _.lowerCase(req.params.postName);
  // posts.forEach(function(post){
  //   const storedTitle = _.lowerCase(post.title);

  //   if (storedTitle === requestedTitle) {
  //     res.render("post", {
  //       title: post.title,
  //       content: post.content
  //     });
  //   }
  // });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

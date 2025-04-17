const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
let posts=[
    {
        id:uuidv4(),
        amount:300,
        date: "25th Jan 2025",
        Description: "Fruit"
    },
    {
        id:uuidv4(),
        amount:5500,
        date: "25th Feb 2025",
        Description: "Car insurance"
    },
    {
        id:uuidv4(),
        amount:1500,
        date: "2nd march 2025",
        Description: "Grocery"
    },
    {
        id:uuidv4(),
        amount:800,
        date: "18th April 2025",
        Description: "Chemist"
    },
    {
        id:uuidv4(),
        amount:1200,
        date: "2nd April 2025",
        Description: "Gym"
    },
        
]
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs",{posts});
})
app.post('/posts',(req,res)=> {
    let{amount,date,Description} = req.body;
    let id = uuidv4();
    posts.push({id,amount,date,Description});
    res.redirect('/posts');
})

  app.patch("/posts/:id" ,(req,res) => {
    let{id} = req.params;
    let newDescription = req.body.Description;
    let post=posts.find((p) => id=== p.id);
    post.Description = newDescription;
    console.log(post);
    res.redirect("/posts");
  });
  app.get("/posts/:id/edit",(req,res) => {
    let{id} = req.params;
    let post=posts.find((p) => id=== p.id);
    res.render("edit.ejs",{post});
  });
  app.delete("/posts/:id",(req,res) => {
    let{id} = req.params;
     posts = posts.filter((p) => id !== p.id);
   res.redirect("/posts");
  });
 
  app.get("/dashboard", (req, res) => {
    const totalExpenses = posts.reduce((sum, post) => sum + post.amount, 0);
    const transactionCount = posts.length;
    const categorySummary = posts.reduce((acc, post) => {
      acc[post.Description] = (acc[post.Description] || 0) + post.amount;
      return acc;
    }, {});
  
    res.render("dashboard", {
      totalExpenses,
      transactionCount,
      categorySummary
    });
  });
  
app.listen(port, () => {
  console.log(` listening on port :8080`)
})
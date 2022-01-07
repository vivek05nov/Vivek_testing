var express = require('express');
var app= express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');


app.get("/",(req,res)=>{

   var data =[{
       name : "vivek",
       email:"vivek@vivek.com",
       phone :"2222"
   },
   {
    name : "vivek",
    email:"vivek@vivek.com",
    phone :"2222"
},
{
    name : "vivek",
    email:"vivek@vivek.com",
    phone :"2222"
}]
   res.render("index",{data,data});
});


app.post("/received",(req,res)=>{

    
    res.json("updated successfully");
})
app.post("/not_received",(req,res)=>{

    res.json("updated successfully");
})

app.listen(300);
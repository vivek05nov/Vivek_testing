var express = require('express');
var mymodule = require('./lib/db');


var pool = mymodule.pool;
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
let now ="";
var corsOptions = {
    origin :"http://localhost:1000/"
}
app.get("/",async(req,res)=>{
    var data = await (await pool.query("Select * from dashboard")).rows;

    res.render("index",{data,data});
 });

 app.post("/received",(req,res)=>{
    var id = req.body.data;
    
     pool.query(`update dashboard set status =0 where id  =${id}`,(err)=>{
        if(err) throw err ;
            res.status(200).json("Update SuccessFully");

    });
    
})
app.post("/not_received",(req,res)=>{

    var id = req.body.data;

     pool.query(`update dashboard set status =1 where id =${id}`,(err)=>{
        if(err) throw err ;
         
            res.status(200).json("Update SuccessFully");
    });
    
})




app.post("/refresh",async(req,res)=>{

   var data = req.body.type;

   if(data ==='truncate')
   {  
        pool.query("truncate table emp; commit;"); 
        
         mysql.query("Select * from emp",(err,result)=>{

            if(err) throw err;
        result.map((item,value) =>{ 
            if(value == result.length-1){
                now += "('"+item.empid+"','"+item.empname+"','"+item.email+"','"+item.status+"'); commit;"
            }
            else 
            {
                now += "('"+item.empid+"','"+item.empname+"','"+item.email+"','"+item.status+"'),"
            }
        })
        console.log(now); 
        pool.query(`insert into emp values ${now} `,(err,re)=>{
             
            if(re) {
                res.send("Data migrate successfully") ;   
             }
             else
             {
                 res.status(400).send("Error Occured");
             }
            
          })  
    })

  
       
    }
})
    
app.listen(1000);
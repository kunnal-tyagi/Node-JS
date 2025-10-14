const express=require("express")
const app=express()
//here only 1st will get printed because when encouter res.send it sends 
//back data from there doesnt moves ahed
// app.use('/',(req,res)=>{
//     console.log("1st");
//     res.send("1st")
//     },(req,res)=>{
//         console.log("2nd");
//         res.send("2nd");
//     })    

//here it will get into infinite searching
app.get('/',(req,res)=>{
    console.log("one");
    //res.send("one")
    },(req,res)=>{
        console.log("two");
        res.send("two");
    })    

    // this will print work done
app.get('/time',(req,res,next)=>{
    console.log("work");
    //res.send("one")
    //if here i dont comment out res.send() whole code executes
    //but when it'll reach next it will log ans, but when
    //it encounter another res.send() it wil give error 
    next()
    },(req,res)=>{
       //we can define 2nd route handler as 
       // app.get("same route as parent")        
        console.log("work done");
        res.send("work done");
        //if give next() here but dont define another hander
        //it will give cannot get/ error because it is expecting another
        //route
    })    
    app.listen(3000)
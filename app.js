const express= require("express");
const bodyParser=require("body-parser");
const request= require("request");
const app= express();
const https =require("https");

app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res)
{
    const name=req.body.mail;
    const email=req.body.pass;
    console.log(name,email);

    const data= {
        members: [
            {
                email_address:name,
                status: "subscribed",
                merge_fields:{
                    FNAME: email,
                    


                }
            }
        ]
    };
    const url="https://us21.api.mailchimp.com/3.0/lists/7e04521fed";
    const options={
        method:"POST",
        auth:"sachin:5d3cc46abd178eb8db5f281ab22e6c86-us21"
         
    }
    const jsondata= JSON.stringify(data);
    const request=https.request(url,options,function(response)
    {
         if(response.statusCode===200)
         {res.sendFile(__dirname +"/success.html");
    }else
     {    res.sendFile(__dirname +"/failure.html");
}  
        
        
        response.on("data",function(data){
        console.log(JSON.parse(data));
    })

    })
   // request.write(jsondata);
    request.end();
});

app.post("/failure",function(req,res)
{
    res.redirect("/")
})

app.listen(3000,function()
{
    console.log("Server is running ");
})


//5d3cc46abd178eb8db5f281ab22e6c86-us21
//: 7e04521fed.
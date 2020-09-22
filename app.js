const express= require('express')
const app= express();
const bodyParser= require("body-parser")
const https= require("https")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.post("/",function(req,res){
    const firstName=req.body.fName
    const lastName=req.body.lName
    const email=req.body.email
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FName:firstName,
                    LName: lastName
                }
            }
        ]
    };
    const jsonData= JSON.stringify(data);
    const url="https://us2.api.mailchimp.com/3.0/lists/db8ec6e0a9"
    const options={
        method:"POST",
        auth:"username:cbdf1f6cc59872959962a6696082b00e-us2"
    }
    const request=https.request(url,options, function(response){
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }
        else res.sendFile(__dirname + "/failure.html")
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();

});
app.post("/failure", function (req,res) {
    res.redirect("/");

})

app.listen(process.env.PORT|| 3000,function(){
    console.log("server running on port 3000");
})


const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { json } = require("body-parser");

const app = express();
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
    apiKey: "cbdf1f6cc59872959962a6696082b00e",
    server: "us2",
});

//audience id/unique id/list_id

const list_id="db8ec6e0a9";


//declare a public folder . its impact is in signup.html css and images folder
app.use(express.static("public"));

//used to get the data from post method
app.use(bodyParser.urlencoded({ extended: true }));

//home route
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/signup.html");
});

//https://mailchimp.com/developer/api/marketing/list-members/add-member-to-list/
app.post("/", function (req, res) {
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    const run = async () => {
        const response = await client.lists.addListMember(list_id, {
            email_address: email,
            status: "cleaned",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            },
        });

        console.log("response status="+response.status);
        if (response.status === ( 400 || 401 || 403 || 404)) {
            console.log("status failure");
            res.sendFile(__dirname + "/public/failure.html");
        } else {
            console.log("status success");
            res.sendFile(__dirname + "/public/success.html");
        }
        console.log(response);
    };

    run();

    // console.log(fname, lname, email);
});


//this method will be called when we press try again butt
app.post("/failure",function(req,res){

    res.redirect("/");
});

app.listen(3000, function () {
    console.log("listen on 3000");
});
/*
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
const client = require("@mailchimp/mailchimp_marketing");


// view engine setup
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

client.setConfig({
    apiKey: "cbdf1f6cc59872959962a6696082b00e-us2",
    server: "us2",
});
const listId = "db8ec6e0a9";


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// GET home page.
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/signup.html');
});

// Post Mailchimp data

app.post('/', function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    console.log(firstName, lastName, email);


    async function run() {
        const response = await client.lists.addListMember(listId, {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        });

        console.log("response status=" + response.status);
        if (response.status === (400 || 401 || 403 || 404)) {
            console.log("status failure");
            res.sendFile(__dirname + '/success.html');
        } else {
            console.log("status success");
            res.sendFile(__dirname + '/failure.html');
        }
        console.log(response);
    };

    run();

});
app.post("/failure", function (req, res) {

    res.redirect("/");
});
app.listen(3000, function () {
    console.log("Server running on port 3000")
});
module.exports = app;
*/

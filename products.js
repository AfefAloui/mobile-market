//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});
app.get("/signUp.html", function(req,res){
  res.sendFile(__dirname + "/signUp.html");
});

app.post("/", function(req,res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data= {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);


  var options = {
    url: "https://us17.api.mailchimp.com/3.0/lists/cfa96eca51",
    method: "POST",
    headers: {
      "Authorization": "afef 121321e746549007adf6e24eba497858-us17"
    },
    body: jsonData
  };
request(options, function(error, response, body){
    if (error){
      res.sendFile(__dirname + "/failure.html");
    }else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      }else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
});
});
app.post("/failure", function(req,res){
  res.redirect("/");
  });

app.listen(3000, function() {
  console.log("Server running on port 3000");

});

//121321e746549007adf6e24eba497858-us17
//cfa96eca51

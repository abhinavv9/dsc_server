const express = require("express");
const { Auth } = require("two-step-auth");
const bodyParser = require("body-parser");
const request = require("request");
const dotenv= require("dotenv")
const https = require("https");

dotenv.config({path : 'config.env'})

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var check;

app.post("/register", async (req, res) => {
  try {
    console.log(req.body.email);
    const res1 = await Auth(req.body.email, "Company Name");
    console.log(res1);
    // console.log(res1.mail);
    // console.log(res1.OTP);
    check = res1.OTP;
    if (res1.status === 200) res.redirect("/otp");
  } catch (err) {
    console.log("Error here" + err);
  }
});

app.post("/otp", async (req, res) => {
  try {
    console.log(req.body.otp);
    if (Number(req.body.otp) === check) {
      // alert("OTP Matched")
      console.log("OTP Matched");
      res.redirect("/details");
    } else {
      // alert("OTP Not Matched")
      console.log("OTP Not Matched");
      res.redirect("/register");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/newsletter", (req, res) => {
    var email = req.body.email

    var data = {
        members : [
            {
                email_address : email,
                status:"subscribed"
            }
        ]
    }
    const jsondata = JSON.stringify(data)
    const url = process.env.MAILCHIMP_URL
    const options = {
        method :"POST",
        auth : process.env.MAILCHIMP_KEY 
    }
    const request = https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
        if(response.statusCode === 200){
            console.log("success");
        }
        else {
            console.log("Here is error  "+error);
        }
    })
    request.write(jsondata)
    request.end()
    res.send("Subscribed")
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});

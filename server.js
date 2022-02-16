const express = require("express");
const { Auth } = require("two-step-auth");
const bodyParser = require("body-parser");
const request = require("request");
require("dotenv").config();

const app = express();

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
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const options = {
    url: process.env.MAILCHIMP_URL,
    method: "POST",
    headers: {
      Authorization: process.env.MAILCHIMP_KEY,
    },
    body: jsonData,
  };

  request(options, (err, response, body) => {
    if (err) {
      res.json({ err: err, subscribed: false });
    } else {
      if (response.statusCode === 200) {
        res.json({ subscribed: true });
      } else {
        res.json({ err: err, subscribed: false });
      }
    }
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});

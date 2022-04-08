const app = require("./app");
// const { Auth } = require("two-step-auth");
const bodyParser = require("body-parser");
// const request = require("request");
const dotenv = require("dotenv");
const https = require("https");

//database
const connectDatabase = require("./Config/database");
require("dotenv").config();
// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "secrets.env" });
}
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//UnCaught Excception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server due to Uncaught Exception`);
  process.exit(1);
});

//connection databse
connectDatabase();

// var check;

// app.post("/register", async (req, res) => {
//   try {
//     console.log(req.body.email);
//     const res1 = await Auth(req.body.email, "Company Name");
//     console.log(res1);
//     // console.log(res1.mail);
//     // console.log(res1.OTP);
//     check = res1.OTP;
//     if (res1.status === 200) {
//       return res.status(200).json({"message" : "OTP sent to your email"});
//     }
//     else{
//       return res.status(422).json({"message" : "Email not found"});
//     }
//   } catch (err) {
//     console.log("Error here" + err);
//   }
// });

// app.post("/otp", async (req, res) => {
//   try {
//     console.log(req.body.otp);
//     if (Number(req.body.otp) === check) {
//       // alert("OTP Matched")
//       console.log("OTP Matched");
//       return res.status(200).json({"message" : "OTP sent to your email"});
//     } else {
//       // alert("OTP Not Matched")
//       console.log("OTP Not Matched");
//       return res.status(422).json({"message" : "Email not found"});
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

app.post("/newsletter", (req, res) => {
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
      },
    ],
  };
  const jsondata = JSON.stringify(data);
  const url = process.env.MAILCHIMP_URL;
  const options = {
    method: "POST",
    auth: process.env.MAILCHIMP_KEY,
  };
  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
    if (response.statusCode === 200) {
      console.log("success");
    } else {
      console.log("Here is error  " + error);
    }
  });
  request.write(jsondata);
  request.end();
  res.send("Subscribed");
});

//Unhandled Promise Rejection
process.on("unHandledException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

var express = require("express");
var router = express.Router();
const jwtManager = require("../jwt/jwtManager");
const env = require("dotenv").config();
const collection = process.env.userTable;
const hasher = require("bcryptjs");

//login
//http://localhost:3000/signin/  method post
router.post("/signin", (req, res) => {
  req.db
    .collection(collection)
    .findOne({
      email: req.body.email.toLowerCase(),
    })
    .then((data) => {
      if (data){
        //&& hasher.compareSync(req.body.password, data.password)) {
        const payload = {};
        payload.email = data.email;
        payload.name = data.name;
        // payload.id = data._id;
        // payload.address = data.address;
        payload.phone = data.phone;
        const token = jwtManager.generate(payload);
        res.json({ status: "success", result: token, id: data._id });
      } else {
        res.json({ status: "User not exist" });
      }
    });
});

//sign up
//http://localhost:3000/signup/  method post
router.post("/signup", (req, res) => {
  req.db
    .collection("users")
    .findOne({ email: req.body.email })
    .then((doc) => {
      if (doc) {
        res.json({ status: "User exists" });
      } else {
        let user = {
          name: req.body.name,
          email: req.body.email.toLowerCase(),
          phone: req.body.phone,
          // date: new Date(),
          // password: hasher.hashSync(req.body.password, 12),
          // address: {
          //   street: req.body.address.street,
          //   city: req.body.address.city,
          //   state: req.body.address.state,
          //   zipcode: +req.body.address.zipcode,
          // },
        };
        const token = jwtManager.generate(user);
        req.db
          .collection(collection)
          .insertOne(user)
          .then((data) => {
            res.status(201).json({ status: "success", result: token });
          });
      }
    });
});

module.exports = router;

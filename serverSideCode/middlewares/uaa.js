const jwtManager = require("../jwt/jwtManager");

class Uaa {
  checkToken(req, res, next) {
    console.log("request", req);
    if (req.url === "/signin" || req.url === "/signup" || req.url === "/home") {
      // console.log("signin", req.body.email);
      next();
      return;
    }

    const token = req.headers.authorization;
    // console.log("token", token);
    if (!token) {
      return res.status(401).json({ status: "auth_error" });
    } else {
      const data = jwtManager.verify(token);
      let loggeduser = data.email;
      //console.log("verified data", data.email, "request.body", req.body);
      if (!data) {
        return res.json({ status: "auth_error" });
      } else {
        // console.log("datatatat", data);
        // console.log("jwtdatat", data.email);
        req.email = data.email;
        req.name = data.name;
        req.id = data._id;
        req.address = data.address;
        req.phone = data.phone;
        next();
      }
    }
  }
}

module.exports = new Uaa();

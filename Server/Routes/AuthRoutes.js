const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const User = require("../Models/user");

const router = express.Router();

const client = new OAuth2Client('198585843015-1mehd6q9pgk4i4n9vf570je8050pp3uc.apps.googleusercontent.com');
const JWT_SECRET = "hehehehehehehehehe";

router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required",
      });
    }


    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: "98585843015-1mehd6q9pgk4i4n9vf570je8050pp3uc.apps.googleusercontent.com",
    });


    const payload = ticket.getPayload();

    const {
      sub: googleId,
      name,
      email,
      picture,
    } = payload;


    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        googleId,
        name,
        email,
        profilePicture: picture,
      });
    }

 
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      "hehehehehehehehehe",
     
    );

    res.status(200).json({
      message: "Google Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
  
      },
    });
  } catch (error) {
    console.log("Google Login Error:", error);

    res.status(500).json({
      message: "Google authentication failed",
    });
  }
});

module.exports = router;
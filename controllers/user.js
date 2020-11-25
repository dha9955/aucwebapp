const express = require("express");
const { paginationData } = require("./pagination");
const { JWT_SECRET } = require("../configs/index");
const JWT = require("jsonwebtoken");
//
const User = require("../models/User");

// A
// Auth Google
const authGoogle = async (req, res, next) => {
  const token = createEncodeToken(req.user);
  res.setHeader("Authorization", token);
  return res.status(201).json({ success: true });
};
// Auth Facebook
const authFacebook = async (req, res, next) => {
  const token = createEncodeToken(req.user);
  res.setHeader("Authorization", token);
  return res.status(201).json({ success: true });
};

// Delete User
const deleteUser = async (req, res, next) => {
  const userID  = req.body.userID;
  //get product
  const user = await User.findOneAndDelete({ _id: userID });
  return res.status(200).json({ success: true });
};
// E
// Encoded
const createEncodeToken = (user) => {
  return JWT.sign(
    {
      iss: "Hoang Anh",
      sub: user,
      iat: new Date().getTime(),
    },
    JWT_SECRET
  );
};

// G
const getAllUsers = async (req, res, next) => {
  const user = await User.find({});
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const results = paginationData(user, page, limit);
  return res.status(200).json({ results });
};

// S
// Secret
const secret = async (req, res, next) => {
  return res.status(200).json({ resources: true });
};
// Sign In
const signIn = async (req, res, next) => {
  // Assign a token
  const token = createEncodeToken(req.user);
  return res.status(200).json({ success: true, token });
};
// Sign Up
const signUp = async (req, res, next) => {
  const { userName, password, fullName, email, address, pNumber } = req.body;

  //Check same user
  const foundUsername = await User.findOne({ userName: userName });
  const foundEmail = await User.findOne({ email: email });
  const foundpnumber = await User.findOne({ pNumber: pNumber });
  if (foundUsername)
    return res
      .status(403)
      .json({ error: { message: "username or password is already used!!" } });
  if (foundEmail)
    return res
      .status(403)
      .json({ error: { message: "email is already used!!" } });
  if (foundpnumber)
    return res
      .status(403)
      .json({ error: { message: "phone number is already used!!" } });
  const newUser = new User({
    userName: userName,
    password: password,
    fullName: fullName,
    email: email,
    address: address,
    pNumber: pNumber,
  });
  await newUser.save();
  //Encode
  const token = createEncodeToken(newUser);
  res.setHeader("Authorization", token);
  //Decrypt
  return res.status(201).json({ success: true, token });
};

module.exports = {
  authGoogle,
  authFacebook,
  deleteUser,
  getAllUsers,
  secret,
  signIn,
  signUp,
};

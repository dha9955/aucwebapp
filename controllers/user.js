const express = require("express");
const { paginationData } = require("./pagination");
const { JWT_SECRET } = require("../configs/index");
const JWT = require("jsonwebtoken");
const moment = require('moment')
//
const User = require("../models/User");
const Product = require("../models/Product")

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


// C
// Create User's Product
const createUsersProduct = async (req, res, next) => {
  const {userID} = req.params
  const {timeRange} = req.body.timeRange
  // create new product
  const newProduct = new Product({
    name: req.body.name,
    image: req.body.image,
    categoy: req.body.categoy,
    condition: req.body.condition,
    brand: req.body.brand,
    description: req.body.description,
    startPrice: req.body.startPrice,
    buyNowPrice: req.body.buyNowPrice,
    stepUp: req.body.stepUp,
    currentPrice: req.body.startPrice,
    startTime: moment().toString(),
    endTime: moment().add(timeRange, 'd'),
    status: 'posted'
  })
  const user = await User.findById(userID)
  newProduct.owner = userID
  await newProduct.save()
  // Add product to user
  user.products.push(newProduct._id)
  await user.save()
  return res.status(201).json({product: newProduct})
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
//Get User's Products
const geUsersProducts = async (req, res, next)=>{
  const {userID} = req.params
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const product = await Product.find({owner:userID})
  const results = paginationData(product, page, limit);
  return res.status(200).json({results})
}


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
  newUser.save();
  //Encode
  const token = createEncodeToken(newUser);
  res.setHeader("Authorization", token);
  //Decrypt
  return res.status(201).json({ success: true });
};

module.exports = {
  authGoogle,
  authFacebook,
  createUsersProduct,
  getAllUsers,
  geUsersProducts,
  secret,
  signIn,
  signUp,
};

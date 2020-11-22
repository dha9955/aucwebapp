import axios from "axios";
import qs from "qs";

// Product

// User
const authFacebook = (params) => {
  var data = JSON.stringify({
    access_token:
      "EAAXxr2jEyXABAN8lb8F8Ib2ZA56ZCK5x9Nha7OHSfzQZAjJLlzjvneXso22rNIFwVViHyDFFIAS3e3YdGzjsTXmfNSzG3P4yLYBfXQFJPHfbZAOWtdAsmHTnGut8ZAEZCU9phtwf3N7vhTVtePGZBYcop0dwiX3IMArQOpcUy2uWAmhD3NWOZC4ZBCN1aZBSTAs1AchKw9GQhNymfE7n7gXpduHn18ZAmamu1BJuvVmnsUvugZDZD",
  });
  var config = {
    method: "post",
    url: "http://localhost:3001/users/auth/facebook",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
};
const authGoogle = (params) => {
  var data = JSON.stringify({
    access_token:
      "ya29.a0AfH6SMAyYGQfBSbfDjcKZx1vElAjeZABiHsj_A41r0yanr4PS64eB6EwJS9Yw_bQp4KMSAF-5RakOLL45b_B0r-cmdAfaMHPrEAEWa_jmBYGYzQG4Nk3NisGr1s-_mGVWPSREeF0TuaUr7YkitupMMUsPBP8X_AWjc0",
  });

  var config = {
    method: "post",
    url: "http://localhost:3001/users/auth/google",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
};
const createUsersProducts = (params) => {
  var data = JSON.stringify({
    timeRange: 5,
    name: "Lenovo Gaming L340-15IRH",
    image:
      "https://firebasestorage.googleapis.com/v0/b/fir-reactjs-upload.appspot.com/o/images%2Flenovo-ideapad-l340-15irh-81lk01j2vn-i5-9300hf_2d6c011d515f4dab893854e0e05e2652_grande.jpg?alt=media&token=49c23839-8863-4850-8723-16f64deb39a2",
    categoy: "laptop",
    condition: "new",
    brand: "Lenovo",
    description: "black",
    startPrice: 15000000,
    buyNowPrice: 18000000,
    stepUp: 300000,
  });

  var config = {
    method: "post",
    url: "http://localhost:3001/users/5fb29090d02eca33045c170d/products",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
};
const getAllUsers = (params) => {
  var config = {
    method: "get",
    url: "http://localhost:3001/users/?page=1&limit=3",
    headers: {},
  };
  return axios(config);
};
const getUsersProducts = (params) => {
  var config = {
    method: "get",
    url:
      "http://localhost:3001/users/5fb29090d02eca33045c170d/products?page=1&limit=5",
    headers: {},
  };
  return axios(config);
};
const getProductbyID = (params) => {
  var config = {
    method: "get",
    url: "http://localhost:3001/products/5fb29263a9bf473d68931dfc",
    headers: {},
  };
  return axios(config);
};
const signUp = (params) => {
  var data = JSON.stringify({
    userName: "anh1234",
    password: "123456",
    fullName: "Hoang Anh",
    email: "0213dha@gmail.com",
    address: "Thu Duc",
    pNumber: "569854787",
  });

  var config = {
    method: "post",
    url: "http://localhost:3001/users/signUp",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
};
const signIn = (params) => {
  var data = JSON.stringify({ userName: "hoanganh123", password: "123456" });
  var config = {
    method: "post",
    url: "http://localhost:3001/users/signin",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
};

export {
  authFacebook,
  authGoogle,
  createUsersProducts,
  getAllUsers,
  getUsersProducts,
  getProductbyID,
  signIn,
  signUp,
};

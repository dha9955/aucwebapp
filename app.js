const express = require("express");
const logger = require("morgan");
const mongoClient = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//
const userRoute = require("./routers/user");
const productRoute = require("./routers/product");


// Setup connect mongodb
mongoClient
  .connect("mongodb+srv://1607dha:1700561583561@cluster0.jpp3r.mongodb.net/aucwebapp?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((error) => console.error(`cant connect to db ${error}`));

// Middlewares
const app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Router
app.use("/users", userRoute);
app.use("/products", productRoute);

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Errors handler function
app.use((err, req, res, next) => {
  /* const error = app.get('env') === 'development' ? err:{}  */
  const status = err.status || 500;
  //res to client
  return res.status(status).json({
    error: {
      message: err.message,
    },
  });
});

//Start sever
const port = app.get("port") || 3001;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

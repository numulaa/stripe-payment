const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const mainRoutes = require("./routes/main");
const paymentRoutes = require("./routes/payment");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:2023",
  })
);

//use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//use the
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//items that are going to be paid
const listItems = new Map([
  [1, { priceInCents: 1000, name: "Apple" }],
  [2, { priceInCents: 2000, name: "pear" }],
]);

//routes
app.use("/", mainRoutes);
app.use("/payment", paymentRoutes);

//server running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});

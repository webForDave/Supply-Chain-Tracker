"use strict";

const express = require("express");
const layouts = require("express-ejs-layouts");
const homeController = require("./controllers/homeController");
const errorControllers = require("./controllers/errorsControllers");
const suppliersControllers = require("./controllers/suppliersControllers");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const suppliers = require("./models/suppliers");
const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/supply_chain_db");
let db = mongoose.connection;

db.once("open", () => {
    console.log("Connection to database successful!");
})

app.use(layouts);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("?_method", {methods: ["POST", "GET"]}));

app.get("/", homeController.homeProcessor);
app.get("/suppliers/new", suppliersControllers.newSupplierView);
app.post("/suppliers/create", suppliersControllers.createSupplier);
app.get("/suppliers", suppliersControllers.getAllSuppliers);
app.get("/suppliers/s/:name", suppliersControllers.getSingleSupplier);
app.get("/suppliers/s/:name/edit", suppliersControllers.editSupplierView);
app.post("/suppliers/s/:name/edit", suppliersControllers.updateSupplier);
app.post("/suppliers/s/:name/delete", suppliersControllers.deleteSupplier);

app.use(errorControllers.notFoundErrorProcessor);
app.use(errorControllers.internalServerErrorProcessor);

app.listen(app.get("port"), () => {
    console.log(`Server running on http://localhost:${app.get("port")}`);
})
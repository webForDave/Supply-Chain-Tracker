"use strict";

const express = require("express");
const homeController = require("./controllers/homeController");
const errorsControllers = require("./controllers/errorsControllers");
const suppliersControllers = require("./controllers/suppliersControllers");
const methodOverride = require("method-override");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/supply_chain_db");
let db = mongoose.connection;

db.once("open", () => {
    console.log("Connection to database successful!");
});

app.use(methodOverride("_method", {methods: ["POST", "GET"]}));

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(layouts);

app.get("/", homeController.homeProcessor);
app.get("/suppliers", suppliersControllers.getAllSuppliers);
app.get("/suppliers/s/:name", suppliersControllers.getSingleSupplier);
app.get("/suppliers/new", suppliersControllers.createSupplierView);
app.post("/suppliers/create", suppliersControllers.createSupplier);
app.get("/suppliers/s/:name/edit", suppliersControllers.editSupplierView);
app.put("/suppliers/s/:name/update", suppliersControllers.updateSupplier);
app.delete("/suppliers/s/:name/delete", suppliersControllers.deleteSupplier);

app.use(errorsControllers.notFoundError);
app.use(errorsControllers.internalServerError);

app.listen(app.get("port"), () => {
    console.log(`Server running on http://localhost:${app.get("port")}`);
})

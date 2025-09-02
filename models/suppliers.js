"use strict";

const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    contactInfo: {type: String, required: true, unique: true},
    location: {type: String, required: true},
    notes: {type: String}
});

module.exports = mongoose.model("Supplier", supplierSchema);
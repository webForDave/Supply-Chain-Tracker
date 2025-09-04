const mongoose = require("mongoose");

let supplierSchema = mongoose.Schema({
    name: {required: true, type: String, unique: true},
    contactInfo: {required: true, unique: true, type: String},
    location: {required: true, type: String},
    notes: String
});

module.exports = mongoose.model("Supplier", supplierSchema);
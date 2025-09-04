"use strict";

const { name } = require("ejs");
const Supplier = require("../models/supplier");

const getSingleSupplier = async (req, res, next) => {
    try{
        let supplier = await Supplier.findOne({name: req.params.name})
        if (supplier) {
            res.render("suppliers/showSingleSupplier", {supplier: supplier})
        } else {
            res.render("404");
        }
    } catch(error) {
        next(error);
    }
}

const getAllSuppliers = async (req, res, next) => {
    try{
        let suppliers = await Supplier.find({})
        res.render("suppliers/showAll", {suppliers : suppliers});
    } catch(error) {
        next(error);
    }
}

const createSupplierView = (req, res) => {
    res.render("suppliers/new");
}

const createSupplier = async (req, res, next) => {
    try{
        let supplier = await Supplier.create({
            name: req.body.name,
            contactInfo: req.body.contactInfo, 
            location: req.body.location,
            notes: req.body.notes
        })
        res.redirect(`/suppliers/s/${supplier.name}`)
    } catch(error) {
        next(error);
    }
}

const editSupplierView = async (req, res, next) => {
    try{
        let supplier = await Supplier.findOne({name: req.params.name});
        if (supplier) {
            res.render("suppliers/editSupplier", {supplier: supplier});
        } else {
            res.render("404");
        }
    } catch(error) {
        next(error);
    }
}

const updateSupplier = async (req, res, next) => {
    try {
        let filter = {name: req.params.name};
        let options = {true: true};
        let supplier = await Supplier.findOneAndUpdate(filter, req.body, options);
        res.redirect(`/suppliers/s/${supplier.name}`)
    } catch (error) {
        next(error);
    }
}

const deleteSupplier = async (req, res, next) => {
    try {
        await Supplier.findOneAndDelete({name: req.params.name});
        res.redirect("/suppliers");
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getSingleSupplier,
    getAllSuppliers,
    createSupplierView,
    createSupplier,
    editSupplierView,
    updateSupplier,
    deleteSupplier,
}
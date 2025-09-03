"use strict";

const Supplier = require("../models/suppliers");

const newSupplierView = (req, res) => {
    res.render("suppliers/new");
}

const createSupplier = async (req, res, next) => {
    try{
        await Supplier.create({
            name: req.body.name,
            contactInfo: req.body.contactInfo,
            location: req.body.location,
            notes: req.body.notes 
        })
        res.redirect("/suppliers");
    }catch(error) {
        next(error);
    }
}

const getAllSuppliers = async (req, res, next) => {
    try {
        let suppliers = await Supplier.find({})
            res.render("suppliers/showAll", {suppliers: suppliers})
    } catch (error) {
        next(error);
    }
}

const getSingleSupplier = async (req, res, next) => {
    try {
        let supplier = await Supplier.findOne({name: req.params.name});
        if (supplier) {
            res.render("suppliers/showSingleSupplier", {supplier: supplier});
        } else {
            res.render("404");
        }
    } catch (error) {
        next(error);
    }
}

const editSupplierView = async (req, res, next) => {
    try{
        let supplier = await Supplier.findOne({name: req.params.name});
        res.render("suppliers/editSupplier", {supplier: supplier});
    } catch(error) {
        next(error);
    }
}

const updateSupplier = async(req, res, next) => {
    try{
        await Supplier.findOneAndUpdate({name: req.params.name}, req.body, {new: true});
        res.redirect(`/suppliers/s/${req.params.name}`);
    } catch(error) {
        next(error);
    }
}

const deleteSupplier = async (req, res, next) => {
    try{
        await Supplier.findOneAndDelete({name: req.params.name})
        res.redirect("/suppliers");
    } catch(error) {
        next(error);
    }
}

module.exports = {
    newSupplierView,
    createSupplier,
    getAllSuppliers,
    getSingleSupplier,
    editSupplierView,
    updateSupplier,
    deleteSupplier,
}
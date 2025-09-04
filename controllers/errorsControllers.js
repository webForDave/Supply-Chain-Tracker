"use strict";

const httpStatus = require("http-status-codes");

const notFoundError = (req, res, next) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.render("404");
}

const internalServerError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    res.status(errorCode);
    res.send("We all have bad days, this is one of ours 😥...please check back soon!");
}

module.exports = {
    notFoundError,
    internalServerError
}

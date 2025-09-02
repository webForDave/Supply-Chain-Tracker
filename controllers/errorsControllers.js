"use strict";

const httpStatus = require("http-status-codes");

const notFoundErrorProcessor = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.render("404");
}

const internalServerErrorProcessor = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    res.status(errorCode);
    res.send("We all have down times, sadly this is one of ours... We'll get on our feet soon.");
    next(error);
}

module.exports = {
    notFoundErrorProcessor,
    internalServerErrorProcessor
}
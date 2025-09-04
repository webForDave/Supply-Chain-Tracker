"use strict";

const homeProcessor = (req, res, next) => {
    res.render("index");
}

module.exports = {
    homeProcessor
}

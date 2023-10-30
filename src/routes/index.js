const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app) => {
    router.get("/", (req, res) => {
        res.send("this isa file upload api")
    })
    router.post("/upload",controller.upload);
    router.get("/files", controller.getListFiles);
    router.get("/files/:name", controller.downlaod);

    app.use(router);
}

module.exports = routes;
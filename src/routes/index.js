const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app) => {
    router.get("/", (req, res) => {
        res.send("this is  a file upload api")
    })
    router.post("/upload",controller.upload);
    router.get("/files", controller.getListFiles);
    router.get("/files/:name", controller.downlaod);
    router.get("/files/file/:name", controller.preview);
    router.get("/ne", (req,res) => {
        res.download('./resources/static/assets/uploads/epos_faq_en.pdf', 'report.pdf');
    });

    app.use(router);
}

module.exports = routes;
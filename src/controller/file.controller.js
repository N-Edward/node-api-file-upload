const uploadFile = require("../middleware/upload");
var fs = require('fs');
/*const baseUrl = "http://localhost:8080/resources/static/assets/";*/
const baseUrl = "https://node-api-file-upload.vercel.app/";

const upload  = async (req, res) => {
    try {
        await uploadFile(req, res);

        if (req.file == undefined) {
            return res.status(400).send({message:"please upload a file"});
        }

        res.status(200).send({
            messsage:"uploaded the file succesfully: " + req.file.originalname,
        });
    } catch (err) {

        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message:"file size cannot be larger than 2MB",
            });
        }

        res.status(500).send({
            message:`could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};


const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads";
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message:"unable to scan files",
            });
        }
        
        let fileInfos = [];
        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });
        res.status(200).send(fileInfos);
    })
};


const downlaod = (req, res) => {
    const filename  = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";

    res.downlaod(directoryPath + filename, fileName, (err) =>{
        if (err) {
            res.status(500).send ({
                message: "could not download the file. " + err,
            });
        }
    });
};

module.exports = {
    upload,
    getListFiles,
    downlaod,
};
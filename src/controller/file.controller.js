const uploadFile = require("../middleware/upload");
var fs = require('fs');
const baseUrl = "http://localhost:8080/resources/static/assets/uploads";
/*const baseUrl = "https://node-api-file-upload.vercel.app/resources/static/assets/";*/
const downloadPath = "/resources/static/assets/uploads";

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
    const downlaodPa = "http://localhost:8080/files/"
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
                url: downlaodPa + file,
            });
        });
        res.status(200).send(fileInfos);
    })
};


const downlaod = (req, res) => {
    const fileName  = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    /*for res.download directory or file path must be with in app root directory forexample below and always 
    starts with ./folder/ */
    const downloadPath = "./resources/static/assets/uploads/"

   /* res.downlaod(directoryPath + fileName, fileName, (err) =>{
        if (err) {
            res.status(500).send ({
                message: "could not download the file. " + err,
            });
        }
    });*/

    res.download(/*'./resources/static/assets/uploads/'*/ downloadPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send ({
                message: "could not download the file. " + err,
            });
        }
    });
        
    
};

const preview = (req, res) => {
    const downloadPath = "/resources/static/assets/uploads/"; 
    /*with res.sendFile: directory/file path must be equal to the one starting from rootof host machine
    call it root directory */
    const dddd = "/Users/Bliss Play/Desktop/nodejs express file upload api/resources/static/assets/uploads/"
    const filename = req.params.name;
    res.sendFile(dddd + filename);
}

module.exports = {
    upload,
    getListFiles,
    downlaod,
    preview,
};
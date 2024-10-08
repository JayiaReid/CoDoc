const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer")

router.post("/single", upload.single("file"), (req, res)=>{
    if(!req.file){
        return res.json({message: "no file found"})
    }
    res.json({message: "File uploaded successfully"})
})

router.post("/multiple", upload.array('files'), (req, res)=>{
    if(!req.files){
        return res.json({message: "No files uploaded"})
    }
    res.json({message: "files uploaded successfully"})
})

module.exports = router;
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const uploads = path.join(__dirname, "../uploads");
const lod = require("lodash");

router.get("/all", (req, res) => {

    let files = fs.readdirSync(uploads);

    if (files.length == 0) {

        return res.json({
            message: "No images",
        });
    }

    let filenames = lod.sampleSize(files, files.length);
    const fileData = filenames.map((filename) => {
        const filePath = path.join(uploads, filename);
        const fileBuffer = fs.readFileSync(filePath);
        const base64Data = fileBuffer.toString("base64");

        return {
            filename,
            data: base64Data,
        };
    });

    res.json({
        files: fileData,
    });
});

router.get("/single", (req, res) => {

    let files = fs.readdirSync(uploads);

    if (files.length == 0) {

        return res.json({
            message: "No images",
        });
    }
    let filename = lod.sample(files);
    let file = path.join(uploads, filename)
    const fileBuffer = fs.readFileSync(file);
    const base64Data = fileBuffer.toString("base64");

    res.json({
        filename: file,
        data: base64Data
    })
});

router.get("/multiple", (req, res) => {
    let files = fs.readdirSync(uploads);

    if (files.length === 0) {
        return res.json({
            message: "No images",
        });
    }

    let filenames = lod.sampleSize(files, 3);

    const fileData = filenames.map((filename) => {
        const filePath = path.join(uploads, filename);
        const fileBuffer = fs.readFileSync(filePath);
        const base64Data = fileBuffer.toString("base64");

        return {
            filename,
            data: base64Data,
        };
    });

    res.json({
        files: fileData,
    });
});

module.exports = router
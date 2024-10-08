const express = require('express')
const app = express()
const cors = require("cors")
const PORT = 8000
const fetch = require("./routers/fetch")
const save = require("./routers/save")

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

app.use('/fetch', fetch);
app.use('/save', save);

app.use((req, res) => {
    res.status(404).json('Page not found');
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

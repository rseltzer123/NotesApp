const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const { request } = require("express");
const app = express();
const db = require('./models');
var corsOptions = {
    orgin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req,res) => {
    res.json({ message: "Welcome to mynotes."});
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}.`)
});

//middleware
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)


db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.")
});

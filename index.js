const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const toursroute = require('./route/tours.route');
require('dotenv').config()
const PORT = 5000;
app.use(cors());
app.use(express.json())



mongoose.connect(`mongodb+srv://dbuser:Emon12345@cluster0.q1k3m.mongodb.net/tours`)
    .then((val) => console.log("connect successfull"))
    .catch((err) => console.log("faild to connect"))


app.get("/", (req, res) => {
    res.send("tours project server is running")

})

app.use("/tour", toursroute)


app.all("*", (req, res) => {
    res.send("404 route")
})


app.listen(PORT, () => {
    console.log(`your server is running on ${PORT}`);
})
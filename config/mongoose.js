const mongoose = require("mongoose");
const DB = process.env.MONGO_URL;

mongoose
    .connect(DB, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => console.log(err));

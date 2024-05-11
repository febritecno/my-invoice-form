const express = require("express");
const app = express();
const conn = require("./db");
const cors = require("cors");
const user = require("./routes/invoice");

app.listen(5000, () => {
    console.log("Server is start [OK]");
})

app.use(cors());
app.use(express.json());
app.use("/invoice", user);

conn.connection.on("connected", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Connected MongoDb [OK]");
    }
})

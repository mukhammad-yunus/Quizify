const express = require("express");
const cors = require("cors");
const allRouters = require("./routes/allRouters")
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", allRouters)

app.listen(5000, () => console.log("Server running on port 5000!"));

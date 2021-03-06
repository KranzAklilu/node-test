require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const router = require("./routes/route");
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected To A DataBase"));

app.set("view engine", "hbs");
app.engine("hbs", exphbs({ extname: ".hbs" }));

app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started At Port ${PORT}`));

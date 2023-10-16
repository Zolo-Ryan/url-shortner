const express = require('express');
const app = express();
const port = 8001;
const urlRouter = require("./routes/url");
const path = require("path");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const cookieParser = require('cookie-parser');
const { restrictTo, checkForAuthentication } = require('./middlewares/auth');
require("./conn");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication)

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use("/url", restrictTo(["NORMAL"]), urlRouter);
app.use("/",staticRouter);
app.use("/user",userRouter);

// app.get("/",async (req,res) => {
//     const allUrls = await URL.find({});
//     return res.render("home",{
//         urls: allUrls
//     });
// })

app.listen(port, () => console.log(`Server started on port ${port}!`));
var express = require("express");
var router = express.Router();
var path = require("path");
//import UserModel
var UserModel = require("../models/User");
// import FileSsystem form creation file
var fs = require("fs");
var downloads = path.join(__dirname, '../downloads');

const formatLineToCSV = (userObject) => {
    const { _id, email, name } = userObject;
    const newLine = '\n';
    return `${_id};${name};${email}${newLine}`;
};

const getAllUserByChunk = (limit = 500, file) => {
    UserModel.count({}, (err, total) => {
        findUserByChunk(total, limit, 0, file);
    });
}

const findUserByChunk = (total, limit, loop, file) => {
    var currentLoop = loop || 0;
    var skipFrom = currentLoop * limit;
    UserModel.find({}, (err, users) => {
        const newTotal = ((total - limit) > 0) ? (total - limit) : 0;
        writeInFile(users, file).then(() => {
            if (newTotal > 0) {
                currentLoop++;
                return findUserByChunk(newTotal, limit, currentLoop, file);
            }

            file.end();
        }).catch((err) => {
            console.error("Error", err);
        });
    }).skip(skipFrom).limit(limit);
}

const writeInFile = (users, file) => {
    const promises = [];
    users.forEach((user) => {
        const promise = new Promise((resolve, reject) => {
            const line = formatLineToCSV(user);
            file.write(line);
            resolve(true);
        });

        promises.push(promise);
    });

    return Promise.all(promises);
}

router.use((req, res, next) => {
    console.log("Requesting", req.url);
    console.log("At time", Date.now());
    next();
});

router.get("/", (req, res, next) => {
    res.render("index", {btnMessage: "Go to download DB", message: "Let's Start with fun :D", title: "Welcome to the MediaStream Chanllenge"});
});

router.get("/users", (req, res, next) => {
    res.render("download", {btnMessage: "Start Download", message: "Now you can download the big database", title: "Download DB as CSV File. :D"});
});

router.get("/download", (req, res, next) => {
    var ts = new Date() * 1;
    var fileName = path.join(downloads, `users_${ts}.csv`);
    var file = fs.createWriteStream(fileName, { flags: "w" });
    
    // start creating file;
    getAllUserByChunk(475, file);

    file.on("close", () => {
        res.download(fileName)
    });
});

module.exports = router;
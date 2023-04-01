"use strict";

const express = require("express");

const User = require("./models/User");

// Setup Express.js app
const app = express();

// TODO: everything else
app.get("/users", (_req, res) => {
  User.find({})
    .lean()
    .select("-__v")
    .then((users) => {
      const csv = [
        Object.keys(users[0]).join(","),
        ...users.map(
          (user) => `${user._id.toString()},${user.name},${user.email}`
        ),
      ].join("\n");

      res.setHeader("Content-Type", "text/csv");
      res.attachment(`users-${new Date().getTime()}.csv`);
      res.send(csv);
    })
    .catch((error) => {
      console.error("GET /users Error:", error);
      res
        .status(500)
        .json({ error: { message: error.message || "Server Error" } });
    });
});

app.listen(3000);

import express from "express";
import User from "../models/User";


const router = express.Router();

router.get("/", (req, res) => {
    User
    .find({})
    .then(userRecords => {
        res.json({ user: userRecords });
    })
    .catch(err => res.status(400).json({ errors: err.errors }));
});

export default router;


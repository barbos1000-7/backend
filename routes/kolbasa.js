const express = require('express');
const router = express.Router();

let db = require('../database')


router.get("/", (req, res, next) => {
    const sql = "select * from quests"
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

module.exports = router;

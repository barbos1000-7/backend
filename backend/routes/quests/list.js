const express = require('express');
const router = express.Router();

/* GET home page. */
let db = require('../../database')


router.get("/", (req, res, next) => {
    const params = []
    let sql = "select answers.quest_id as quest_id  from answers " +
        "join quests on quests.id == answers.quest_id"
    let a = undefined
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        a = rows.reduce((acc, i) => {
            if (acc.hasOwnProperty(i.quest_id)) {
                acc[i.quest_id] += 1;
            } else {
                acc[i.quest_id] = 1;
            }
            return acc;
        }, {})
    });
    sql = "select quests.id as id, users.nickname as nickname, users.id as user_id, users.img as img ,subject, title, body, time from quests " +
        "JOIN users on users.id = quests.user_id "
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        setTimeout(() => {
            res.json({
                "message": "success",
                "content": {
                    data: rows,
                    count: a
                }
            })
        }, 500)
    });
});

module.exports = router;

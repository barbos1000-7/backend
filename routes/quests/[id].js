const express = require('express');
const router = express.Router();

/* GET home page. */
let db = require('../../database')


router.get('/quest/:ID', (req, res) => {
    let sql = "select quests.id as id, users.img as img, users.nickname as nickname, users.id as user_id, quests.subject as subject, quests.title as title, quests.body as body, quests.time as time from quests " + "join users on users.id = quests.user_id " + "where quests.id = ? "
    let a = undefined
    let t = undefined
    const params = [req.params.ID]
    db.all(sql, params, (err, b) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        a = b[0]
    });
    sql = "select likes.users_id as user from likes " +
        "where likes.quests_id = ? "
    db.all(sql, params, (err, y) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        t = y.reduce((accumulator, currentValue) => {
            return [...accumulator, currentValue.user]
        }, [])
    });
    sql = "select answers.id as id, content, answers.time as time, users.img as img, users.nickname as nickname, users.id as user_id from answers " + "JOIN users on users.id = answers.user_id " + "JOIN quests on quests.id = answers.quest_id " + "where quests.id = ? "
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success", "content": {
                quest: {...a, likes: t}, answers: {
                    data: rows.slice(0, req.query.lim * 10), count: rows.length
                }
            },
        })
    })
});

module.exports = router;

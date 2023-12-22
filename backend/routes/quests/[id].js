const express = require('express');
const router = express.Router();

/* GET home page. */
let db = require('../../database')


router.get('/quest/:ID', (req, res, next) => {
    let sql = "select quests.id as id, users.img as img, users.nickname as nickname, users.id as user_id, quests.subject as subject, quests.title as title, quests.body as body, quests.time as time from quests " + "join users on users.id = quests.user_id " + "where quests.id = ? "
    let a = undefined
    const params = [req.params.ID]
    db.all(sql, params, (err, b) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        a = 1 == req.query.lim ? b[0] : null
    });
    sql = "select answers.id as id, content, answers.time as time, users.img as img, users.nickname as nickname, users.id as user_id from answers " + "JOIN users on users.id = answers.user_id " + "JOIN quests on quests.id = answers.quest_id " + "where quests.id = ? "
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        setTimeout(() => {
            res.json({
                "message": "success", "content": {
                    quest: a, answers: {
                        data: rows.slice(0, req.query.lim * 10), count: rows.length
                    }
                },
            })
        }, 1000)
    })
});

module.exports = router;

const express = require('express');
const router = express.Router();

/* GET home page. */
let db = require('../../database')

router.get("/", async (req, res) => {
    const params = []
    let sql = 'select likes.quests_id as quest from likes '
    let t
    await db.all(sql, params, async (err, y) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }

        t = y.reduce((acc, i) => {
            if (acc.hasOwnProperty(i.quest)) {
                acc[i.quest] += 1;
            } else {
                acc[i.quest] = 1;
            }
            return acc;
        }, {})
        sql = 'select answers.quest_id as answer from answers '
        let a
        await db.all(sql, params, async (err, y) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }

            a = y.reduce((acc, i) => {
                if (acc.hasOwnProperty(i.answer)) {
                    acc[i.answer] += 1;
                } else {
                    acc[i.answer] = 1;
                }
                return acc;
            }, {})
            sql = "select quests.id as id, users.nickname as nickname ,  users.id as user_id, users.img as img ,subject, title, body, quests.time as time from quests " +
                " JOIN users on users.id = quests.user_id "
            // sql = 'select * from quests'
            db.all(sql, params, async (err, rows) => {
                if (err) {
                    res.status(400).json({"error": err.message});
                    return;
                }
                let b = rows.reduce((acc, item) =>
                        acc.find((find) => JSON.stringify(find) === JSON.stringify(item))
                            ? acc
                            : [...acc, item],
                    []
                )
                    .map(o => t[o.id.toString()] ? {...o, likes: t[o.id.toString()]} : {...o, likes: 0})
                res.json({
                    "message": "success",
                    "content": {
                        data: b.map(o => {
                            return a[o.id.toString()] ? {...o, answers: a[o.id.toString()]} : {...o, answers: 0}
                        })
                    }
                })

            });
        });
    })

    // COUNT(answers.id) as answers,
    // COUNT(likes.id) as likes, sum(case when quests.id = answers.quest_id then 1 else 0 end) AS answers,


});
// data: rows.reduce((acc, item) =>
//         acc.find((find) => JSON.stringify(find) === JSON.stringify(item))
//             ? acc
//             : [...acc, item],
//     []
// ).sort((a, b) => a - b) // и сортировочка для красоты :)
module.exports = router;

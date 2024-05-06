const express = require('express');
const router = express.Router();

/* GET home page. */
let db = require('../database')
const AuthMiddlle = require("../middleware/authMiddleware");

router.get("/personal", AuthMiddlle, async (req, res) => {
    let params = []
    let sql = 'select likes.quests_id as quest from likes '
    let t
    console.log(1)
    await db.all(sql, params, async (err, y) => {
        if (err) {
            console.log(err)
            res.status(400).json({"error": err.messag,});
            return;
        }
        console.log(11)

        t = y.reduce((ccc, i) => {
            if (ccc.hasOwnProperty(i.quest)) {
                ccc[i.quest] += 1;
            } else {
                ccc[i.quest] = 1;
            }
            return ccc;
        }, {})
        sql = 'select answers.quest_id as answer from answers '
        let a
        console.log(111)
        await db.all(sql, params, async (erreee, y) => {
            if (erreee) {
                res.status(400).json({"error": err.message});
                return;
            }
            console.log(2)

            a = y.reduce((acc, i) => {
                if (acc.hasOwnProperty(i.answer)) {
                    acc[i.answer] += 1;
                } else {
                    acc[i.answer] = 1;
                }
                return acc;
            }, {})
            console.log(111)
            await db.all(sql, params, async (erreee, y) => {
                if (erreee) {
                    res.status(400).json({"error": err.message});
                    return;
                }
                console.log(2)

                params = [req.user.id]
                sql = 'select id from likes ' +
                    'where likes.users_id = ?'
                let h
                db.all(sql, params, async (erreee, y) => {
                    if (erreee) {
                        res.status(400).json({"error": erreee.message});
                        return;
                    }
                    h = y.length
                })
                sql = "select quests.id as id,  subject, users.nickname as nickname ,  users.id as user_id, users.img as img, title, body, quests.time as time from quests " +
                    " JOIN users on users.id = quests.user_id " +
                    ' where quests.user_id = ?'
                // sql = 'select * from quests'
                db.all(sql, params, async (err, rows) => {
                    if (err) {
                        res.status(400).json({"error": err.message});
                        return;
                    }
                    let b = rows.map(o => t[o.id.toString()] ? {...o, likes: t[o.id.toString()]} : {
                        ...o,
                        likes: 0
                    }).map(o => {
                        return a[o.id.toString()] ? {...o, answers: a[o.id.toString()]} : {...o, answers: 0}
                    }).sort((a, b) => ((Date.now() - Date.parse(b.time)) / (1000 * 3600 * 24) - ((Date.now() - Date.parse(a.time)) / (1000 * 3600 * 24)))).reverse().sort((a, b) => {
                        // @ts-ignore
                        return b.time - a.time
                    })
                    console.log(3)

                    sql = 'select time from users ' +
                        'where users.id = ?'
                    let l
                    db.all(sql, params, async (erreee, y) => {
                        if (erreee) {
                            res.status(400).json({"error": erreee.message});
                            return;
                        }
                        l = y[0]
                        sql = 'select users.img as img, users.nickname as nickname, answers.quest_id as quest, answers.content as content, answers.id as id, quests.title as title, quests.time as time, users.id as user_id  from answers ' +
                            "JOIN users on users.id = answers.user_id " +
                            'JOIN quests on quests.id = answers.quest_id ' +
                            'where answers.user_id = ?'
                        db.all(sql, params, async (errors, rows) => {
                            if (errors) {
                                console.log(errors)
                                res.status(400).json({"error": errors.message});
                                return;
                            }
                            res.json({
                                'message': 'succes', data: {
                                    quests: b,
                                    answers: rows.sort((a, b) => ((Date.now() - Date.parse(b.time)) / (1000 * 3600 * 24) - ((Date.now() - Date.parse(a.time)) / (1000 * 3600 * 24)))).reverse().sort((a, b) => {
                                        // @ts-ignore
                                        return b.time - a.time
                                    }),
                                    likes: h,
                                    time: l.time
                                }
                            })
                        })
                    })


                });
            });
        })

// COUNT(answers.id) as answers,
// COUNT(likes.id) as likes, sum(case when quests.id = answers.quest_id then 1 else 0 end) AS answers,


    })
})
;
// data: rows.reduce((acc, item) =>
//         acc.find((find) => JSON.stringify(find) === JSON.stringify(item))
//             ? acc
//             : [...acc, item],
//     []
// ).sort((a, b) => a - b) // и сортировочка для красоты :)
module.exports = router;

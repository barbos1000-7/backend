const express = require('express');
const router = express.Router();

let db = require('../../database')
const AuthMiddlle = require("../../middleware/authMiddleware");
const sendAnswer = require('../../mail/sendAnswer')


router.post("/answer", AuthMiddlle, (req, res) => {
    try {
        const {content, quest_id, time} = req.body
        const id = req.user.id
        const insert = 'INSERT or IGNORE INTO answers (content, time, user_id, quest_id) VALUES (?,?,?,?)'
        db.run(insert, [content, time, id, quest_id])
        let sql = "select mail, mailAuth from users " +
            "where id = ?"
        let params = [id]
        let mailAuth, mail
        db.all(sql, params, (err, b) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            mailAuth = b[0].mailAuth
            mail = b[0].mail
            if (mailAuth) {
                sql = "select id from answers " +
                    "where quest_id = ?"
                let count = 0
                let title = ''
                params = [quest_id]
                db.all(sql, params, (err, b) => {
                    if (err) {
                        res.status(400).json({"error": err.message});
                        return;
                    }
                    count = b.length
                    console.log(count, 'c')
                    sql = "select title from quests " +
                        "where id = ?"
                    db.all(sql, params, (err, b) => {
                        if (err) {
                            res.status(400).json({"error": err.message});
                            return;
                        }
                        title = b[0].title
                        console.log(title, 't')
                        sendAnswer(mail, count, title)
                    });
                });
            }
        });
        console.log(mailAuth)
        return res.json({"message": "Ответ отправлен"})
    } catch (e) {
        res.status(400).json({"message": 'Ошибка отправки ответа на вопрос!!', e})
    }

});

module.exports = router;

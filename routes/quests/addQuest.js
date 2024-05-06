const express = require('express');
const router = express.Router();

let db = require('../../database')
const AuthMiddlle = require("../../middleware/authMiddleware");

router.post("/quest", AuthMiddlle, (req, res) => {
    try {
        const {subject, title, body, time} = req.body
        console.log(req.body)
        const id = req.user.id
        const insert = 'INSERT or IGNORE INTO quests (subject, title, body, time, user_id) VALUES (?,?,?,?,?)'
        try {
            db.run(insert, [subject, title, body, time, id])
            return res.json({"message": "Вопрос отправлен"})
        } catch (e) {
            res.status(400).json({"message": 'Ошибка отправки ответа на вопрос!!', e})
        }
    } catch (e) {
        res.status(400).json({"message": 'Ошибка отправки ответа на вопрос!!', e})
    }

});

module.exports = router;

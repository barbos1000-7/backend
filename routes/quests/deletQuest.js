const express = require('express');
const router = express.Router();

let db = require('../../database')
const AuthMiddlle = require("../../middleware/authMiddleware");

router.get("/questDelete/:ID", AuthMiddlle, async (req, res) => {
    try {
        const sql = "select user_id as user from quests " +
            "where id = ?"
        const params = [req.params.ID]
        let a = 0
        const id = req.user.id
        const del = 'DELETE from  quests ' +
            'where id = ?'
        await db.all(sql, params, (err, b) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            a = b[0] ? b[0].user : 0
            if (id == a || id == 1) {
                db.run(del, [req.params.ID])
                return res.json({"message": "Вопрос удален"})
            } else res.json({"message": 'Ошибка отправки ответа на вопрос!!'})
        });


    } catch (e) {
        res.status(400).json({"message": 'Ошибка отправки ответа на вопрос!!', e})
    }

});

module.exports = router;

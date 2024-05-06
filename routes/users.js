var express = require('express');
// const axios = require('axios/dist/browser/axios.cjs');
const axios = require("axios");
var router = express.Router();
let db = require('../database')

/* GET users listing. */
router.get('/users', function (req, res, next) {
    const sql = 'select * from users'
    const params = []
    axios.get('https://ws.duelbits.com/betradar/events/sr:match:46295647/markets?marketIds=1,11,16,18,892,601,145,138,167,38,168,14,900,901,141,40,35,162,32,21,146,898,45,20,23,172,101,142,139,170,19,165,31,896,24,568,166,899,171,10,29,8,100,105,140,110,163,108,575,104,885,582,587,102,107,886,597,883,884,37,136,169,26', {
        headers: {
            'authority': 'ws.duelbits.com',
            'accept': '*/*',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': '_ga=GA1.1.1101500237.1708253222; intercom-id-l0xzevcs=308cdd14-1ee8-431f-94f6-27d2bab1a9b7; intercom-device-id-l0xzevcs=f00f82dd-803f-4b68-a73e-2086401c300b; _sp_srt_ses.b8a9=*; intercom-session-l0xzevcs=bWhPL1JNTk41VnNGWDFVcVFWNFYwTUN1MldjOWNpa2NXQUtWVUhzTFBkU1UzMWg0V0ZaWVV1ZVRrUDhaaXJTRy0tdTF1YmwxY0lNN2dkKzNETW4yMWhkdz09--44ae3e02ab1e5101e6a22b40cc7c7b501067ae24; __cf_bm=Uq7kselmHaEI7YDFttIJ5957aVqmqjEmaUDgfNfoDu8-1708549318-1.0-AaIzd0uEQJ5N4hwUVyj53toDohXeOLU6C4SIeBfTNIHPJpSO47KKDUOJo54DOwntC/rcXuOia3rLEnA+aDOdWeo=; cf_clearance=5W26dU9m_oU9Me__sAJb1vN8vsNLqHGVhrknmUJshmE-1708549326-1.0-AapcjoWBW8viBC31dVXm6lFvKQABDH5ZP1n76/PzCjMEtvLYi4L7bQXgiR2Kf6zxssSttqaXXCHDUeC3cCn4pc0=; _sp_srt_id.b8a9=f5d2d801-4a84-492d-8fa5-e75e8491e182.1708253221.13.1708549329.1708545748.938f066d-0dd7-40a0-9e7d-ddccf52e2aba.c6b9d001-9bc8-4992-99cc-6a17ddf88663.3ba350c1-4b99-4dfb-b6f6-e98dd4c5c5ba.1708548766098.1; _ga_3WKBNWRRK5=GS1.1.1708548462.14.1.1708549329.51.0.0',
            'origin': 'https://duelbits.com',
            'referer': 'https://duelbits.com/',
            'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        }
    }).then(res => console.log(res.data)).catch(er => console.log(er));
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.json(err.message)
        }
        res.json({"Message": "suca", data: rows})
    })
});

module.exports = router;

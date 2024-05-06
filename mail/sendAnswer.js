const nodemailer
    = require('nodemailer')
const {SMTP_HOST, SMTP_USER, SMTP_PASS} = require("../config")


module.exports = async (to, count, head) => {
    console.log(to, count, head, '123123')
    let answer = ''
    const transporter = nodemailer.createTransport({
        // pool: true,
        host: SMTP_HOST,
        secure: true,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    })
    if (count === 5) {
        answer = 'Уже пять ответов!'
    } else if (count === 10) {
        answer = 'Уже десять ответов!'
    }
    let a = await transporter.sendMail({
        from: SMTP_USER,
        to,
        subject: 'На ваш вопросик был дан ответик',
        text: ``,
        html: `
        	<div> 
        		<h1>На ваш вопросик с заголовком ${head} ответ какой-то юзер! посмотрите же!!</h1>
        		<h2>${answer}</h2>
        	</div>
        `
    })
    console.log(a, 1243)

}
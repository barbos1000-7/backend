const nodemailer
    = require('nodemailer')
const {SMTP_HOST, SMTP_USER, SMTP_PASS} = require("../config")


module.exports = async (to, code) => {
    const transporter = nodemailer.createTransport({
        // pool: true,
        host: SMTP_HOST,
        secure: true,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    })
    let a = await transporter.sendMail({
        from: SMTP_USER,
        to,
        subject: 'Подтверждение почты на YoungTea',
        text: ``,
        html: `
        	<div> 
        		<h1>Введите этот шести значный набор рандомной хуеты</h1>
        		<h2>${code}</h2>
        	</div>
        `
    })
    console.log(a, 1243)

}
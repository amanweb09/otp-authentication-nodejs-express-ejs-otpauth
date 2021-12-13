const express = require('express');
const app = express();
const port = 3000;
const OTPAuth = require('otpauth');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

const path = require('path');
const views_path = path.join(__dirname, '../views');
const static_path = path.join(__dirname, '../public');

app.set('view engine', 'ejs');
app.set('views', views_path);

app.use(express.static(static_path));

app.get('/', (req, res) => {
    return res.status(200).render('index')
});

app.get('/enter-details', (req, res) => {
    res.status(200).render('phone_number');
})

app.post('/get-otp', (req, res) => {
    const { tel } = req.body;

    if (!tel) {
        return res.json({ failureMessage: "Please Enter your Phone Number" })
    }
    else if (tel.length < 8 || tel.length > 12) {
        return res.json({ failureMessage: "Please Enter a Valid Phone Number" })
    }

    else {
        let totp = new OTPAuth.TOTP({
            issuer: 'ACME',
            label: 'AzureDiamond',
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: OTPAuth.Secret.fromBase32('NB2W45DFOIZA')
        })

        let token = totp.generate();

        if (token) {
            console.log(token);
            res.status(200).json({ token })
        }
    }
})

app.get('/success-screen', (req, res) => {
    res.status(200).render('successScreen')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
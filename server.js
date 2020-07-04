const path = require('path');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const enforce = require('express-sslify');

if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, error => {
    if(error) throw error;
    console.log("Server Running on port " + port);
});

app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..','build', 'service-worker.js'));
});

app.post('/payment', (req, res) => {
    const { token, amount } = req.body;
    const body = {
        source: token.id,
        amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (sErr, sRes) => {
        if(sErr){
            res.status(500).send({ error: sErr });
        }else {
            res.status(200).send({ success: sRes });
        }
    });
});

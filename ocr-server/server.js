//IMPORTANT: script requires Google Cloud application credentials (https://cloud.google.com/vision/docs/before-you-begin)
// run export GOOGLE_APPLICATION_CREDENTIALS=[FILEPATH TO JSON FILE KEY]
// in the console before running this script in order to set credentials to env variable

const express = require('express');
const bodyParser = require('body-parser');
const vision = require('@google-cloud/vision');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');

require('./src/db/mongoose')
const Invoice = require('./src/models/Invoice')

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// const connectionURL = 'mongodb://127.0.0.1:27017';
// const databaseName = 'invoice-data';

// MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
//     if (err) {
//         return console.log('Unable to connect')
//     }
//     console.log('Connected correctly!')
//     const db = client.db(databaseName)
//     db.collection('invoices').insertOne({
//         item: 'pipes',
//         quantity: 10
//     }, (error, result) => {
//         if(error) {
//             return console.log('Unable to inser invoice data.')
//         }
//         console.log(result.ops)
//     })
// })

const app = express();

const uploadImage = require('./controllers/uploadImage');
const { response } = require('express');

var storage = multer.diskStorage({
    destination: __dirname + '/public/img',
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

app.use(bodyParser.json());
var corsOptions = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.static('public'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
console.log(__dirname)

const client = new vision.ImageAnnotatorClient()

app.post('/upload', upload.single('photo'), (req, res) => { uploadImage.uploadGoogleVision(req, res, client) });

app.post('/writeToFile', (req, res) => {
    // console.log(typeof JSON.stringify(req.body))
    fs.writeFileSync('public/img/test.json', JSON.stringify(req.body));
})

app.post('/writeInvoice', (req, res) => {
    const invoice = new Invoice(req.body)

    invoice.save().then(() => {
        res.send(invoice)
    }).catch((err) => {
        throw new Error(err)
    })
})


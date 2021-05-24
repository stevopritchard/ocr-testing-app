//IMPORTANT: script requires Google Cloud application credentials (https://cloud.google.com/vision/docs/before-you-begin)
// run export GOOGLE_APPLICATION_CREDENTIALS=[FILEPATH TO JSON FILE KEY]
// in the console before running this script in order to set credentials to env variable

const express = require('express');
const bodyParser = require('body-parser');
const vision = require('@google-cloud/vision'); //to remove
const aws = require('aws-sdk');
const config = require('./config')
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');

const postmanRequest = require('postman-request');
const bpAPIKey = '0247CdLRYuDTh05ixh0UoI2P/qK0MINvkol+l/IZNHU=';
const bpAppRef = 'cotterillcivilslimited_bp-testing';

require('./src/db/mongoose')
const Invoice = require('./src/models/Invoice')

const app = express();

const getFormData = require('./controllers/getFormData');
const getTableData = require('./controllers/getTableData');
const { response, request } = require('express');

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


aws.config.update({
    accessKeyId: config.awsAccesskeyID,
    secretAccessKey: config.secretAccessKey,
    region: config.awsRegion
})

const textract = new aws.Textract()


// app.post('/getFormData', upload.single('photo'), (req, res) => { 
//     getFormData.textractForm(req, res, textract, storage)
// });

app.post('/getFormData', upload.array('photo'), (req, res) => { 
    // console.log(req.files)
    getFormData.textractForm(req, res, textract, storage)
});

app.post('/getTableData', upload.single('photo'), (req, res) => { 
    getTableData.textractTable(req, res, textract) 
});

// app.post('/writeToFile', (req, res) => {
//     // console.log(typeof JSON.stringify(req.body))
//     fs.writeFileSync('public/img/test.json', JSON.stringify(req.body));
// })

app.post('/queryBp', (req, res) => {
    postmanRequest({
            uri: `https://ws-eu1.brightpearl.com/public-api/cotterillcivilslimited/order-service/order/${req.body.orderId}`,
            headers: {
                'brightpearl-app-ref': bpAppRef,
                'brightpearl-account-token': bpAPIKey
            }
        }, (error, response, body) => {
            if(!error && response.statusCode == 200) {
                const orderInfo = JSON.parse(body)
                res.json(orderInfo.response[0])
            }
        })
});

app.post('/writeInvoice', (req, res) => {
    const invoice = new Invoice(req.body)

    invoice.save().then(() => {
        res.send(invoice)
    }).catch((err) => {
        throw new Error(err)
    })
})


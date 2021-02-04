//IMPORTANT: script requires Google Cloud application credentials (https://cloud.google.com/vision/docs/before-you-begin)
// run export GOOGLE_APPLICATION_CREDENTIALS=[FILEPATH TO JSON FILE KEY]
// in the console before running this script in order to set credentials to env variable

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const vision = require('@google-cloud/vision');
const { createWorker } = require('tesseract.js');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');

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
app.use(cors());
app.use(express.static('public'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
console.log(__dirname)

const client = new vision.ImageAnnotatorClient()

app.post('/upload', upload.single('photo'), (req, res) => { uploadImage.uploadGoogleVision(req, res, client) });

// app.post('/upload', upload.single('photo'), (req, res) => {
//     const worker = createWorker({
//         logger: m => console.log(m)
//     });
//     (async () => {
//         await worker.load();
//         await worker.loadLanguage('eng');
//         await worker.initialize('eng');
//         const { data: {text} } = await worker.recognize(req.file)
//         console.log(text)
//         // res.send(JSON.stringify(text))
//         await worker.terminate();
//     })  
// })


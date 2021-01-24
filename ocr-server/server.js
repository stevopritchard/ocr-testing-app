//IMPORTANT: script requires Google Cloud application credentials (https://cloud.google.com/vision/docs/before-you-begin)
// run export GOOGLE_APPLICATION_CREDENTIALS=[FILEPATH TO JSON FILE KEY]
// in the console before running this script in order to set credentials to env variable

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const vision = require('@google-cloud/vision');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');

const upload = multer({dest: __dirname + '/public/img'})

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
console.log(__dirname)

//endpoint to confirm that server.js file is live. not required
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

const client = new vision.ImageAnnotatorClient()

const [, , filepath] = process.argv // note: pass filepath to image file as arguement
// const [ , , ...args ] = process.argv; //note that this returns an array object. Not usable as an argument
// console.log(filepath, args)

// app.get('/read_text', (req, res) => {
//     client.textDetection(filepath)
//     .then(results => {
//         const result = results[0].textAnnotations[0].description;
//         res.send(JSON.stringify(result, null, 2));
//     })
// })

app.post('/submit_image', (req, res) => {
    const { image } = req.body;
    if(!image) {
        res.state(400).json("Please provide an image filepath.")
    } else {
        client.textDetection(image)
        .then(results => {
            const result = results[0].textAnnotations[0].description;
            res.send(JSON.stringify(result, null, 2));
        })
        .catch(err => console.log(err))
    }
})

app.post('/write_image', (req, res) => {
    const { url } = req.body;
    if(!url){
        res.status(400).json("Please provide URL.")
    } else {
        var data = url.replace(/^data:image\/\w+;base64,/, "");
        console.log(data)
        var buf = Buffer.from(data, 'base64');
        fs.writeFile('image.png', buf, (err) => {
            if(err) throw err;
            console.log('The file has been received!')
        });
    }
    res.send(200).json("Image has been received!")
})

app.post('/upload', upload.single('photo'), (req,res) => {
    console.log(req.body)
    console.log(req.file)
    if(req.file) {
        // res.json(req.file);
        client.textDetection(req.file.path)
        .then(results => {
            const result = results[0].textAnnotations[0].description;
            res.send(JSON.stringify(result, null, 2));
        })
        .catch(err => console.log(err))
    } else throw 'error';
});
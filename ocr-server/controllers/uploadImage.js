const uploadGoogleVision = (req, res, client) => {
    console.log(req.body)
    console.log(req.file)
    if(req.file) {
        client.textDetection(req.file.path)
        .then(results => {
            const result = results[0].textAnnotations[0].description;
            console.log(result)
            res.send(JSON.stringify(result, null, 2));
        })
        .catch(err => console.log(err))
    } else throw 'error';
};

module.exports = {
    uploadGoogleVision: uploadGoogleVision,
}
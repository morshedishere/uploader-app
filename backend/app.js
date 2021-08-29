const express = require('express')
const formidable = require('formidable');

const cors = require('cors')
const fs = require('fs')
const app = express()
const port = 30001
app.use(express.static('public'))
app.use(cors())

app.get('/', (req, res) => {

    res.json({ data: 'Hello World!' })
})

app.put('/upload', (req, res, next) => {

    var dir = './files';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }


    const form = formidable({ multiples: true });
    form.maxFileSize = 800 * 1024 * 1024;

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        Object.values(files).forEach((file) => {
            let oldpath = file.path;
            let newpath = __dirname + '/files/' + file.name;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
            });
        })

        res.write('File uploaded and moved!');
        // this is the path, variable newpath, but can't be accessed
        // outside this function, tried to make it global but didn't work either        
        res.write('newpath');
        res.end();
    });

})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
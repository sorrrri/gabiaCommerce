const express = require('express');
const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use('/', express.static(`${__dirname}/dist/`));

app.get('/', (req, res) => {
    res.render('index', {})
})

const server = app.listen(8015, () => {
    console.log('Express listening on port: ' + server.address().port)
})
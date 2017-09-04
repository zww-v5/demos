var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
    res.type('text/plain');
    res.send('app');
});

app.get('/about', function(req, res) {
    res.type('text/plain');
    res.send('about app');
});

app.get('/vote', function(req, res){
    res.render('vote');
});

app.get('/headers', function(req, res) {
    res.set('Content-Type', 'text/plain');
    var s = '';
    for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    res.send(s);
});

app.use(require('body-parser')());

app.post('/process', function(req, res){
    console.log('query string：' + req.query.form);
    console.log('query body: ' + req.body.rtx);
    res.render('success');
});

app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - not found');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), function() {
    console.log(
        'Express started o http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate'
    );
});

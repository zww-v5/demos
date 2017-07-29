var express = require('express');

var app = express();

// 设置 handlebars 视图 引擎
var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// 定义数组
var fortunes = [
        "Conquer your fears or they will conquer you.",
        "Rivers need springs.",
        "Do not fear what you don' t know.",
        "You will have a pleasant surprise.",
        "Whenever possible, keep it simple.",
    ];

// 定义静态资源
app.use(express.static(__dirname + '/public'));

// 首页
app.get('/', function(req, res) {
    res.render('home');
});

// 关于页面
app.get('/about', function(req, res) {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    res.render('about', {fortune: randomFortune});
});

// 定制404页面
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

// 定制500页面
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

// 监听端口
app.listen(app.get('port'), function() {
    console.log(
        'Express started o http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate'
    );
});

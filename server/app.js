/**
 * Created by Keum_nim on 2016. 6. 27..
 */
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');


//서비스에 있던 배열을 노드로 옮김
var todos = [{
    id: 1,
    title: '출근하기',
    completed:true
},{
    id: 2,
    title: '데이트하기WMG',
    completed:false
},{
    id: 3,
    title: 'Study',
    completed:true
}];

// body parser -post 사용을 위해 필요
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Get /api/todos 라우팅 설치
app.get('/api/todos', function (req, res) {
    res.json(todos);
});

//Post /api/todos
app.post('/api/todos', function(req, res){

    console.log("/api/todos -post::::"+req.body.title)

    var newTodoId = todos.length > 0 ? todos[todos.length -1].id + 1 : 1;

    var newTodo = {
        id: newTodoId,
        title: req.body.title,
        completed: false
    };

    todos.push(newTodo);
    res.json(todos);
});

// static files
app.use('/', express.static(path.join(__dirname, '../client')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

app.get('/', function (req, res) {
    res.sendfile('../client/index.html');
});

//서버 구동시
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

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

// static files
app.use('/', express.static(path.join(__dirname, '../client')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

// body parser -post 사용을 위해 필요
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Get /api/todos 라우팅 설치
app.get('/api/todos', function (req, res) {
    console.log("---------------------/api/todos -get::::"+todos);

    res.json(todos);
});

//Post /api/todos
app.post('/api/todos', function(req, res){
    console.log("---------------------/api/todos -post::::"+req.body.title);

    var newTodo = {
        id: todos.length > 0 ? todos[todos.length -1].id + 1 : 1,
        title: req.body.title,
        completed: false
    };

    todos.push(newTodo);
    res.json(newTodo);
});


//Put /api/todos
app.put('/api/todos/:id', function (req, res) {
    console.log("---------------------/api/todos -put::::"+req.params.id);
    // find todo
    var id = parseInt(req.params.id, 10);

    /*todos에서 해당항목 찾기*/
    var idx = todos.findIndex(function (todo) {
        return todo.id === id;
    });

    if (idx === -1) {
        return res.status(404).send();
    }

    // update todo
    todos[idx].title = req.body.title;
    todos[idx].completed = req.body.completed;

    // return updated todo
    // res.json(todos[idx]); //필요없음
});

//Delete /api/todos
app.delete('/api/todos/:ids', function (req, res) {
    console.log("---------------------/api/todos -delete::::"+req.params.id);
    var ids = req.params.ids.split(',').map(function (id) {
        return parseInt(id, 10);
    });

    ids.forEach(function (id) {
        /*todos에서 해당항목 찾기*/
        var foundTodo = todos.findIndex(function (todo) {
            return todo.id === id
        });
        console.log("foundTodo::"+foundTodo)

        //delete todo
        if (foundTodo > -1) {
            todos.splice(foundTodo, 1);
        }
    });

    res.send();
});


app.get('/', function (req, res) {
    res.sendfile('../client/index.html');
});

//서버 구동시
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

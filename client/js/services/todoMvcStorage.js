/**
 * Created by Keum_nim on 2016. 6. 26..
 */
/**
 * service부분
 */

angular.module('todomvc')
.factory('todoMvcStorage', function ($http) {

    var storage = {
        todos: [],

        /*todo 목록 생성*/
        get: function (callback) {
            console.log("Service::function get");

            $http.get('/api/todos').then(function success(response) {    // GET /api/todos 요청
                console.log("Service::function get::"+response);         // 성공

//                storage.todos = response.data;
                callback(null, angular.copy(response.data, storage.todos));
            }, function error(err) {                                    // 실패
                console.error(err);
                callback(err, null);
            });
        },
        /*todo 생성*/
        post: function (newTodoTitle) {
            console.log("Service::function put:"+newTodoTitle);

            var body = {
                title: newTodoTitle
            };

            $http.post('/api/todos', body).then(function success(response) {
                storage.todos.push(response.data);
                //angular.copy(response.data, storage.todos)

            });
        },
        /*todo 삭제*/
        delete: function(todo){
            console.log("Service::function delete"+todo);

            /*todos에서 해당항목 찾기*/
            var findIdx = storage.todos.findIndex(function (t) {
                return t.id === todo.id;
            });

            console.log("findIdx::"+findIdx)
            // remove
            if (findIdx > -1) {
                storage.todos.splice(findIdx, 1);
            };
        },
        /*todo 갱신(update)*/
        update: function (todo) {
            console.log("Service::function put"+todo);

            /*todos에서 해당항목 찾기*/
            var findIdx = storage.todos.findIndex(function (t) {
                return t.id === todo.id;
            });

            /*update todo*/
            storage.todos[findIdx].title = todo.title;
            storage.todos[findIdx].completed = todo.completed;
        },
        /*todo deleteCompleted*/
        deleteCompleted: function () {
            // Filter completed todo id list
            var completedTodos = storage.todos.filter(function (todo) {
                return todo.completed;
            });
            console.log(completedTodos);

            var completedTodoIds = completedTodos.map(function (todo) {
                return todo.id;
            });
            console.log(completedTodoIds); //[1,3]

            completedTodoIds.forEach(function (id) {
                var foundTodo = storage.todos.findIndex(function (todo) {
                    return todo.id === id
                });

                if (foundTodo > -1) {
                    storage.todos.splice(foundTodo, 1);
                }
            });

            console.log(ids); //[1,3]


        }


    };

    return storage;
});


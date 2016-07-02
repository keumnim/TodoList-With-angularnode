/**
 * Created by Keum_nim on 2016. 6. 26..
 */
/**
 * service부분
 */

angular.module('todomvc')
.factory('todoMvcStorage', function ($http, $q) {

    var storage = {
        todos: [],

        /*todo 목록 생성*/
        get: function () {
            console.log("Service::function get");
            var deferred = $q.defer();

            $http.get('/api/todos').then(function success(response) {    // GET /api/todos 요청
                console.log("Service::function get::"+response);         // 성공
                deferred.resolve(angular.copy(response.data, storage.todos));
            }, function error(err) {                                    // 실패
                console.error(err);
                deferred.reject(err);
            });

            return deferred.promise;
        },
        /*todo 생성*/
        post: function (todo) {
            console.log("Service::function post:"+todo.title);
            var deferred = $q.defer();

            $http.post('/api/todos', {
                title: todo.title
            }).then(function success(response) {
                deferred.resolve(response.data);
                //angular.copy(response.data, storage.todos)
            },function error(err) {
                console.error(err);
                deferred.reject(err);
            });

            return deferred.promise;
        },
        /*todo 갱신(update)*/
        update: function (todo) {
            console.log("Service::function update:"+todo);
            if (!todo) return;

            $http.put('/api/todos/' + todo.id, todo)
                .then(function successs(response) {
                    console.log(response);
                }, function error(err) {
                    console.error(err);
                });

        },
        /*todo 삭제*/
        delete: function(todo){
            console.log("Service::function delete"+todo);
            if (!todo) return;

            $http.delete('/api/todos/' + todo.id)
                .then(function successs(response) {
                    console.log(response);
                }, function error(err) {
                    console.error(err);
                });
        },
        /*todo clearCompleted*/
        clearCompleted: function () {
            console.log("Service::function delete");

            // Filter completed todo id list
            var completedTodos = storage.todos.filter(function (todo) {
                return todo.completed;
            });

            var completedTodoIds = completedTodos.map(function (todo) {
                return todo.id;
            });
            console.log(completedTodoIds); //[1,3]

            $http.delete('/api/todos/' + completedTodoIds.join(','))
                .then(function success (response) {
                    console.log(response);
                }, function (error) {
                    console.error(err);
                })
        }


    };

    return storage;
});


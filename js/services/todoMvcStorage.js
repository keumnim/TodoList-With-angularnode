/**
 * Created by Keum_nim on 2016. 6. 26..
 */
/**
 * service부분
 */

angular.module('todomvc')
.factory('todoMvcStorage', function () {

    var storage = {
        todos: [{
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
        }],

        /*todo 목록 생성*/
        get: function () {
            console.log("Service::function get");
            return storage.todos;
        },
        /*todo 생성*/
        post: function (newTodoTitle) {
            console.log("Service::function put:"+newTodoTitle);

             var todos = todos;
             var newTodoId = storage.todos.length > 0 ?
             storage.todos[storage.todos.length -1].id + 1 :
                 1;

             var newTodo = {
                id: newTodoId,
                title: newTodoTitle,
                completed: false
              };

            storage.todos.push(newTodo);
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


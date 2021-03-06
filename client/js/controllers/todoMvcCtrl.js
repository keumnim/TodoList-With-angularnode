/**
 * Created by Keum_nim on 2016. 6. 26..
 * 컨트롤러 생성하기
 * 사용자 이벤트를 감지하고 템플릿에 데이터를 보내주는 역할, 즉 템플릿과 직접 연결되는 부분
 */
angular.module('todomvc')
    .controller('todoMvcCtrl', function ($scope, todoMvcStorage) {

        $scope.message = "Hello World";

        /*처음 출력되는 todos*/
        //$scope.todos =todoMvcStorage.get();

        /* 비동기 함수이미로 콜백 함수를 파라매터로 넘겼다.*/
        todoMvcStorage.get().then(function (todos) {
            console.log("todoMvcCtrl.js::Get.then");
            $scope.todos = todos;
        });

        /* todos에서 addTodo */
        $scope.addTodo = function (newTodoTitle) {
            console.log("todoMvcCtrl.js::addTodo")
            console.log("todoTitle::"+newTodoTitle);
            if (newTodoTitle == undefined) return;

            /*들어오는 값이 ''이라면 return*/
            var newTodoTitle = newTodoTitle.trim();
            if (newTodoTitle === '') return;

            var newTodo = {
                title: newTodoTitle,
            };

            /*service:post 호출*/
            todoMvcStorage.post(newTodo).then(function (todo) {
                console.log("todoMvcCtrl.js::Post.then");
                /*UI에서 해당 todo 추가*/
                $scope.todos.push(todo);
                /*add input창을 초기화*/
                $scope.newTodoTitle = null;
            });
        };

        /* todos에 해당 todoe update */
        $scope.update = function (todo) {
            console.log("todoMvcCtrl.js::update");
            console.log("id::"+todo.id)

            /*service:update 호출*/
            todoMvcStorage.update(todo);
        };

        /* todos에서 해당 id항목 삭제 */
        $scope.remove = function (todo) {
            console.log("todoMvcCtrl.js::remove");
            console.log("id::"+todo.id)

            /*service:delete 호출*/
            todoMvcStorage.delete(todo);

            /*UI에서 해당 id 제거*/
            $scope.todos.splice($scope.todos.indexOf(todo), 1);
        };

        /* todos에서 completed된 항목 Clear */
        $scope.clearCompleted = function () {
            console.log("todoMvcCtrl.js::clearCompleted");

            todoMvcStorage.clearCompleted();

            /*UI에서 해당 id 제거*/
            var incompleteTodos = $scope.todos.filter(function (todo) {
                return !todo.completed;
            });
            angular.copy(incompleteTodos, $scope.todos);
        };


    });
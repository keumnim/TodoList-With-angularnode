/**
 * Created by Keum_nim on 2016. 6. 26..
 */

angular.module('todomvc')
    .directive('todoItem', function() {
        return {
            restrict: 'E',
            scope: { // 디렉티브 스코프 설정
                todo: '=',   // 양방향 바인딩
                remove: '&', // 참고 바인딩. 함수 설정시 사용함
                update: '&'
            },
            template:
            '<div class="input-group">' +
                '<span class="input-group-addon">' +
                    '<input type="checkbox" ng-model="todo.completed" ng-click="update(todo)">' +
                    '</span>' +
                    '<input type="text" ng-model="todo.title" ng-blur="update(todo)" class="form-control">' +
                    '<span class="input-group-btn">' +
                    '<button ng-click="remove(todo)" class="btn btn-danger">Remove</button>' +
                '</span>' +<!-- ng-click 디렉티브로 컨트롤러의 remove() 함수와 연력-->
            '</div>'
        }
    });
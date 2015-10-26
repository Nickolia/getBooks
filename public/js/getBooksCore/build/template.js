angular.module("getBooksCore", []).run(["$templateCache", function($templateCache) {$templateCache.put("timer.html","<span>{{(\'0\' + date.getDate()).slice(-2)}}/{{(\'0\' + (date.getMonth()+1)).slice(-2)}}/{{date.getFullYear()}} &nbsp; {{(\'0\' + date.getHours()).slice(-2)}}:{{(\'0\' + date.getMinutes()).slice(-2)}}</span>\n");
$templateCache.put("update_list.html","<md-toolbar class=\"md-theme-light\">\n    <div class=\"md-toolbar-tools\">\n        <h2 flex flex-order=\"1\">\n            <span ng-bind-html=\"options.tag_name\"></span>\n        </h2>\n        <div  flex flex-order=\"2\" layout=\"row\" layout-align=\"end center\">\n\n        </div>\n    </div>\n\n\n</md-toolbar>\n<md-content md-scroll-y style=\"height: {{!list.length?0:440}}px;\">\n    <md-list>\n        <md-list-item class=\"md-3-line md-no-proxy animated fadeInLeft\" ng-repeat=\"item in list | orderBy:options.order | limitTo: options.limit | filter: filter_active track by item.id\">\n            <div class=\"md-list-item-text\">\n                <h3 ng-bind-html=\"item.title\"></h3>\n                <h4 ng-bind-html=\"item.author\"></h4>\n                <p>Обновлено: <timer unix-time=\"item.unix_time\"></timer></p>\n                <p ng-show=\"!!item.note_visable\" ng-bind-html=\"item.note\"></p>\n            </div>\n            <div class=\"md-list-item-control-right-top\">\n                <md-button class=\"md-icon-button md-primary\" aria-label=\"Settings\" ng-if=\"!!item.note\" ng-class=\"{\'active\': !item.note_visable}\" ng-click=\"item.note_visable = !item.note_visable\">\n                    <ng-md-icon icon=\"event_note\" options=\"{\'duration\': 375}\"></ng-md-icon>\n                    <md-tooltip>\n                        {{!!item.note_visable?\'Скрыть\': \'Показать\'}} Описание\n                    </md-tooltip>\n                </md-button>\n            </div>\n            <md-divider></md-divider>\n        </md-list-item>\n    </md-list>\n    <div layout=\"row\" layout-sm=\"column\" layout-align=\"center center\" layout-wrap  layout-margin ng-if=\"!!list.length && options.limit != list.length\">\n        <md-button class=\"md-fab\" aria-label=\"Показать ещё\" ng-click=\"options.addToLimit()\">\n            <ng-md-icon icon=\"control_point\" options=\"{\'duration\': 375}\"></ng-md-icon>\n            <md-tooltip>\n                Показать ещё\n            </md-tooltip>\n        </md-button>\n    </div>\n</md-content>");}]);
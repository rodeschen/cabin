define(['cabin'], function(cabin) {

	return cabin.directive('cbNotify', ['$timeout','$document', '$window','$resource', function ($timeout, $document, $window,$resource) {
		return {
			template:
			'<div class="msg-area msg-{{ isOpen?\'open\':\'close\' }}" ng-click="hasNotify = false"  >'+
	            '<div class="msg-title  {{hasNotify && \'msg-notify\'}}" ng-click="toggleNotify()">' +
	                ' Message &nbsp;<i class="msg-close-btn {{isOpen?\'icon-double-angle-down\':\'icon-double-angle-up\'}} icon-large"></i>' +
	            '</div>' +
	            	'<div id="msg-body" class="msg-body"><div class="msg-wrapper">' +
	            	'' +
		            	'<div class="msg msg-type-{{event.type}}" ng-repeat="event in events">' +
		                   '<i ng-class="addIcon(event.type)"></i> <span class="msg-event-title"></span><span class="msg-event-time">{{event.time}}</span>:<div class="msg-event-message" ng-bind-html="event.message"></div>' +
		            '' +
		            '</div></div>' +
	            '</div>' +
	        '</div>',
			restrict: 'A',
			scope : {},
			link: function (scope, iElement, iAttrs) {
				scope.events = [];
				// scope.events = [{
				// 	'type':'normal',
				// 	'time':'10/01 10:10:10',
				// 	'message':'aaaaa<br />sdafas'
				// },{
				// 	'type': 'error',
				// 	'time': '10/02 10:10:10',
				// 	'message' : 'message'
				// },{
				// 	'type': 'warn',
				// 	'time': '10/02 10:10:10',
				// 	'message' : 'warnadfaf'
				// }];

				scope.addIcon = function(type){
					return {
						'error':'icon-exclamation-sign',
						'normal': 'icon-bell',
						'warn' : 'icon-warning-sign'

					}[type];
				}

				//init
				iElement.css('zIndex', 1040);
				// action event
				scope.$on("notify",function(ev,data){
					data.type = data.type || 'normal';
					scope.events.push(data); 
					scope.hasNotify = true;
				});


				scope.toggleNotify = function(){
					(scope.isOpen = !scope.isOpen);
					resizeAndScrollBody();
				}

				var body = iElement.find(".msg-body");
				var wrap = body.children(".msg-wrapper");
				var resizeAndScrollBody = function(){
					if(scope.isOpen){
						body.height($document.height() < 450 ? ($document.height() -100): 350);
						$timeout(function(){
							if(wrap.height() > body.height() && body.height() > 10){
								wrap.css('position','static');
								body.scrollTop(wrap.height() + 50);
							}else{
								wrap.css('position','absolute');
							}
						},500);
					}else{
						body.height(-1);
					}
					
					
				}
				scope.$watchCollection("events",resizeAndScrollBody);
				angular.element(window).on('resize',resizeAndScrollBody);
			}
		};
	}]);
});
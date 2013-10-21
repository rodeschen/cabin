'use strict';
define(['cabin'], function(cabin) {
    return [function() {
        return {
            restrict: 'AC',
            scope: {
                'cbSplitter': '@',
                'direction': '@',
                'fixed' : '@'
            },
            link: function(scope, iElement) {
                if (scope.fixed === 'fixed') return;
                var isActive = false;
                var isPerv = /^(up|left)$/.test(scope.direction);
                var target = isPerv ? iElement.prev() : iElement.next();
                var style = /^(up|down)$/.test(scope.direction) ? 'height' : 'width';
                var eventType = /^(up|down)$/.test(scope.direction) ? 'clientY' : 'clientX';
                var sourceSize, targetSize;
                iElement.on('mousedown', function(ev) {
                    isActive = true;
                    targetSize = parseInt(target.css(style));
                    iElement.parents(".flexbox-content").addClass("active");
                }).parent().on('mousemove', function(ev) {
                    if (!isActive) return;
                    if (isPerv) {
                        target.css(style, targetSize + (ev[eventType] - sourceSize));
                    } else {
                        target.css(style, targetSize - (ev[eventType] - sourceSize));
                    }
                }).on('mousedown', function(ev) {
                    sourceSize = ev[eventType];
                }).on('mouseup', function(ev) {
                    isActive = false;
                    iElement.parents(".flexbox-content").removeClass("active");
                });
            }
        };
    }];
});

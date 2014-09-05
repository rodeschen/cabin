'use strict';
define(['cabinDirectivesModule'], function(cabinDirectivesModule) {
    cabinDirectivesModule.directive('cbSplitter', [

        function() {
            return {
                restrict: 'AC',
                // scope: {
                //     'cbSplitter': '@',
                //     'direction': '@',
                //     'fixed': '@',
                //     'gutter': '@'
                // },
                link: function(scope, iElement, iAttr) {
                    if (iAttr.fixed === 'fixed') return;
                    var isActive = false;
                    var isPerv = /^(up|left)$/.test(iAttr.direction);
                    var target = isPerv ? iElement.prev() : iElement.next();
                    var style = /^(up|down)$/.test(iAttr.direction) ? 'height' : 'width';
                    var eventType = /^(up|down)$/.test(iAttr.direction) ? 'clientY' : 'clientX';
                    var gutter = iAttr.gutter || 1;
                    var sourceSize, targetSize;
                    iElement.on('mousedown', function(ev) {
                        isActive = true;
                        targetSize = parseInt(target.css(style));
                        iElement.parents(".flexbox-content").addClass("active");
                    }).parent().on('mousemove', function(ev) {
                        if (!isActive) return;
                        var point = 0,
                            col;
                        if (isPerv) {
                            point = targetSize + (ev[eventType] - sourceSize);
                        } else {
                            point = targetSize - (ev[eventType] - sourceSize);
                        }
                        col = parseInt(point / gutter, 10);
                        // if (Math.abs(point % gutter / gutter) <= 0.3) {
                        if (point % gutter < gutter / 2) {
                            point = gutter * col;
                        } else {
                            point = gutter * (col + 1);
                        }
                        if (point != parseInt(target.css(style), 10)) {
                            target.css(style, point);
                        }
                        //}
                    }).on('mousedown', function(ev) {
                        sourceSize = ev[eventType];
                    }).on('mouseup', function(ev) {
                        isActive = false;
                        iElement.parents(".flexbox-content").removeClass("active");
                    });
                }
            };
        }
    ]);
});

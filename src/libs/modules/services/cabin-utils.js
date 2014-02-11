'use strict';
define(['cabin'], function(cabin) {
    return ['service', 'cbUtils', [
        function() {
            var utils = {
                // from angular ui -utils start
                getCaretPosition: function(input) {
                    input = utils.getNativeDom(input);
                    if (input.selectionStart !== undefined) {
                        return input.selectionStart;
                    } else if (document.selection) {
                        // Curse you IE
                        input.focus();
                        var selection = document.selection.createRange();
                        selection.moveStart('character', -input.value.length);
                        return selection.text.length;
                    }
                    return 0;
                },

                setCaretPosition: function(input, pos) {
                    input = utils.getNativeDom(input);
                    if (input.offsetWidth === 0 || input.offsetHeight === 0) {
                        return; // Input's hidden
                    }
                    if (input.setSelectionRange) {
                        input.focus();
                        input.setSelectionRange(pos, pos);
                    } else if (input.createTextRange) {
                        // Curse you IE
                        var range = input.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', pos);
                        range.moveStart('character', pos);
                        range.select();
                    }
                },
                // from angular ui -utils end
                getNativeDom: function(dom) {
                    if (dom && dom.constructor == angular.element) {
                        return dom[0];
                    }
                    return dom;
                }
            };
            return utils;
        }
    ]];
});

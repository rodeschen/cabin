'use strict';
define(['cabin'], function(cabin) {
    return ['service', 'cbUtils', [

        function() {
            // add String method
            $.extend(String.prototype, {
                // 計算有幾個全型字、中文字... 或英數字混雜
                countLength: function(type) {
                    var c = this.getDouble();
                    if (type == 'B') { // big5
                        // +2
                        return this.length + (c ? c.length : 0);
                    } else { // 預設UTF-8 +3
                        return this.length + (c ? c.length * 2 : 0);
                    }
                },

                getDouble: function() {
                    return this.match(/[^ -~]/g);
                },

                /* 半型字符範圍：33-126;全型字符範圍：65281-65374:對應關係是相差：65248;全型空格：12288;半型空格：32* */
                // 轉全型
                toFull: function() {
                    var result = "";
                    var str = $.trim(this);
                    for (var i = 0; i < str.length; i++) {
                        var tmp;
                        var c = str.charCodeAt(i);
                        tmp = (c <= 126 && c >= 33) && c + 65248 || (c == 32) && 12288 || c;
                        result += String.fromCharCode(tmp);
                    }
                    return result;
                },
                // 轉半型
                toHalf: function() {
                    var result = "";
                    var str = $.trim(this);
                    for (var i = 0; i < str.length; i++) {
                        var tmp;
                        var c = str.charCodeAt(i);
                        tmp = (c <= 65374 && c >= 65281) && c - 65248 || (c == 12288) && 32 || c;
                        result += String.fromCharCode(tmp);
                    }
                    return result;
                }
            });


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
                },
                validDate: function(text, isTwDate) {
                    var comp = (text || "").replace(/\//g, "");
                    if (isTwDate) {
                        if (comp.length === 7) {
                            comp = (parseInt(text.substr(0, 3), 10) + 1911) + text.substr(3);
                        } else {
                            return false;
                        }
                    } else if (comp.length !== 8) {
                        return false;
                    }
                    var y = parseInt(comp.substr(0, 4), 10);
                    var m = parseInt(comp.substr(4, 2), 10);
                    var d = parseInt(comp.substr(6, 2), 10);

                    var date = new Date(y, m - 1, d);
                    if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
                        return true;
                    } else {
                        return false;
                    }

                },
                formatDate: function(text, isTwDate) {
                    var comp = text.replace(/\//g, "");
                    if (this.validDate(comp, isTwDate)) {
                        if (isTwDate) {
                            return comp.substr(0, 3) + "/" + comp.substr(3, 2) + "/" + comp.substr(5, 2);
                        } else {
                            return comp.substr(0, 4) + "/" + comp.substr(4, 2) + "/" + comp.substr(6, 2);
                        }

                    }
                },
                convertAdAndTw: function(text, toAd) {
                    var comp = text.replace(/\//g, "");
                    if (toAd) {
                        return (parseInt(comp.substr(0, 3)) + 1911) + comp.substr(3, 2) + comp.substr(5, 2)
                    } else {
                        var year = parseInt(comp.substr(0, 4)) - 1911;
                        return ((year < 100) ? "0" : "") + year + comp.substr(4, 2) + comp.substr(6, 2);
                    }
                }
            };
            return utils;
        }
    ]];
});

var surf = (function () {
    'use strict';

    var
        left = function () {
            window.scrollBy(-15, 0);
        },

        down = function () {
            window.scrollBy(0, 12);
        },

        up = function () {
            window.scrollBy(0, -12);
        },

        right = function () {
            window.scrollBy(15, 0);
        },

        home = function () {
            window.scroll(0, 0);
        },

        bottom = function () {
            window.scroll(0, document.height);
        },

        isEditable = function (element) {
            var nodename = element.nodeName.toLowerCase;

            if ((nodename === 'textarea')) {
                return true;
            }

            if (nodename === 'input' && element.type === 'text') {
                return true;
            }

            if (document.designMode === 'on' || element.contentEditable === 'true') {
                return true;
            }

            return false;
        },

        // vi key bindings
        setupKeys = function () {
            var bindings = {
                'h': left,
                'j': down,
                'k': up,
                'l': right,
                'g': home,
                'G': bottom
            };

            window.addEventListener('keypress', function (event) {
                var target = event.target,
                    key,
                    func;

                if (isEditable(target)) {
                    return;
                }

                key = String.fromCharCode(event.charCode);
                func = bindings[key];

                if (func) {
                    func();
                }
            }, false);
        },

        // Open links in a new instance by middle clicking on them
        setupMouse = function () {
            window.addEventListener('click', function (event) {
                var url = event.srcElement.href;

                if (event.button === 1 && url) {
                    event.stopPropagation();
                    event.preventDefault();
                    window.open(url);
                }
            }, false);
        },

        init = function () {
            setupKeys();
            setupMouse();
        };

    return {
        init: init
    };
}());

surf.init();

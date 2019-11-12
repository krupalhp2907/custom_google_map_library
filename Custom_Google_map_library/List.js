(function (window) {
    var List = (function () {
        function List() {
            this.items = [];
        }
        List.prototype = {
            add: function (item) {
                this.items.push(item);
            },
            remove: function (item, i) {
                var indexOf = this.items.indexOf(item);
                if (indexOf !== -1) {
                    this.items.splice(indexOf, 1);
                }
            },
            find: function (callback, action) {
                var items = this.items,
                    i = 0,
                    length = items.length,
                    matches = [];

                for (; i < length; i++) {
                    var callbackReturnValue = callback(items[i], i);
                    if (callbackReturnValue) {
                        matches.push(items[i]);
                    }
                }
                if (action) {
                    action.call(this, matches);
                }
                return matches;
            }
        }
        return List
    }());
    List.create = function (opts) {
        return new List(opts);
    }
    window.List = List;
}(window));
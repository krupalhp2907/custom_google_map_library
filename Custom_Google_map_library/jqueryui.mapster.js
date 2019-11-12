$(function (window, mapster) {
    // the widget definition, where "custom" is the namespace,
    // "colorize" the widget name
    $.widget("mapster.mapster", {
        // default options
        options: {},

        // The constructor
        _create: function () {
            var element = this.element[0],
                options = this.options;
            this.map = Mapster.create(element, options);
        },

        // Called when created, and later when changing options
        _refresh: function () {

            // Trigger a callback/event

        },

        addMarker: function (opts) {
            var self = this;
            if (opts.location) {
                this.map.geocode({
                    address: opts.location,
                    success: function (results) {
                        results.forEach(result => {
                            opts.lat = result.geometry.location.lat();
                            opts.lng = result.geometry.location.lng();
                            self.map.addMarker(opts);
                        });
                    },
                    error: function (status) {
                        console.error('Error status: ' + status);
                    }
                });
            } else {
                this.map.addMarker(opts);
            }
        },

        getAddress: function (opts, callback) {
            var self = this;
            this.map.getAddress({
                locations: opts,
                callback: callback
            });
        },

        findMarker: function (callback) {
            return this.map.findBy(callback);
        },

        removeMarker: function (callback) {
            this.map.removeBy(callback);
        },

        markers: function () {
            return this.map.markers.items;
        },

        getCurrentPosition: function (callback) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(callback);
            }
        },

        // A public method to change the color to a random value
        // can be called directly via .colorize( "random" )
        random: function (event) {
            // Trigger an event, check if it's canceled

        },

        autocomplete: function (opts, cb) {
            this.map.autocomplete(opts.element, opts.U_opts, opts.fields, cb);
        },

        // Events bound via _on are removed automatically
        // revert other modifications here
        _destroy: function () {
            // remove generated elements

        },

        // _setOptions is called with a hash of all options that are changing
        // always refresh when changing options
        _setOptions: function () {
            // _super and _superApply handle keeping the right this-context

        },

        // _setOption is called for each individual option that is changing
        _setOption: function (key, value) {

        }
    });
}(window, Mapster));
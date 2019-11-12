(function (window, google, List) {
    var Mapster = (function () {
        function Mapster(element, options) {
            this.gMap = new google.maps.Map(element, options);
            this.markers = List.create();
            if (options.clusterer) {
                this.markerCluster = new MarkerClusterer(
                    this.gMap,
                    [],
                    options.clusterer.options
                );
            }
            if (options.geocoder) {
                this.geocoder = new google.maps.Geocoder();
            }
        }
        Mapster.prototype = {
            zoom: function (level) {
                if (level) {
                    this.gMap.setZoom(level);
                } else {
                    return this.gMap.getZoom();
                }
            },
            _on: function (opts) {
                var self = this;
                google.maps.event.addListener(opts.obj, opts.event, function (e) {
                    opts.callback.call(self, e);
                });
            },
            autocomplete: function (element, opts, fields, cb) {
                var self = this;
                var autocomplete = new google.maps.places.Autocomplete(element, {
                    types: ['geocode']
                });
                autocomplete.setFields(fields);
                autocomplete.addListener('place_changed', function () {
                    var place = autocomplete.getPlace();
                    cb.call(self, place);
                });
            },
            geocode: function geocode(opts) {
                if (this.geocoder) {
                    this.geocoder.geocode({
                            address: opts.address
                        },
                        function (results, status) {
                            if (status === google.maps.GeocoderStatus.OK) {
                                console.log(results);
                                opts.success.call(this, results, status);
                            } else {
                                opts.error.call(this, status);
                            }
                        }
                    );
                } else {
                    return "Please enable geocoder option";
                }
            },
            getAddress: function (opts) {
                var self = this;
                if (this.geocoder) {
                    this.geocoder.geocode({
                            'location': opts.locations
                        },
                        function (results, status) {
                            if (status === 'OK') {
                                opts.callback.call(self, results, undefined);
                            } else {
                                opts.callback.call(self, undefined, status);
                            }
                        }
                    );
                } else {
                    return "Please enable geocoder option";
                }
            },
            addMarker: function (opts) {
                var marker;
                opts.position = {
                    lat: opts.lat,
                    lng: opts.lng
                };
                marker = this._createMarker(opts);
                if (this.markerCluster) {
                    this.markerCluster.addMarker(marker);
                }
                this.markers.add(marker);
                if (opts.events) {
                    opts.events.forEach(event => {
                        this._on({
                            obj: marker,
                            event: event.name,
                            callback: event.callback
                        });
                    });
                }
                if (opts.content) {
                    this._on({
                        obj: marker,
                        event: "click",
                        callback: function () {
                            var infoWindow = this._createInfoWindow({
                                content: opts.content
                            });
                            infoWindow.open(this.gMap, marker);
                        }
                    });
                }
                return marker;
            },

            removeBy: function (callback) {
                var self = this;
                this.markers.find(callback, function (markers) {
                    markers.forEach(element => {
                        console.log(this);
                        if (self.markerCluster) {
                            self.markerCluster.removeMarker(element);
                        } else {
                            element.setMap(null);
                        }
                    });
                });
            },
            findBy: function (callback) {
                return this.markers.find(callback);
            },
            _autocomplete: function (element, opts) {
                return new google.maps.places.Autocomplete(element, opts);
            },
            _createInfoWindow: function (opts) {
                return new google.maps.InfoWindow(opts);
            },
            _createMarker: function (opts) {
                opts.map = this.gMap;
                return new google.maps.Marker(opts);
            }
        };
        return Mapster;
    })();
    Mapster.create = function (element, opts) {
        return new Mapster(element, opts);
    };
    window.Mapster = Mapster;
})(window, google, List);
(function (window, google, MAP_STR) {
    MAP_STR.MAP_OPTIONS = {
        center: {
            lat: 20,
            lng: 0,
        },
        scrollwheel: false,
        zoom: 2,
        disabledDefaultUI: false,
        MapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControlOptions: {
            position: google.maps.MapTypeId.ROADMAP,
            style: google.maps.ZoomControlStyle.DEFAULT
        },
        clusterer: {
            options: {
                styles: [{
                    url: './static/images/favicon.png',
                    height: 32,
                    width: 32,
                    textColor: '#F00',
                    textSize: 20
                }]
            }
        },
        geocoder: true
    }
}(window, google, window.Mapster || (window.Mapster = {})));
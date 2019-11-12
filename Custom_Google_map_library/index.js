(function (window, $) {
    var $map = $("#map").mapster(window.Mapster.MAP_OPTIONS);
    var addressElement = document.querySelector("#address");
    var addressHelpElement = document.querySelector("#addressHelp");
    var placeSearch, autocomplete;
    var btn = document.getElementById('getLocation');

    $map.mapster(
        "autocomplete", {
            element: addressElement,
            U_opts: {
                types: ["geocode"]
            },
            fields: ["address_component"]
        },
        function (place) {
            console.log(place);
            if (place) {} else {
                console.log("Error");
            }
        }
    );

    btn.addEventListener('click', function () {
        $map.mapster('getCurrentPosition', function (pos) {
            var latlng = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            };
            $map.mapster('addMarker', latlng);
            $map.mapster('getAddress', latlng,
                function (result, error) {
                    if (error) {
                        console.log(error);
                        addressHelpElement.textContent = `There was some error ${error}`;
                    } else {
                        console.log(result);
                        addressElement.value = result.results[0].formatted_address;
                        addressHelpElement.textContent = `Your jam location has successfully saved`;
                    }
                }
            )
        });
    });


})(window, $);
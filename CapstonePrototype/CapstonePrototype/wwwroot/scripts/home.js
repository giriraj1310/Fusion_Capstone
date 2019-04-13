const googleMapsAPIKey = "AIzaSyC9uget_LULN6t79vYlXSxZxLguGMKHI4g";

let map;

var salesRepresentative = JSON.parse(sessionStorage.getItem("salesRepresentative"));
console.log(salesRepresentative);

var currentPosition = { lat: null, lng: null };
var savedBusinesses = salesRepresentative.savedBusinesses;
var nearbyBusinesses;

$(document).ready(function() {
    setActiveNavButton("home");
    setAjaxLoaderActive(true);

    if (!navigator.geolocation) {
        console.log("Geolocation not supported.");
        return;
    }

    navigator.geolocation.getCurrentPosition(function(pos) {
        currentPosition.lat = pos.coords.latitude;
        currentPosition.lng = pos.coords.longitude;

        initializeMap();
        //test();
    });
});

function initializeMap() {
    try {
        displayMap();
        markUserPosition();
        markSavedBusinesses();
        markNearbyBusinesses();
        enableCustomControls();
    }
    catch (err) {
        console.log(err);
    }
    finally {
        setAjaxLoaderActive(false);
    }

    function displayMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: currentPosition,
        });
    }

    function markUserPosition() {
        let userMarker = {
            url: appRoot + 'images/user-marker.png',
            size: new google.maps.Size(30, 30),
            scaledSize: new google.maps.Size(30, 30),
            anchor: new google.maps.Point(15, 15)
        };

        new google.maps.Marker({
            map: map,
            position: currentPosition,
            icon: userMarker,
            anchor: new google.maps.Point(0, 49)
        });
    }

    function enableCustomControls() {
        $("#custom-controls").addClass("active");
    }
}

function markSavedBusinesses() {
    savedBusinesses.forEach(function(business) {
        createBusinessMark(business);
    });
}

function markNearbyBusinesses() {
    if (nearbyBusinesses == null) {
        $.getJSON(appRoot + "data/businessLocations.json", function(data) {
            nearbyBusinesses = data;
            markNearbyBusinesses();
        });
    }
    else {
        nearbyBusinesses.forEach(function(business) {
            createBusinessMark(business);
        });
    }
}

function createBusinessMark(business) {
    let latLng = {
        lat: business.location.coordinates.latitude,
        lng: business.location.coordinates.longitude
    }

    let markerIconURL;
    let reportedMessage;

    if (business.isReported) {
        markerIconURL = appRoot + "images/business-marker-reported.png";
        reportedMessage = "<h4 class='theme-blue-fg''><i class='fas fa-check'></i>Business has been reported</h4>";
    }
    else {
        markerIconURL = appRoot + "images/business-marker-unreported.png";
        reportedMessage = "<h4 class='theme-orange-fg''><i class='fas fa-info'></i>Business has not been reported</h4>";
    }

    let icon = {
        url: markerIconURL,
        size: new google.maps.Size(27, 42),
        scaledSize: new google.maps.Size(27, 42)
    };

    let marker = new google.maps.Marker({
        map: map,
        position: latLng,
        icon: icon
    });

    let infoWidnow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, "click", function() {
        infoWidnow.setContent(getBusinessInfoWindowContent());
        infoWidnow.open(map, marker);
    });

    function getBusinessInfoWindowContent() {
        let saveFavoriteMessage;

        if (business.isSaved && !business.isFavorited) {
            saveFavoriteMessage = `<h4 class="theme-blue-fg"><i class="fas fa-save"></i>You have saved this business</h4>`
        }
        else if (business.isSaved && business.isFavorited) {
            saveFavoriteMessage = `<h4 class="theme-blue-fg"><i class="fas fa-star"></i>You have favorited this business</h4>`
        }

        let content = $("<div></div>").append(
            $("<div class='business-info-window'></div>").append(
                $("<h2></h2>").text(business.contact.name),
                $("<div></div>").text(business.location.streetAddress),
                $("<div></div>").text(business.location.city),
                $("<div></div>").text(business.location.region + " " + business.location.postalCode),
                $(reportedMessage),
                $(saveFavoriteMessage),
                $("<button class='theme-orange-bg theme-white-fg' onclick='viewBusiness(" + JSON.stringify(business).replace("'", "&#39;") + ")'>View more</button>")
            )
        );

        return $(content).html();
    }
}

function getLocationFromCoords(latLng) {
    new google.maps.Geocoder().geocode({ "location": latLng }, function(results, status) {
        if (status === 'OK') {
            let addressComponents = results[0].formatted_address.split(',');

            let location = {
                streetAddress: addressComponents[0],
                city: addressComponents[1],
                region: addressComponents[2]
            };

            console.log(location);
        }
        else {
            console.log('Geocoder failed due to: ' + status);
        }
    });
}

$("#btn-center-position").click(function() {
    map.panTo(currentPosition);
});

function viewBusiness(business) {
    let content = $("<div></div>").append(
        $("<div id='view-business-content'></div>").append(
            $("<div id='view-business-header' class='theme-blue-bg theme-white-fg'></div>").append(
                $("<h2></h2>").text(business.contact.name),
                $("<div></div>").text(business.location.streetAddress + ", " + business.location.city + ", " + business.location.region + ", " + business.location.postalCode)
            ),
            $("<div id='view-business-body'></div>").append(
                $("<ul></ul>").append(
                    $("<li></li>").html("<i class='fas fa-envelope theme-blue-fg'></i>" + business.contact.email),
                    $("<li></li>").html("<i class='fas fa-phone theme-blue-fg'></i>" + business.contact.phoneNumber),
                    $("<li></li>").html("<i class='fas fa-globe theme-blue-fg'></i>" + business.contact.website)
                ),
                createBusinessSaveButton()
            )
        )
    );

    createInnerScene("view-business-scene", content);

    function createBusinessSaveButton() {
        let classThemes;
        let buttonText;

        if (business.isSaved) {
            classThemes = "theme-blue-bg theme-white-fg";
            methodCall = "unsaveBusiness";
            buttonText = "Unsave Business";
        }
        else {
            classThemes = "theme-orange-bg theme-white-fg";
            methodCall = "saveBusiness";
            buttonText = "Save Business";
        }

        let button = $("<button></button>");
        $(button).attr("class", classThemes);
        $(button).text(buttonText);
        $(button).click(function() {
            onBusinessSaveButtonClick(button, JSON.stringify(business))
        });

        return button;
    }
}

function onBusinessSaveButtonClick(button, business) {
    if ($(button).text() == "Save Business") {
        $(button).attr("class", "theme-blue-bg theme-white-fg");
        $(button).text("Unsave Business");
        saveBusiness(business);
    }
    else {
        $(button).attr("class", "theme-orange-bg theme-white-fg");
        $(button).text("Save Business");
        unsaveBusiness(business);
    }
}

function saveBusiness(business) {

}

function unsaveBusiness(business) {

}

function test() {
    let request = {
        location: currentPosition,
        radius: '600',
        keyword: 'business'
    };

    let service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(results);

            results.forEach(function(e) {
                let business = {
                    contact: {
                        name: e.geometry.name,
                        email: "",
                        phoneNumber: "(905) 454-7426",
                        website: "mummasburritos.com",
                    },
                    location: {
                        streetAddress: "373 Steeles Ave W #1",
                        city: "Brampton",
                        region: "ON",
                        postalCode: "L6Y 0P8",
                        coordinates: {
                            "latitude": 43.657982,
                            "longitude": -79.741584
                        }
                    },
                    isSaved: false,
                    isFavorited: false,
                    isReported: false
                }
            });
        }
    });
}
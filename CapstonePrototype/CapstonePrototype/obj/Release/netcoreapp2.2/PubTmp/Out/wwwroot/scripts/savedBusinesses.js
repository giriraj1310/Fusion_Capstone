var salesRepresentative = JSON.parse(sessionStorage.getItem("salesRepresentative"));

$(document).ready(function() {
    setActiveNavButton("saved-businesses");
    loadSavedBusinesses();
});

function loadSavedBusinesses() {
    salesRepresentative.savedBusinesses.forEach(function(business) {
        let favoriteIcon = $("<i class='fas fa-star btn-favorite'></i>");
        let reportedIcon = $("<i class='fas fa-check'></i>");

        let savedBusiness = $("<li class='business'></li>").append(
            $("<div class='status-icons'></div>").append(
                $(favoriteIcon),
                $(reportedIcon)
            ),
            $("<div class='image-wrapper'></div>").append(
                $("<img src='" + appRoot + "images/placeholder.png' />")
            ),
            $("<div class='text-wrapper'></div>").append(
                $("<h2></h2>").text(business.contact.name),
                $("<span></span>").text(business.location.streetAddress + ", " + business.location.city)
            ),
            $("<div class='chevron-icon-wrapper'>").append(
                $("<i class='fas fa-chevron-right'></i>")
            )
        );

        configureIcons();

        $("#business-list").append(savedBusiness);

        function configureIcons() {
            if (business.isFavorited) {
                $(favoriteIcon).addClass("on");
            }
            $(favoriteIcon).click(function() {
                toggleFavorite(this, business);
            });

            if (business.isReported) {
                $(reportedIcon).addClass("on");
            }
        }
    });
}

function toggleFavorite(button, business) {
    $(button).toggleClass("on");
    salesRepresentative.savedBusinesses.find(b => b.id == business.id).isFavorited = $(button).hasClass("on");
    sessionStorage["salesRepresentative"] = JSON.stringify(salesRepresentative);
}
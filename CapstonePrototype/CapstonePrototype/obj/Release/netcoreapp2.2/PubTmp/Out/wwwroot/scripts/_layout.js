const appRoot = "../";

function setActiveNavButton(id) {
    let navButtons = $(".nav-button");
    let activeNavButton = $(".nav-button#" + id);

    for (var i = 0; i < navButtons.length; i++) {
        $(navButtons).removeClass("theme-orange-bg");
    }

    $(activeNavButton).addClass("theme-orange-bg");

    let sceneTitle = $(activeNavButton).attr("id").replace('-', ' ');
    $("#scene-title").text(sceneTitle);
}

function setAjaxLoaderActive(state) {
    let element = $("#ajax-loader-wrapper");

    if (state == true) {
        $(element).addClass("active");
    }
    else {
        $(element).removeClass("active");
    }
}

function createInnerScene(id, htmlContent) {
    let innerScene = $("<div id='" + id + "' class='inner-scene theme-white-bg'></div>").append(
        $("<button id='btn-close-inner-scene' class='theme-white-fg' onclick=destroyInnerScene('" + id + "')>&times;</button>"),
        $(htmlContent)
    );

    $("#inner-scenes-wrapper").append(innerScene);
}

function destroyInnerScene(id) {
    $(".inner-scene#" + id).addClass("destroying");
    setTimeout(function() {
        $(".inner-scene#" + id).remove();
    }, 300);
}
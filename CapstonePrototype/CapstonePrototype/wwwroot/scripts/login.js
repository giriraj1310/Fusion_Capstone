$("form").submit(async function(e) {
    e.preventDefault();
    clearError();
    setAjaxLoaderActive(true);

    let credentials = {
        email: $("#txt-email").val(),
        password: $("#txt-password").val()
    }

    let response = await tryLogin(credentials);
    setAjaxLoaderActive(false);

    if (response == null) {
        showError("Invalid login credentials", "ban");
    }
    else if (response == "timeout" || response.id == null) {
        showError("Error connecting to server", "plug");
    }
    else {
        sessionStorage.setItem("salesRepresentative", JSON.stringify(response));

        $(this.submit(function() {
            return true;
        }));
    }
});

function showError(message, fasIcon) {
    $("#error-wrapper i").attr("class", "fas fa-" + fasIcon);
    $("#error-wrapper span").text(message);
    $("body").addClass("error");
}

function clearError() {
    $("#error-wrapper i").attr("class", null);
    $("#error-wrapper span").text(null);
    $("body").removeClass("error");
}
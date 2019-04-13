const appApiUrl = "https://localhost:44364/api/salesRepresentatives";

async function tryLogin(credentials) {
    let result;

    try {
        await $.ajax({
            type: "POST",
            url: appApiUrl + "/login",
            data: JSON.stringify(credentials),
            contentType: "application/json",
            dataType: "json",
            timeout: 10000,
            success: function(response) {
                result = response;
            }
        });
    }
    catch (error) {
        result = error.statusText;
    }

    return result;
}

async function tryGetData() {
    let result;

    try {
        await $.ajax({
            type: "GET",
            url: appApiUrl,
            contentType: "application/json",
            dataType: "json",
            success: function(response) {
                console.log(response);
            }
        });
    }
    catch (e) {
        result = e;
    }
    finally {
        return result;
    }
}
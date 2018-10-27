var holidays = ["Halloween", "April fools days", "Graduation"];


function displayHolidayGifs() {

    var holiday = $(this).attr("data-holiday");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + holiday + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        var result = response.data;

        for (var i = 0; i < result.length; i++) {

            var holidayDiv = $("<div>");
            var holidayImage = $("<img>")
                .addClass("gif")
                .attr({
                    "src": result[i].images.fixed_height.url,
                    "data-state": "animate",
                    "data-still": result[i].images.fixed_height_still.url,
                    "data-animate": result[i].images.fixed_height.url
                })
            holidayDiv.append("<h3>" + result[i].title + "</h3>");
            holidayDiv.append("<h4> RATING: " + result[i].rating + "</h4>");
            holidayDiv.append(holidayImage);

            $("#holiday-here").prepend(holidayDiv);

            // $("#holiday-here").text(JSON.stringify(response));

            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");

                if (state === "animate") {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                } else {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                }
            })

        }

    });
}



function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < holidays.length; i++) {
        var a = $("<button>");
        a.addClass("holiday");
        a.attr("data-holiday", holidays[i]);
        a.text(holidays[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-holiday").on("click", function (event) {
    event.preventDefault();

    var holiday = $("#holiday-input").val().trim();
    holidays.push(holiday);
    renderButtons();
});

$(renderButtons).on("click", ".holiday", displayHolidayGifs);

renderButtons();








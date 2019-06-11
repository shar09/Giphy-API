$(document).ready(function(){   
    var gifs = ["Scarface", "Friends", "Peaky Blinders", "Breaking Bad", "The Big Bang Theory", "James Bond", "Pirates of the Caribbean", "Pulp Fiction", "Mean Girls"];
        
    function displayGif() {
        var movies = $(this).attr("data-name");
        var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + movies + "&api_key=ZWI6e17j8ZXUhySGbmEXjzTm8stNWI7l&limit=10";
        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then(function(response) {
                console.log("success got data", response.data);
                $("#gif-view").empty();
                var gifImg = $("<div></div>").addClass("gif-img");
                var img;
                var rating;
                var p;
                for(var i=0; i<response.data.length; i++) {   
                    rating = response.data[i].rating;
                    p = $("<p>").text("Rating:" +rating);
                    img = $("<img>").attr("src", response.data[i].images.downsized_still.url);
                    img.addClass("gif");
                    img.attr("data-still", response.data[i].images.downsized_still.url);
                    img.attr("data-animate", response.data[i].images.downsized.url);
                    img.attr("data-state", "still");
                    gifImg.append(p);
                    gifImg.append(img);
                    $("#gif-view").append(gifImg);

                }
            });
    }
        
    function renderButtons() {
        $("#button-view").empty();

        for(var i=0; i<gifs.length; i++) {
            var render = $("<button>");
            render.addClass("movies");
            render.attr("data-name", gifs[i]);
            render.text(gifs[i]);
            $("#button-view").append(render).append(" ");
        }
    }

    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        var movies = $("#gif-input").val().trim();
        console.log(movies);
        gifs.push(movies);
        renderButtons();
    });

    $(document).on("click", ".movies", displayGif);
    renderButtons();

    $(document).on("click", ".gif", function(event) {
        event.displayGif; 
        var state = $(this).attr("data-state");
        if(state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});      
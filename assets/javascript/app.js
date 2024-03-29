$(document).ready(function() {   
    var gifs = ["Scarface", "Friends", "Peaky Blinders", "Breaking Bad", "The Big Bang Theory", "James Bond", "Pirates of the Caribbean", "Pulp Fiction", "Mean Girls"];
    
    //function to display gifs based on the url
    function displayGif() {
        var movies = $(this).attr("data-name");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + movies + "&api_key=ZWI6e17j8ZXUhySGbmEXjzTm8stNWI7l&limit=10";
        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then(function(response) {
                console.log("success got data", response.data);
                $("#gif-view").empty();
                var gifImg = $("<div></div>").addClass("gif-img");
                var seperate;
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
                    seperate = $("<div></div>").addClass("single-gif"); 
                    seperate.append(p);
                    seperate.append(img);
                    gifImg.append(seperate);
                    $("#gif-view").append(gifImg);
                }
            });
    }
    
    //function to create buttons for search terms
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
    
    //creates buttons for new searches
    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        var movies = $("#gif-input").val().trim();
        console.log(movies);
        gifs.push(movies);
        renderButtons();
    });
    
    //displayGif function is called based on which gif is clicked
    $(document).on("click", ".movies", displayGif);
    
    //function call to create buttons for values in the array
    renderButtons();

    //state of the gif is changed based on clicks
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
   //Clear button clears the page
   $("#clear").empty();
   
       // Initial Giphy array
       var giphys = ["SNL", "Bill Maher", "Martin Lawrence","Stephen Colbert", "Seth Meyers", "Singing","Jimmy Kimmel","Funny or Die", "Trending GIFs","Dancing","Best Gifs"];
   
   
       // displayGiphyInfo function re-renders the HTML to display the appropriate content
       function displayGiphyInfo() {
   
           var giphy = $(this).attr("data-name");
           var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC&limit=10";
   
           // Creating an AJAX call for the specific giphy button being clicked
           $.ajax({
             url: queryURL,
             method: "GET"
           }).done(function(response) {
               //storing an array of results in the results variable
               var results = response.data;
   
               for (var i = 0; i < results.length; i++) {
   
                   // Creating a div to hold the giphy
                   var giphyDiv = $("<div class='newgif'>"); 
                   
                   console.log(response.data[i]);
   
                   // Storing the rating data
                   var rating = results[i].rating;
   
                   // Creating an element to have the rating displayed
                   var giphyrating = $("<p>").text("Rating: " + rating);
   
                   // Displaying the rating
                   giphyDiv.append(giphyrating);
   
                  // Retrieving the URL for the image
                   var imgURL = response.data[i].images.fixed_height_still.url;
   
                   // Creating an element to hold the image
                   var image = $("<img>").attr("src", imgURL);
                   image.addClass("gifclass");
                   image.attr("data-state", "still");
                   image.attr("data-animate", results[i].images.fixed_height.url);
                   image.attr("data-still", results[i].images.fixed_height_still.url);
   
                   // Appending the image
                   giphyDiv.append(image);
   
                   // Putting the entire result gif above the previous gifs
                   $("#giphy-view").prepend(giphyDiv);
   
   
                   
         $(".gifclass").on("click", function() {
         // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
         var state = $(this).attr("data-state");
         // If the clicked image's state is still, update its src attribute to what its data-animate value is.
         // Then, set the image's data-state to animate
         // Else set src to the data-still value
         if (state === "still") {
           $(this).attr("src", $(this).attr("data-animate"));
           $(this).attr("data-state", "animate");
         } else {
           $(this).attr("src", $(this).attr("data-still"));
           $(this).attr("data-state", "still");
           
         }
       });
               }
           });
   
         }
   
         // Function for displaying movie data
         function newGiphyButton() {
   
           // Deleting the movies prior to adding new movies
           // (this is necessary otherwise you will have repeat buttons)
           $("#buttons-view").empty();
   
           // Looping through the array of movies
           for (var i = 0; i < giphys.length; i++) {
   
             // Then dynamicaly generating buttons for each movie in the array
             // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
             var giphybutton = $("<button>");
             // Adding a class of btn-success to our button
             giphybutton.addClass("btn-success");
             // Adding a data-attribute
             giphybutton.attr("data-name", giphys[i]);
             // Providing the initial button text
             giphybutton.text(giphys[i]);
             // Adding the button to the buttons-view div
             $("#buttons-view").append(giphybutton);
           }
         }
   
   
       // This function handles events where a giphy button is clicked
       $("#add-giphy").on("click", function(event) {
           event.preventDefault();
           // This line grabs the input from the textbox
           var giphy = $("#giphy-input").val().trim();
   
           // Adding movie from the textbox to our array
           giphys.push(giphy);
           console.log(giphys);
   
           // Calling renderButtons which handles the processing of our giphy array
           newGiphyButton();
         });
   
         // Adding a click event listener to all elements with a class of "giphy"
           $(document).on("click", ".btn-success", displayGiphyInfo);
   
         // Calling the renderButtons function to display the intial buttons
           newGiphyButton();
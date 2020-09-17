var gameStarted = false;

var buttonColours = ["red", "blue", "green", "yellow"]
var randomChosenColour = ""
var gamePattern = []
var userClickedPattern = []

// start game
$(document).on("keydown", function(event) {
  if (event.key == 'a' && gameStarted == false){
    gameStarted = true;
    nextSequence();

    // add button click handlers
    for (var i=0; i < buttonColours.length; i++) {
        $("#" + buttonColours[i]).on("click", function(event){
          var userChosenColour = event.target.id;
          userClickedPattern.push(userChosenColour);
          playSound(userChosenColour);
          animatePress(userChosenColour);
        });
    }
  }
});

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function nextSequence() {
  // generate random number and store in global variables
  var randomNumber = getRandomArbitrary(0, 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // flash the button
  $('#' + randomChosenColour).animate({opacity: 0}).animate({opacity: 1});
  playSound(randomChosenColour);

}

function playSound(name) {
  var promise = $("#" + name + "-audio")[0].play();
  if (promise) {
    promise.catch(function(error) {console.error(error);});
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
  
}

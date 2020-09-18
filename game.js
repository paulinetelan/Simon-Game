var gameStarted = false;
var gameRestarted = false;

var buttonColours = ["red", "blue", "green", "yellow"]
var randomChosenColour = ""
var gamePattern = []
var userClickedPattern = []
var level = 0;

// start game
$(document).on("keydown", function(event) {

  if (event.key == 'a' && gameStarted == false) {
    gameStarted = true;
    $("#level-title").text("Level 0");
    nextSequence();

    // add button click handlers
    for (var i = 0; i < buttonColours.length; i++) {
      $("#" + buttonColours[i]).on("click", function(event) {
        var userChosenColour = event.target.id;
        userClickedPattern.push(userChosenColour);
        console.log("gamePattern: " + gamePattern);
        console.log("userPattern: " + userClickedPattern);
        animatePress(userChosenColour);
        var correct = checkAnswer(userClickedPattern.length-1);
        if (correct == true) {
          playSound(userChosenColour);

          // if user finished the level
          if (userClickedPattern.length == gamePattern.length){
            setTimeout(function() {
              nextSequence();
            }, 1000);
            userClickedPattern = [];
          }
        }else {
          // game over
          playSound("wrong");
          $("#level-title").text("GAME OVER");
          $(".game-over").fadeIn();
          setTimeout ( function () {
            // reload page to restart after 2s
            window.location.reload();
          }, 2000);
        }
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
  // increase level
  level++;
  $("#level-title").text("Level " + level);

  // generate random number and store in global variables
  var randomNumber = getRandomArbitrary(0, 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // flash the button
  playSound(randomChosenColour);
  $('#' + randomChosenColour).animate({
    opacity: 0
  }).animate({
    opacity: 1
  });

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function playSound(name) {
  var promise = $("#" + name + "-audio")[0].play();
  if (promise) {
    promise.catch(function(error) {
      console.error(error);
    });
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    return true;
  }else {
    return false;
  }
}

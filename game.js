var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
    if(!started)
    {
        
        $("#level-title").text("level "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
var useChosenColour= $(this).attr("id");
userClickedPattern.push(useChosenColour);
playSound(useChosenColour);
animatePress(useChosenColour);
checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  
            if (userClickedPattern.length === gamePattern.length){

          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play(); 
        $("body").addClass("game-over");
        $("#level-title").text("Game Over...Press any key to restart");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);

        startOver();

      } 
  }
  
function nextSequence(){
    
    userClickedPattern = [];
    level++;
    console.log(userClickedPattern);
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(sound){
    var ply = new Audio("sounds/"+sound+".mp3");
    ply.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    },100)
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    }




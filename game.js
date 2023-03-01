var buttonColors=["red", "blue", "green", "yellow"];
var gamepattern=[];
var userClickedPattern = [];
var started = false;
var level=0;
$(document).keydown(function(){
    if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentlevel){
    if(userClickedPattern[currentlevel]===gamepattern[currentlevel])
    {
        console.log("sucess");
        if(userClickedPattern.length===gamepattern.length)
        {
            setTimeout(function(){
                nextSequence()
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200); 
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
}
}
function nextSequence()
{
    userClickedPattern=[];
    level++;
    var randomNumber=Math.floor(Math.random()*4);
    var randomColor=buttonColors[randomNumber];
    gamepattern.push(randomColor);
    $("#"+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}
function playSound(name)
{
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100); 
}

function startOver()
{
    level=0;
    gamepattern=[];
    started=false;
}


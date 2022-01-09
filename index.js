/*
$("h1").css("color", "red"); //document.queryselector("css tag").setattribute("", "") or document.queryselectorall
$("h1").css("font-size");//getting properties
$("h1").addClass("yellow");//addclass
$("button").text("dont click me");//will change all buttons //.text method has alternative .html that also apply html to text
$("a").attr("href", "https://yahoo.com");//changes attrinbute

$("h1").click(function() {
    $("h1").css("color", "green");
});//subtitute for event listner

$("button").click(function() {
    $("h1").css("color", "green");
});//to set on all buttons


//$("body").keydown(function () {$("h1").text(event.key)});//better way next line
$("h1").on("click", function (){$("h1").text("clicked");});

//animate (only for properties with numeric value)
$("h1").animate({margin: "200px"});
 */
//simon game

var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var started = false;


$("body").on("keypress", function (){
    if(!started){
        $("h1").text("Level: "+level);
        nextSequence();
        started = true;
    }
})
$("body").on("click", function (){
    if(!started){
        $("h1").text("Level: "+level);
        nextSequence();
        started = true;
    }
})

function checkAnswer() {
    for(var i=0;i<userClickedPattern.length;i++){
        if(userClickedPattern[i]!=gamePattern[i]){
            userClickedPattern = [];
            gamePattern = [];
            level = 0;
            $("h1").text("Press A Key to Start")
            var sound = new Audio("sounds/wrong.mp3");
            sound.play();
            $("body").css("background-color", "red");
            setTimeout(function (){$("body").css("background-color", "#011F3F");}, 100);
            started = false;
        }
        else{
            if(userClickedPattern.length===gamePattern.length){
                userClickedPattern = [];
                setTimeout(function (){nextSequence();}, 1000);

            }
        }
    }
}


function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
      $("#"+currentColour).removeClass("pressed");
   }, 100);
}


function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    $("#"+name).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    audio.play();
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level: "+level);
}

$(".btn").click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
});


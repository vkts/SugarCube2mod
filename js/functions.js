var timeStamp = 0;

function scrollEffects(e){   
    // Set scroll icon visible if user is scrolling upwards (unless on title page or window already at top)
    if(e.deltaY < 0 
        && currPassage.tag != TITLE_PASSAGE_TAG 
        && $(window).scrollTop() != 0)
        $("#scrollIcon").css("visibility","visible");
    // Throttle content reveal animation
    if(((new Date).getTime() - timeStamp) > 1000){
            // Check if scrolling down and at the bottom of the page
            if(e.deltaY > 0 && $(window).scrollTop() == $(document).height()-$(window).height()){
                sequentialContentReveal();
            };
        timeStamp = (new Date).getTime();
    }
};

// Determine all hidden paragraphs within the passage and make the next one visible
function sequentialContentReveal(){
    
    var visibilityTrigger = true;
    var countVisibleElements = 0;
    $("#passages>.passage").children().each(
        function (){
            // Find first hidden paragraph and check whether code has already been executed before
            if($(this).css("opacity") == "0" && visibilityTrigger == true){ 
                $("#scrollIcon").css("visibility","visible");
                $(this).css("max-height",$(this).css("height"));
                $(this).css("width","0px");
                $(this).animate({"width":"864px","opacity":"1"},750,"linear");
                visibilityTrigger = false;
                if($("#passages>.passage").children().length-1 == countVisibleElements)
                    countVisibleElements++;
            }else{
                countVisibleElements++;
            }
            if($("#passages>.passage").children().length == countVisibleElements && $(window).scrollTop() == $(document).height()-$(window).height())
                $("#scrollIcon").css("visibility","hidden");
        }
    );
};

function centerThoughtBoxes(){
    // Vertically center all thoughtboxes relative to their hasInnerThought <p> tag parent
    $('.hasInnerThought').each(function(index){
        var paddingHeight = Math.round((this.clientHeight-28)/2);
        $(this).children().first().css({"padding": (paddingHeight+2) + "px 0px " + (paddingHeight-2) + "px 0px"});
    });
};
(function(){
    jQuery(document)
    .one(':passagedisplay', function(){ // One time layout changes

        // Add scroll event listener to window object
        window.addEventListener('wheel', scrollEffects);
        // Add containers for previous and temporary(in case of backwards navigation) passages as well as scroll icon 
        $("#story").prepend("<div id='precedingPassages'></div>");
        $("#story").append("<div id='temporaryPassage'></div>");
        $('#story').append("<div class='scrollIcon'><div class='chevron'></div><div class='chevron'></div><div class='chevron'></div></div>");
    
    }).on(':passagedisplay', function(){ // Reccurring layout changes

        // Vertically center all thoughtboxes relative to their hasInnerThought <p> tag parent
        centerThoughtBoxes();

        // Always make chapter titles visible
        $("#passages>.passage").children().each(function (){
            if($(this).is("h2"))$(this).css("opacity","1");
        });
        // Always make first paragraph visible
        $("#passages>.passage").children("p").first().css("opacity","1");       

    });
})();
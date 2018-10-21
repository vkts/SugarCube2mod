const TITLE_PASSAGE_TAG = 90000;
var prevPassage = new PassageDat("00000");
var currPassage;

var currentPassageHTML;
var passageCache;
var chapterCache = [];
$(document).on(':passagerender', function (ev) {
    // Get currPassage.tag
    currPassage = new PassageDat(Story.get(passage()).tags[0]);

    // Logic for adding/removing precedingPassages depending on history navigation
    if(prevPassage.section < currPassage.section && currPassage.chapter == prevPassage.chapter){
    // Moving forward through chapters
        $("#precedingPassages").append(currentPassageHTML);
        $("#temporaryPassage .passage").first().remove();
    }else if(prevPassage.section > currPassage.section && currPassage.chapter == prevPassage.chapter){
    // Moving backward through chapters
        $("#precedingPassages>div").last().remove();
        // Prepend passage when navigating backwards (exception for titlescreen passage) 
        if(currPassage.tag != TITLE_PASSAGE_TAG)
            $("#temporaryPassage").prepend(currentPassageHTML); 
    } 
    // Remove preceding passages on chapter advance
    if(currPassage.chapter > prevPassage.chapter){
        $("#precedingPassages>div").remove();
        chapterCache.push(passageCache);
    }
    // Repopulate preceding passages when navigating back to previous chapter 
    if(currPassage.chapter < prevPassage.chapter){
        $("#precedingPassages").append(chapterCache.pop());
    }
});

$(document).on(':passagedisplay', function(){  

    // Show scroll icon
    if(currPassage.tag != TITLE_PASSAGE_TAG){
        $(".scrollIcon").css("visibility","visible");        
    }
    // Hide UIBar when creating a new game state (navigating forward without the use of history)
    if (State.length === State.size && passage() != "Start") {
        UIBar.stow();
    }else{
        // Keep entire previous passage visible when navigating back through the history
        $("#passages>.passage>:nth-child(n)").css("opacity","1");
    }

    // Check if user refreshed the page and old-passages are therefore missing + restore old-passages  
    if(prevPassage.section == 0){
        if (window.sessionStorage.getItem("passageCache") != null) 
            $("#precedingPassages").get(0).innerHTML = window.sessionStorage.getItem("passageCache");
        if (window.sessionStorage.getItem("chapterCache") != null)
            chapterCache = JSON.parse(window.sessionStorage.getItem("chapterCache"));
        $(".scrollIcon").css("visibility","visible");
        console.log("refreshed!");
    }
    
    // Chapter transitions
    if(prevPassage.section >= currPassage.section && currPassage.chapter <= prevPassage.chapter){
        //window.scrollTo(0, $(document).height());
        if(currPassage.tag == TITLE_PASSAGE_TAG)
            $(".passage").animate({"opacity":"1"},{duration:600});
        $(".passage").css({"opacity":"1"});
        $("#temporaryPassage .passage").animate({opacity:"0"},200).delay(10).slideUp(1000);
    }else{
        $(".passage").animate({"opacity":"1"},{duration:600});
    }
    // Scroll to the bottom of the page
    if(currPassage.section != 1)
    setTimeout(function(){$("html, body").animate({ scrollTop: $(document).height()-$(window).height()}, 600)},200);

    prevPassage = new PassageDat(Story.get(passage()).tags[0]);

    currentPassageHTML = $("#passages").get(0).children[0];

    if(prevPassage.tag.charAt(0) == "9"){
        currentPassageHTML = "";
    }
    // Back up preceding passages and chapter data in case of page refresh
    passageCache = $("#precedingPassages").get(0).innerHTML;
    window.sessionStorage.setItem("passageCache", passageCache);
    window.sessionStorage.setItem("chapterCache", JSON.stringify(chapterCache));



});

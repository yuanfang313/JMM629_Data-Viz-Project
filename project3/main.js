


$("#winnerPortrait img")
    .each(function(i){
            $("#sound")
              .clone()
              .attr("id", "sound" + i)
              .appendTo($(this).parent());
        
        $(this).data("musicbox", i);
    })
    .mouseenter(function() {
        $("#sound" + $(this).data("musicbox"))[0].play();
      });


    //$("#sound").attr("id", "sound0");
 


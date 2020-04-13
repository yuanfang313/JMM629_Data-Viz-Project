d3.csv("simpleData.csv").then(function(dataset){

    console.log(dataset)
    let container = d3.select("#container");

    let pictures = container.selectAll("img")
        .data(dataset)
        .enter()
        .append("img")
        .attr("id", "imgWithSound")
        .attr("src", (d) => "img/" + d.img + ".png")

});

var audio = $("#sound")[0];
$("#container")
    .mouseenter(function(){
    audio.play();  
});



d3.csv("data.csv").then(function(dataset){

console.log(dataset)
let portraitsContainer = d3.select('#portraitsContainer');
    
let nest = d3.nest()
    .key(function(d){
  return d.name;
})
    .entries(dataset);

console.log(nest)

let section = portraitsContainer
    .append("ul")
    .attr("id", "section");

let architect = section.selectAll('li')
    .data(nest)
    .enter()
    .append('li')
    .attr("id", "architect");

console.log(architect)

let pictures = architect.selectAll('img')
    .data(function(d){
    return d.values;
})
    .enter()
    .append('img')
    .attr("src", (d) => "img/" + d.img + ".png");

console.log(pictures)


// add sound to each img
$("#section img")
    .each(function(i){
            $("#sound")
              .clone()
              .attr("id", "sound" + i)
              .appendTo($(this).parent());
        
        $(this).data("piano_Ab4", i);
    })
    .mouseenter(function() {
        $("#sound" + $(this).data("piano_Ab4"))[0].play();
      });

 // add options to genderSelectBox     
var allGender = ["male", "female"]

let genderSelectBox = d3.select('#genderSelect')
    .selectAll('option')
    .data(allGender)
    .enter()
    .append('option')
    .text(function(d){return d})
    .attr("value", function(d){return d});
});








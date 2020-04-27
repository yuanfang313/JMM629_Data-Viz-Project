d3.csv("data.csv").then(function(dataset){

console.log(dataset)
let portraitsContainer = d3.select('#portraitsContainer');
    
let nest = d3.nest()
    .key(function(d){
  return d.name;
})
    .entries(dataset);


let section = portraitsContainer
    .append("ul")
    .attr("id", "section");

let architect = section.selectAll('li')
    .data(nest)
    .enter()
    .append('li')
    .attr("id", "architect");

let pictures = architect.selectAll('img')
    .data(function(d){
    return d.values;
})
    .enter()
    .append('img')
    .attr("class", "photo")
    .attr("src", (d) => "img/photo/" + d.img + ".png")
    .on("mouseenter", ShowTooltip)
    .on("mouseout", DismissTooltip);


    const index = d => d.index;
    function ShowTooltip(d){
        d3.select("#tooltip" + index(d)).style("opacity", 0.9);
    }
    function DismissTooltip(d){
        d3.select("#tooltip" + index(d)).style("opacity", 0);
    }

// toggle genderBtn
    $("#genderBtn")
    .on("click", onClickGenderBtn);
    
    function onClickGenderBtn(){
        pictures
        .attr("class", "otherProperty gender")
        .attr("src", (d) => "img/gender/" + d.gender + ".png");
    }
// toggle nationBtn

    $("#nationBtn")
    .on("click", onClickNationBtn);

    function onClickNationBtn(){
        pictures
        .attr("class", "otherProperty nation")
        .attr("src", (d) => "img/nation/" + d.nation + ".png");
    }
    $("#glassBtn")
    .on("click", onClickGlassBtn);

    function onClickGlassBtn(){
        pictures
        .attr("class", "otherProperty glass")
        .attr("src", (d) => "img/glass/" + d.glass + ".png");
    }
// toggle resetBtn
    $("#resetBtn")
    .on("click", onClickRestBtn);

    function onClickRestBtn(){
        pictures
        .attr("class", "photo")
        .attr("src", (d) => "img/photo/" + d.img + ".png");
    }

console.log(nest)
// add a group to each architect
let tooltip = architect
    .append('g')
    .attr("id", "tooltip")
    .attr("class", "tooltip")
    .style("opacity", 0);

    $("#section img")
    .each(function(i){
    $("#tooltip")
    .attr("id", "tooltip" + i)
    .appendTo($(this).parent());
    });

    

// add name to tooltip
let tooltipName = tooltip
    .append('div')
    .attr("class", "tooltipName");

let name = tooltipName.selectAll('span')
    .data(function(d){
        return d.values;
    })
    .enter()
    .append('span')
    .attr("id", "name")
    .text((d) => d.name)
// add year to tooltip
let tooltipYear = tooltip
    .append('div')
    .attr("class", "tooltipYear")

let year = tooltipYear.selectAll('span')
    .data(function(d){
        return d.values;
    })
    .enter()
    .append('span')
    .attr("id", "year")
    .text((d) => d.year + "  Laureate");
    
console.log(pictures)

});








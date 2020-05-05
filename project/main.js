d3.csv("data.csv").then(function(dataset){

console.log(dataset)
let portraitsContainer = d3.select('#portraitsContainer');
    
let nest = d3.nest()
    .key(function(d){
  return d.name;
})
    .entries(dataset);

let section = portraitsContainer
    .append("div")
    .attr("id", "section");

let architect = section.selectAll('div')
    .data(nest)
    .enter()
    .append('div')
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
var architectRemoved = false;
var architectHadRemovedOnce = false;
var firstBtnPressedAfterArchitectRemoved = true;
var AgeImg;
var Architect;
var Pictures;
var PicturesContainer;
// toggle genderBtn
    $("#genderBtn")
    .on("click", onClickGenderBtn);
    
    function onClickGenderBtn(){
        if(!architectRemoved){
            if(!firstBtnPressedAfterArchitectRemoved){
                PicturesContainer
                .attr("class", "otherProperty gender")
                .attr("src", (d) => "img/gender/" + d.gender + ".png");
            } else {
                pictures
                .attr("class", "otherProperty gender")
                .attr("src", (d) => "img/gender/" + d.gender + ".png");
            }
        } else if (architectRemoved && firstBtnPressedAfterArchitectRemoved){
            $("#ageImg")
            .remove();
            appendBackArchitects();
            Pictures
            .attr("class", "otherProperty gender")
            .attr("src", (d) => "img/gender/" + d.gender + ".png");
            PicturesContainer = Pictures;
            firstBtnPressedAfterArchitectRemoved = false;
            architectRemoved = false;  
        }
        
    }

// toggle nationBtn
    $("#nationBtn")
    .on("click", onClickNationBtn);

    function onClickNationBtn(){
        if(!architectRemoved){
            if(!firstBtnPressedAfterArchitectRemoved){
                PicturesContainer
                .attr("class", "otherProperty nation")
                .attr("src", (d) => "img/nation/" + d.nation + ".png");
            } else {
                pictures
                .attr("class", "otherProperty nation")
                .attr("src", (d) => "img/nation/" + d.nation + ".png");
            }
        } else if (architectRemoved && firstBtnPressedAfterArchitectRemoved){
            $("#ageImg")
            .remove();
            appendBackArchitects();
            Pictures
            .attr("class", "otherProperty nation")
            .attr("src", (d) => "img/nation/" + d.nation + ".png");
            PicturesContainer = Pictures;
            firstBtnPressedAfterArchitectRemoved = false;
            architectRemoved = false;
        } 
    }
// toggle glassBtn
    $("#glassBtn")
    .on("click", onClickGlassBtn);

    function onClickGlassBtn(){
        if(!architectRemoved){
            if(!firstBtnPressedAfterArchitectRemoved){
                PicturesContainer
                .attr("class", "otherProperty glass")
                .attr("src", (d) => "img/glass/" + d.glass + ".png");
            } else {
                pictures
                .attr("class", "otherProperty glass")
                .attr("src", (d) => "img/glass/" + d.glass + ".png");
            }
        } else if (architectRemoved && firstBtnPressedAfterArchitectRemoved){
            $("#ageImg")
            .remove();
            appendBackArchitects();
            Pictures
            .attr("class", "otherProperty glass")
            .attr("src", (d) => "img/glass/" + d.glass + ".png");
            PicturesContainer = Pictures;
            firstBtnPressedAfterArchitectRemoved = false;
            architectRemoved = false;
        } 
    }
// toggle ageBtn
    $("#ageBtn")
    .on("click", onClickAgeBtn);

 function onClickAgeBtn(){
    if(!architectRemoved){
        architect
        .remove();

        section
        .append("div")
        .attr("id", "ageImg")
        .attr("class", "divOfAgeImg")
        .append("img")
        .attr("class", "age")
        .attr("src", "img/age.svg");
    architectRemoved = true;
    architectHadRemovedOnce = true;
    }

    if(architectHadRemovedOnce){
        Architect
        .remove();
    }
    firstBtnPressedAfterArchitectRemoved = true;
}

// toggle resetBtn
    $("#resetBtn")
    .on("click", onClickRestBtn);

    function onClickRestBtn(){
        if(!architectRemoved){
            if(!firstBtnPressedAfterArchitectRemoved){
                PicturesContainer
                .attr("class", "photo")
                .attr("src", (d) => "img/photo/" + d.img + ".png");
            } else {
                pictures
                .attr("class", "photo")
                .attr("src", (d) => "img/photo/" + d.img + ".png");
            }
        } else if (architectRemoved && firstBtnPressedAfterArchitectRemoved){
            $("#ageImg")
            .remove();
            appendBackArchitects();
            Pictures
            .attr("class", "photo")
            .attr("src", (d) => "img/photo/" + d.img + ".png");
            PicturesContainer = Pictures;
            firstBtnPressedAfterArchitectRemoved = false;
            architectRemoved = false;
        } 
    }
function appendBackArchitects(){

let architect = section.selectAll('g')
    .data(nest)
    .enter()
    .append('g')
    .attr("id", "architect");

Architect = architect;

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
    Pictures = pictures;
    ///////Building tooltip//////
// add a tooltip to each architect
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
// construct the container
let tooltipName = tooltip
.append('div')
.attr("class", "tooltipName");
// add the value
let name = tooltipName.selectAll('span')
.data(function(d){
    return d.values;
})
.enter()
.append('span')
.attr("id", "name")
.text((d) => d.name)

// add year to tooltip
// construct the container
let tooltipYear = tooltip
.append('div')
.attr("class", "tooltipYear")
// add the value
let year = tooltipYear.selectAll('span')
.data(function(d){
    return d.values;
})
.enter()
.append('span')
.attr("id", "year")
.text((d) => d.year + "  Laureate");
}
///////Building tooltip//////
// add a tooltip to each architect
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
// construct the container
let tooltipName = tooltip
    .append('div')
    .attr("class", "tooltipName");
// add the value
let name = tooltipName.selectAll('span')
    .data(function(d){
        return d.values;
    })
    .enter()
    .append('span')
    .attr("id", "name")
    .text((d) => d.name)

// add year to tooltip
// construct the container
let tooltipYear = tooltip
    .append('div')
    .attr("class", "tooltipYear")
// add the value
let year = tooltipYear.selectAll('span')
    .data(function(d){
        return d.values;
    })
    .enter()
    .append('span')
    .attr("id", "year")
    .text((d) => d.year + "  Laureate");
    
});








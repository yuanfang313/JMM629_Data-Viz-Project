
let dimensions = {
    width: window.innerWidth * 0.9,// whatever screen
    height: 600,
    margin: {
        top: 20,
        right: 20,
        bottom: 50,
        left: 80,
    },
};

dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

var svg = d3.select("figure#chart")
    .append("svg")
    //.attr("width", dimensions.width)
    //.attr("height", dimensions.height);
    .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
    .append("g")
    .attr("transform", `translate(${dimensions.margin.left},${dimensions.margin.top})`);

var xScale = d3.scaleLinear()
    .range([0, dimensions.boundedWidth]);

var yScale = d3.scaleBand()
    .range([0, dimensions.boundedHeight])
    .padding(0.3);

var rowConverter = function(d) {
    return{
        genre: d.genre,
        votes: +d.count
    }
};

// var rowConverter2 = (d) => {
//     return{
//         genre: d.genre,
//         votes: +d.count
//     }
// }

// d3.csv("https://nam01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fraw.githubusercontent.com%2Flennymartinez%2Fjmmx29%2Fmaster%2F_work%2Fexamples%2Fbar%2Fdata.csv&data=02%7C01%7Cyxf313%40miami.edu%7Ca0429abd360646c9727708d7bef840cb%7C2a144b72f23942d48c0e6f0f17c48e33%7C0%7C0%7C637187845749576314&sdata=dgGJ%2B2J3EVI2y3I1CPBnfOKUIzObK08TmFxyzvG9WD4%3D&reserved=0",
//        rowConverter, function(data){

//        })

// loading data in d3v5
d3.csv("https://raw.githubusercontent.com/lennymartinez/jmmx29/master/_work/examples/bar/data.csv", rowConverter)
.then(
    //our chart
    function(data){
        //console.log(data);
        //xScale.domain(d3.extent(data, function(d) {return d.votes}));
        xScale.domain([0, d3.max(data, d => d.votes) * 1.20]);
        yScale.domain(data.map(d => d.genre));

        //draw the bars
        var bars = svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("y", d => yScale(d.genre))
            .attr("width", d => xScale(d.votes))
            .attr("height", yScale.bandwidth())
            .attr("fill", "#bada55");

        var candy = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cy", d => yScale(d.genre))
            .attr("cx", d => xScale(d.votes))
            .attr("r", 10)
            .attr("fill", "#bada55");

        // axis
        var xAxis = svg.append("g")
            .attr("class", "x axis")
            .call(d3.axisBottom(xScale))
            .attr("transform", `translate(0,${dimensions.boundedHeight})`);

        var xAxisText =xAxis.selectAll("text")
            .attr("class", "axis_text");

        var yAxis = svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale)); 
        
        var yAxisText = yAxis.selectAll("text")
            .attr("class", "axis_text");
               
    }
);
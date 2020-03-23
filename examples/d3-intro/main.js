
var dataset = [5, 4];

var body = d3.select('body');
body.selectAll('p')
    .data(dataset)
    .enter()
    .text(function(d){
        return `I can count up to ${d}`
    })


    

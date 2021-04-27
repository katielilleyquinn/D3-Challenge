var widthsvg = 960;
var heightsvg = 500;

var chartmargin = {top: 30, right: 30, bottom: 30, left: 30};

var width = widthsvg - chartmargin.left - chartmargin.right;
var height = heightsvg - chartmargin.top - chartmargin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", widthsvg)
    .attr("height", heightsvg);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartmargin.left}, ${chartmargin.top})`);

//get data

d3.csv("../data/data.csv").then(function(data) {
    data.forEach(function(data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
    });

    var scalex = d3.scaleLinear()
    .domain([20, d3.max(data, d => d.poverty)])
    .range([0, width]);

    var scaley = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.obesity)])
    .range([height, 0]);

    var axisbottom = d3.axisBotton(scalex);
    var axisleft = d3.axisLeft(scaley);

    chartGroup.append("g")
    .call(axisleft);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(axisbottom);

// make and label circles (data points)

var chartGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => scalex(d.poverty))
    .attr("cy", d => scaley(d.obesity))
    .attr("r", "15")
    .attr("fill", "blue");
    
    chartGroup.append("text")
    .data(Data)
    .enter()
    .attr("x", function(data){
        return scalex(data.poverty)
    }
    )
    .attr("y", function(data) {
        return scaley(data.poverty);
    })
    .text( d => d.abbr)
    
});

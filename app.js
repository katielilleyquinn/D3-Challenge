var widthsvg = 900;
var heightsvg = 500;

chartmargin = {top: 30, right: 30, bottom: 30, left: 30};

var width = widthsvg - chartmargin.left - chartmargin.right;
var height = heightsvg - chartmargin.top - chartmargin.bottom;

var Svg = d3
    .select("#scatter")
    .append("Svg")
    .attr("width", "widthsvg")
    .attr("height", "heightsvg");

var chartGroup = Svg.append("g")
    .attr("transform", `translate(${chartmargin.left}, ${chartmargin.top})`);

//get data

d3.csv("assets/data/data.csv").then(function(data) {
    data.function(data)
        data.obesity = +data.obesity;
        data.poverty = +data.poverty;
    }
    )
;

//axis and scales

var scalex = d3.scaleLinear()
    .domain([5, d3.max(data, d => d.obesity)])
    .range([0, width]);

var scaley = d3.scaleLinear()
    .domain([2, d3.max(data, d => d.poverty)])
    .range([height, 0]);

var axisbottom = d3.axisBotton(scalex);
var axisleft = d3.axisLeft(scaley);

chartGroup.append("g")
    .call(axisleft);

chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(axisbottom);

// make and label circles (data points)

chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => scalex(d.obesity))
    .attr("cy", d => scaley(d.poverty))
    .attr("r", 15)
    .attr("fill", "blue");
    
chartGroup.append("text")
    .data(Data)
    .enter()
    .attr("x", function(data){
        return scalex(data.obesity);
    }
    )
    .attr("y", function(data) {
        return scaley(data.poverty);
    })
    .text( d => d.abbr);







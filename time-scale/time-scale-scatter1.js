var w = 500;
var h = 300;
var margin = 40;

var dataset, xScale, yScale; //Empty, for now

//For converting strings to Dates
var parseTime = d3.timeParse("%m/%d/%y");

//For converting Dates to strings
var formatTime = d3.timeFormat("%b %e");

//Function for converting CSV values from strings to Dates and numbers
var rowConverter = function (d) {
    return {
        Date: parseTime(d.Date),
        Amount: parseInt(d.Amount)
    };
}

//Load in the data
d3.csv("time_scale_data.csv", rowConverter, function (data) {

    //Copy data into global dataset
    dataset = data;

    //Discover start and end dates in dataset
    var startDate = d3.min(dataset, function (d) {
        return d.Date;
    });
    var endDate = d3.max(dataset, function (d) {
        return d.Date;
    });

    //Create scale functions
    xScale = d3.scaleTime()
        .domain([
            d3.timeDay.offset(startDate, -1), //startDate minus one day, for margin
            d3.timeDay.offset(endDate, 1) //endDate plus one day, for margin
        ])
        .range([margin, w - margin]);

    yScale = d3.scaleLinear()
        .domain([
            0, //Because I want a zero baseline
            d3.max(dataset, function (d) {
                return d.Amount;
            })
        ])
        .range([h - margin, margin]);

    var xaxis = d3.axisBottom()
        .scale(xScale)
        .ticks(5)
        .tickFormat(formatTime);

    var yaxis = d3.axisLeft()
        .scale(yScale)
        .ticks(5);

    //Create SVG element
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    /*/Generate date labels first, so they are in back
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function (d) {
            return formatTime(d.Date);
        })
        .attr("x", function (d) {
            return xScale(d.Date) + 4;
        })
        .attr("y", function (d) {
            return yScale(d.Amount) + 4;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "#bbb");*/

    //guide lines

    svg.selectAll("line")
        .data(dataset)
        .enter()
        .append("line")
        .attr("x1", function (d) {
            return xScale(d.Date);
        })
        .attr("x2", function (d) {
            return xScale(d.Date);
        })
        .attr("y1", h - margin)
        .attr("y2", function (d) {
            return yScale(d.Amount);
        })
        .attr("stroke", "#ddd")
        .attr("stroke-width", 1);

    //Generate circles last, so they appear in front
    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScale(d.Date);
        })
        .attr("cy", function (d) {
            return yScale(d.Amount);
        })
        .attr("r", 2);

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + 0 + ',' + (h - margin) + ')')
        .call(xaxis);

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + margin + ',' + 0 + ')')
        .call(yaxis);

});

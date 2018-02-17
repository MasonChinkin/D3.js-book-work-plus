//W and H
var w = 800;
var h = 300;
var padding = 40;

//establish empty variables
var dataset, x, y, xAxis, yAxis, line, area, dangerArea;

//Convert date to string for axis
var formatTime = d3.timeFormat("%Y");

//convert CSV values from string to dates and floats
var rowConverter = function(d) {
    return {
        date: new Date(+d.year, (d.month - 1)),
        average: parseFloat(d.average)
    };
};

//Load data
d3.csv("mauna_loa_co2_monthly_averages.csv", rowConverter, function(error, data) {
    if (error) throw error;

    var dataset = data;

    //verify data (optional)
    //console.table(dataset, ["date", "average"]);

    //Scales
    x = d3.scaleTime()
        .domain([
            d3.min(dataset, function(d) { return d.date; }),
            d3.max(dataset, function(d) { return d.date; }),
        ])
        .range([padding, w]);

    y = d3.scaleLinear()
        .domain([
            d3.min(dataset, function(d) { if (d.average >= 0) return d.average; }) - 10,
            d3.max(dataset, function(d) { return d.average; })
        ])
        .range([h - padding, 0]);

    /*//define line below safe levels
    line = d3.line()
        .defined(function(d) { return d.average >= 0 && d.average <= 350; })
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.average); });

    dangerLine = d3.line()
        .defined(function(d) { return d.average >= 350; })
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.average); });*/

    //define area
    area = d3.area()
        .defined(function(d) { return d.average >= 0; })
        .x(function(d) { return x(d.date); })
        .y0(function() { return y.range()[0]; })
        .y1(function(d) { return y(d.average); });

    dangerArea = d3.area()
        .defined(function(d) { return d.average >= 350; })
        .x(function(d) { return x(d.date); })
        .y0(function() { return y(350); })
        .y1(function(d) { return y(d.average); });

    //Define axes
    xAxis = d3.axisBottom()
        .scale(x)
        .ticks(10)
        .tickFormat(formatTime);

    yAxis = d3.axisLeft()
        .scale(y)
        .ticks(5);

    //SVG
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    //create area
    svg.append("path")
        .datum(dataset)
        .attr("class", "area")
        .attr("d", area);

    svg.append("path")
        .datum(dataset)
        .attr("class", "area danger")
        .attr("d", dangerArea);

    /*//create line
    svg.append("path")
        .datum(dataset)
        .attr("class", "line")
        .attr("d", line);

    svg.append("path")
        .datum(dataset)
        .attr("class", "line danger")
        .attr("d", dangerLine);*/

    //create axes
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    //Danger line at 350
    svg.append("line")
        .attr("class", "line safeLevel")
        .attr("x1", padding)
        .attr("x2", w)
        .attr("y1", y(350))
        .attr("y2", y(350));

    //Label safety line
    svg.append("text")
        .attr("class", "dangerLabel")
        .attr("x", padding + 20)
        .attr("y", y(350) - 7)
        .text("350 ppm 'safe' level");

});
var scatterDataset = []; //Initialize empty array
var numDataPoints = 40; //Number of dummy data points to create
var maxRange = Math.random() * 100; //Max range of new x values
for (var i = 0; i < numDataPoints; i++) { //Loop numDataPoints times
    var newNumber1 = Math.random() * maxRange; //New random integer
    var newNumber2 = Math.random() * maxRange; //New random integer
    scatterDataset.push([newNumber1, newNumber2]); //Add new number to array
}

//BOX

var w = 500 //width
var h = 300 //height
var margin = 40

//DEFINE SCALES

var xscale = d3.scaleLinear()
    .domain([0, d3.max(scatterDataset, function (d) {
        return d[0]
    })])
    .range([margin, w - margin]);

var yscale = d3.scaleLinear()
    .domain([0, d3.max(scatterDataset, function (d) {
        return d[1]
    })])
    .range([h - margin, margin]);

var ascale = d3.scaleSqrt()
    .domain([0, d3.max(scatterDataset, function (d) {
        return d[1];
    })])
    .range([2, 20]);

//DEFINE AXES

var xaxis = d3.axisBottom()
    .scale(xscale)
    .ticks(6);

var yaxis = d3.axisLeft()
    .scale(yscale)
    .ticks(6);

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

//CLIPPING PATH

svg.append("clipPath")
    .attr('id', 'chart-area')
    .append('rect')
    .attr('x', margin)
    .attr('y', margin)
    .attr('width', w - margin * 2)
    .attr('height', h - margin * 2)

//LINES

svg.append('g')
    .attr('id', 'lines')
    .attr('clip-path', 'url(#chart-area)')
    .selectAll("line")
    .data(scatterDataset)
    .enter()
    .append("line")
    .attr("x1", margin)
    .attr("x2", function (d) {
        return xscale(d[0]);
    })
    .attr("y1", h - margin)
    .attr('y2', function (d) {
        return yscale(d[1])
    })
    .attr("y2", function (d) {
        return yscale(d[1]);
    })
    .attr("stroke", "#ddd")
    .attr("stroke-width", 1);

//CIRCLES

svg.append('g')
    .attr('id', 'circles')
    .attr('clip-path', 'url(#chart-area)')
    .selectAll("circle")
    .data(scatterDataset)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
        return xscale(d[0]);
    })
    .attr("cy", function (d) {
        return yscale(d[1]);
    })
    .attr("r", 2);

//LABELS

/*svg.selectAll("text")
    .data(scatterDataset)
    .enter()
    .append("text")
    .text(function (d) {
        return d[0] + "," + d[1];
    })
    .attr("x", function (d) {
        return xscale(d[0]);
    })
    .attr("y", function (d) {
        return yscale(d[1]) + 4;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "8px")
    .attr("fill", "red")
    .attr('text-anchor', 'middle');
*/

//GENERATE AXES

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (h - margin) + ')')
    .call(xaxis);

svg.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + margin + ', 0)')
    .call(yaxis);

//TRANSITION

d3.select('p')
    .on('click', function () {

        var numValues = scatterDataset.length; //Count original length of dataset
        var maxRange = Math.random() * 100; //Max range of new values
        scatterDataset = []; //Initialize empty array
        for (var i = 0; i < numValues; i++) { //Loop numValues times
            var newNumber1 = Math.random() * maxRange; //New random integer
            var newNumber2 = Math.random() * maxRange; //New random integer
            scatterDataset.push([newNumber1, newNumber2]); //Add new number to array
        }

        //UPDATE SCALES

        xscale.domain([0, d3.max(scatterDataset, function (d) {
            return d[0]
        })])

        yscale.domain([0, d3.max(scatterDataset, function (d) {
            return d[1]
        })])

        //UPDATE LINES

        svg.selectAll("line")
            .data(scatterDataset)
            .transition()
            .duration(2000)
            .attr('x1', margin)
            .attr("x2", function (d) {
                return xscale(d[0]);
            })
            .attr("y1", h - margin)
            .attr("y2", function (d) {
                return yscale(d[1]);
            })

        //UPDATE CIRCLES

        svg.selectAll("circle")
            .data(scatterDataset)
            .transition()
            .duration(2000)
            .on('start', function () {
                d3.select(this)
                    .attr('fill', 'blue')
                    .attr('r', 6)
            })
            .attr("cx", function (d) {
                return xscale(d[0]);
            })
            .attr("cy", function (d) {
                return yscale(d[1]);
            })
            .transition()
            .duration(1000)
            .attr('fill', 'black')
            .attr('r', 2)

        //UPDATE X AXIS

        svg.select(".x.axis")
            .transition()
            .duration(500)
            .call(xaxis);

        //UPDATE Y AXIS

        svg.select(".y.axis")
            .transition()
            .duration(500)
            .call(yaxis);
    })

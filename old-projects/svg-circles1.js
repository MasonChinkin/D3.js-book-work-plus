var barDataset = []; //Initialize empty array
for (var i = 0; i < 20; i++) { //Loop X times
  var newNumber = Math.round(Math.random() * 30); //Math.random creates almost 0 to almost 1
  barDataset.push(newNumber); //Add new number to array
};

var w = 500 //width variabelized
var h = 120 //height variabelized
var barPadding = 2

var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h)

var circles = svg.selectAll("circle")
  .data(barDataset)
  .enter()
  .append("circle")

circles.attr("cx", function(d, i) {
    return i * (w / barDataset.length) + 20;
  })
  .attr("cy", h / 2)
  .attr("r", function(d) {
    return d;
  })
  .attr('fill', 'yellow') //circle style
  .attr('stroke', 'orange')
  .attr('stroke-width', function(d) {
    return d / 4;
  });

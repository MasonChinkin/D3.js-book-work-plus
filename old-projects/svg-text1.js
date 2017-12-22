var barDataset = []; //Initialize empty array
for (var i = 0; i < 20; i++) { //Loop X times
    var newNumber = Math.round(Math.random() * 30); //Math.random creates almost 0 to almost 1
    barDataset.push(newNumber); //Add new number to array
};

d3.select("body").selectAll("p")
    .data(barDataset)
    .enter()
    .append("p")
    .style("Color", function(d) {
        if (d > 10) {
            return "red";
        } else {
            return "silver"
        }
    })
    .text(function(d) {
        if (d < 15) {
            return "I can count up to " + d;
        }
    });
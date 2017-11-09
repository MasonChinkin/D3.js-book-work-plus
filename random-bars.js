  var w = 600 //width variabelized
  var h = 300 //height variabelized
  var margin = 60

  var maxValue = 100

  var barDataset = []; //Initialize empty array
  for (var i = 0; i < 30; i++) { //Loop X times
      var newNumber = Math.round(Math.random() * maxValue); //Math.random creates almost 0 to almost 1
      barDataset.push(newNumber); //Add new number to array
  };

  //SCALES

  var x = d3.scaleBand()
      .domain(d3.range(barDataset.length))
      .rangeRound([0, w])
      .paddingInner(0.05);

  var y = d3.scaleLinear()
      .domain([0, d3.max(barDataset)])
      .range([0, h - margin]);

  //BARS

  var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

  var bars = svg.selectAll("rect")
      .data(barDataset)

  bars.enter()
      .append("rect")
      .attr("x", function (d, i) {
          return x(i);
      })
      .attr("y", function (d) {
          return h - y(d);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
          return y(d);
      })
      .attr('fill', function (d) {
          return "rgb(0,0, " + Math.round(y(d)) + ")";
      });

  //LABELS

  var text = svg.selectAll("text")
      .data(barDataset)

  text.enter()
      .append("text")
      .text(function (d) {
          return d;
      })
      .attr("x", function (d, i) {
          return x(i) + x.bandwidth() / 2;
      })
      .attr("y", function (d) {
          if (d >= 6) {
              return h - y(d) + 14;
          } else {
              return h - y(d) - 4
          }
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", function (d) {
          if (d >= 6) {
              return "white"
          } else {
              return "black"
          }
      })
      .attr('text-anchor', 'middle');

  //TRANSITION

  d3.select('p')
      .on('click', function () {

          //COMPLETELY REFRESH DATASET
          var newValues = barDataset.length;
          barDataset = []; //Initialize empty array
          for (var i = 0; i < newValues; i++) { //Loop X times
              var newNumber = Math.round(Math.random() * 100); //Math.random creates almost 0 to almost 1
              barDataset.push(newNumber); //Add new number to array
          };

          //Transition BARS

          var bars = svg.selectAll("rect")
              .data(barDataset)

          bars.transition()
              .delay(function (d, i) {
                  return i / barDataset.length * 2000;
              })
              .duration(2000)
              .ease(d3.easeElasticOut)
              .attr("y", function (d) {
                  return h - y(d);
              })
              .attr("height", function (d) {
                  return y(d);
              })
              .attr('fill', function (d) {
                  return "rgb(0,0, " + Math.round(y(d)) + ")";
              });

          //TRANSITION LABELS

          var text = svg.selectAll("text")
              .data(barDataset)

          text.transition()
              .delay(function (d, i) {
                  return i / barDataset.length * 2000;
              })
              .duration(2000)
              .ease(d3.easeElasticOut)
              .text(function (d) {
                  return d;
              })
              .attr("y", function (d) {
                  if (d >= 6) {
                      return h - y(d) + 14;
                  } else {
                      return h - y(d) - 4
                  }
              })
              .attr("font-family", "sans-serif")
              .attr("font-size", "11px")
              .attr("fill", function (d) {
                  if (d >= 6) {
                      return "white"
                  } else {
                      return "black"
                  }
              })
              .attr('text-anchor', 'middle');
      });

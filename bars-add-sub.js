  var w = 600 //width variabelized
  var h = 300 //height variabelized
  var margin = 60

  var maxValue = 100

  /*var barDataset = {}; //Initialize empty array
  for (var i = 0; i < 30; i++) { //Loop X times
      var newNumber = Math.round(Math.random() * maxValue); //Math.random creates almost 0 to almost 1
      var lastKeyValue = i + 1;
      barDataset.push({
          key: lastKeyValue,
          value: newNumber
      });
  };*/

  var barDataset = [{ key: 0, value: 5 }, //dataset is now an array of objects.
      { key: 1, value: 10 }, //Each object has a 'key' and a 'value'.
      { key: 2, value: 13 },
      { key: 3, value: 19 },
      { key: 4, value: 21 },
      { key: 5, value: 25 },
      { key: 6, value: 22 },
      { key: 7, value: 18 },
      { key: 8, value: 15 },
      { key: 9, value: 13 },
      { key: 10, value: 11 },
      { key: 11, value: 12 },
      { key: 12, value: 15 },
      { key: 13, value: 20 },
      { key: 14, value: 18 },
      { key: 15, value: 17 },
      { key: 16, value: 16 },
      { key: 17, value: 18 },
      { key: 18, value: 23 },
      { key: 19, value: 25 }
  ];

  var key = function (d) {
      return d.key;
  }

  //SCALES

  var x = d3.scaleBand()
      .domain(d3.range(barDataset.length))
      .rangeRound([0, w])
      .paddingInner(0.05);

  var y = d3.scaleLinear()
      .domain([0, d3.max(barDataset, function (d) {
          return d.value;
      })])
      .range([0, h - margin]);

  //BARS

  var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

  var bars = svg.selectAll("rect")
      .data(barDataset, key)

  bars.enter()
      .append("rect")
      .attr("x", function (d, i) {
          return x(i);
      })
      .attr("y", function (d) {
          return h - y(d.value);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
          return y(d.value);
      })
      .attr('fill', function (d) {
          return "rgb(0,0, " + Math.round(y(d.value)) + ")";
      });

  //LABELS

  var text = svg.selectAll("text")
      .data(barDataset, key)

  text.enter()
      .append("text")
      .text(function (d) {
          return d.value;
      })
      .attr("x", function (d, i) {
          return x(i) + x.bandwidth() / 2;
      })
      .attr("y", function (d) {
          if (d.value >= 6) {
              return h - y(d.value) + 14;
          } else { return h - y(d.value) - 4 }
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", function (d) {
          if (d.value >= 6) {
              return "white"
          } else { return "black" }
      })
      .attr('text-anchor', 'middle');

  //TRANSITION

  d3.selectAll('p')
      .on('click', function () {

          var paragraphID = d3.select(this).attr('id');

          //ADD OR REMOVE ONE DATUM TO barDataset
          if (paragraphID == "add") {
              var newNumber = Math.round(Math.random() * maxValue); //Math.random creates almost 0 to almost 1
              var lastKeyValue = barDataset[barDataset.length - 1].key
              barDataset.push({
                  key: lastKeyValue + 1,
                  value: newNumber //Add new number to array
              })
          } else {
              barDataset.shift()
          };

          //UPDATE SCALES
          x.domain(d3.range(barDataset.length));
          y.domain([0, d3.max(barDataset, function (d) {
              return d.value
          })]);

          //Transition BARS

          var bars = svg.selectAll("rect") //SELECT
              .data(barDataset, key);

          bars.enter() //ENTER
              .append("rect")
              .attr("x", w)
              .attr("y", function (d) {
                  return h - y(d.value);
              })
              .attr("width", x.bandwidth())
              .attr("height", function (d) {
                  return y(d.value);
              })
              .attr('fill', function (d) {
                  return "rgb(0,0, " + Math.round(y(d.value)) + ")";
              })
              .merge(bars)
              .transition()
              .duration(750)
              .ease(d3.easeElasticOut)
              .attr('x', function (d, i) {
                  return x(i)
              })
              .attr("y", function (d) {
                  return h - y(d.value);
              })
              .attr("width", x.bandwidth())
              .attr("height", function (d) {
                  return y(d.value);
              });

          bars.exit() //EXIT
              .transition()
              .duration(750)
              .ease(d3.easeElasticOut)
              .attr('x', -x.bandwidth()) //EXIT STAGE LEFT
              .remove();

          //Exercise: Modify this code to add a new label each time a new bar is added!
          //

          var text = svg.selectAll("text")
              .data(barDataset, key)

          text.enter()
              .append("text")
              .text(function (d) {
                  return d.value;
              })
              .attr("x", w + (x.bandwidth() / 2))
              .attr("y", function (d) {
                  if (d.value >= 6) {
                      return h - y(d.value) + 14;
                  } else {
                      return h - y(d.value) - 4
                  }
              })
              .attr("font-family", "sans-serif")
              .attr("font-size", "11px")
              .attr("fill", function (d) {
                  if (d.value >= 6) {
                      return "white"
                  } else {
                      return "black"
                  }
              })
              .merge(text)
              .transition()
              .duration(750)
              .ease(d3.easeElasticOut)
              .text(function (d) {
                  return d.value;
              })
              .attr("x", function (d, i) {
                  return x(i) + x.bandwidth() / 2;
              })
              .attr("y", function (d) {
                  if (d.value >= 6) {
                      return h - y(d.value) + 14;
                  } else {
                      return h - y(d.value) - 4
                  }
              })
              .attr('text-anchor', 'middle');

          text.exit() //EXIT
              .transition()
              .duration(750)
              .ease(d3.easeElasticOut)
              .attr('x', -x.bandwidth()) //EXIT STAGE LEFT
              .remove();
      });

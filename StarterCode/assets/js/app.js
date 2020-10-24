var svgWidth = 960;
var svgHeight = 550;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("/16-D3/Homework/Instructions/StarterCode/assets/js/data.csv").then(function(incData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    incData.forEach(function(data) {
      data.income = +data.income;
      data.obesity = +data.obesity;
      data.age = +data.age;
      data.smokes = +data.smokes;
    });

    // Step 2: Create scale functions
    // ==============================
  
var xLinearScale = d3.scaleLinear()
  .domain([20, d3.max(incData, d => d.age)])
  .range([0, width]);


var yLinearScale = d3.scaleLinear()
  .domain([0, d3.max(incData, d => d.obesity)])
  .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);
    

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(incData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "20")
    .attr("fill", "blue")
    .attr("opacity", ".5");

    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.income}<br>Income: ${d.obesity}<br>Obesity: ${d.age}`);
    });

  chartGroup.call(toolTip);   

  circlesGroup.on("click", function(data) {
    toolTip.show(data, this);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("obesity-text text", true)
    .text("Age");

  chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .classed("age-text text", true)
    .text("Age");
  });
 

// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object 
var margin = {
    top: 80,
    right: 60,
    bottom: 80,
    left: 60
};

// Define dimensions of the chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append a group area, then set its margins 
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";

// function used for updating x-scale var upon click on axis label
function xScale(journalData, chosenXAxis){
    //creating scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(journalData, d => d[chosenXAxis])* 0.8,
            d3.max(journalData, d => d[chosenXAxis]) * 1.2
        ])
        .range([0, width]);
    return xLinearScale;
}

//function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis){
    var bottomAxis = d3.axisBottom(newXScale);
    

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    return xAxis;
}

//function used for updating circles group with a transition to new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis){
    
    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]));
    return circlesGroup
}

//function used for updating cicles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

    if (chosenXAxis === "poverty") {
        var label = "In Poverty (%)";
    }
    else { 
        var label = 'Age (Median)'; 
    }


    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .style("border", "solid")
        .style("background-color", "gray")
        .offset([80, -60])
        .html(function(d) {
            return(`${d.state}<br>${label}<br>${d[chosenXAxis]}`);
        });
    
    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
      })

        //onmouseout event
        .on("mouseout", function(data, index) {
            toolTip.hide(data, this);
        });



    return circlesGroup;
}




// Retrieve data from the csv file and execute everything below

//console.log("journaldata")
d3.csv("assets/data/data.csv").then(function(journalData, error){
    if (error) throw error;
    console.log("journaldata", journalData)

    // parse data 
    journalData.forEach(function(data){
        data.poverty = +data.poverty;
        data.povertyMoe = +data.povertyMoe;
        data.age = +data.age;
        data.ageMoe = +data.ageMoe;
        data.income = +data.income;
        data.incomeMoe = +data.incomeMoe;
        data.healthcare = +data.healthcare;
        data.healthcareLow = +data.healthcareLow;
        data.obesity = +data.obesity;
        data.obesityLow = +data.obesityLow;
        data.obesityHigh = +data.obesityHigh;
        data.smokes = +data.smokes;
        data.smokesLow = +data.smokesLow;
        data.smokesLow = +data.smokesLow;
        data.smokesHigh = +data.smokesHigh;

    });

    // xLinearScale function above csv import 
    var xLinearScale = xScale(journalData, chosenXAxis);

    // Create y scale function 
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(journalData, d => d.obesity)])
        .range([height, 0]);

    // Create initial axis functions 
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);


    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    
    // append y axis
    chartGroup.append("g")
        .call(leftAxis);

    // append initial circles 
    var circlesGroup = chartGroup.selectAll("circle")
        .data(journalData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d.obesity))
        .attr("r", 20)
        .attr("fill", "blue")
        .attr("opacity", ".5");


    // Create group for 2 x-axis labels
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);
    
    var povertyLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "poverty")
        .classed("active", true)
        .text("In Poverty (%)");

    var ageLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "age")
        .classed("active", true)
        .text("Age (Median)");

    // append y axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("Obese (%)");

    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);


    // x axis labels event listener
    labelsGroup.selectAll("text")
        .on("click", function(){


            //get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenXAxis) {

                //replaces chosenxAxis with value
                chosenXAxis = value;

                //functions here found above csv import
                // updates x scale for new data 
                xLinearScale = xScale(journalData, chosenXAxis);

                //update x axis with transition
                xAxis = renderAxes(xLinearScale, xAxis);

                // updates circles with new x values 
                circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

                //updates tooltips with new info
                circlesGroup = updateToolTip(chosenXAxis, circlesGroup);


                // changes classes to chage bold text 
                if (chosenXAxis === "age") {
                    ageLabel
                    .classed("active", true)
                    .classed("inactive", false);
                    povertyLabel
                    .classed("active", false)
                    .classed("inactive", true)

                }
                else{
                    ageLabel
                    .classed("active", false)
                    .classed("inactive", true);
                    povertyLabel
                    .classed("active", true)
                    .classed("inactive", false)

                }
            }
        });


   

}).catch(console.error);









// @TODO: YOUR CODE HERE!
var svgWidth = window.innerHeight;
var svgHeight = window.innerWidth;

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
var chosenYAxis = "obesity";

// function used for updating x-scale var upon click on axis label
function xScale(journalData, chosenXAxis) {
    //creating scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(journalData, d => d[chosenXAxis]) * 0.8,
        d3.max(journalData, d => d[chosenXAxis]) * 1.2
        ])
        .range([0, width]);
    return xLinearScale;
}


// function used for updating y-scale var upon click on axis label
function YScale(journalData, chosenYAxis) {
    //creating scales
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(journalData, d => d[chosenYAxis]) * 0.8,
        d3.max(journalData, d => d[chosenYAxis]) * 1.2
        ])
        .range([height, 0]);
    return yLinearScale;
}


//function used for updating xAxis var upon click on axis label
function renderAxesX(newXScale, xAxis) {
    let bottomAxis = d3.axisBottom(newXScale);


    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    return xAxis;
}

//function used for updating xAxis var upon click on axis label
function renderAxesY(newYScale, yAxis) {
    let leftAxis = d3.axisLeft(newYScale);


    yAxis.transition()
        .duration(1000)
        .call(leftAxis);
    return yAxis;
}


//function used for updating circles group with a transition to new circles
function renderCirclesX(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]));
    return circlesGroup
}

//function used for updating circles group with a transition to new circles
function renderCirclesY(circlesGroup, newYScale, chosenYAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cy", d => newYScale(d[chosenYAxis]));
    return circlesGroup
}




//function used for updating cicles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

    if (chosenXAxis === "poverty" && chosenYAxis === "obesity") {
        var label = "poverty:";
        var label2 = "obesity:";
    }
    else if (chosenXAxis === 'age' && chosenYAxis === 'smokes') {
        var label = 'Age:';
        var label2 = 'Smokes:';
    }
    else {
        var label = 'Healthcare:';
        var label2 = 'Income:';

    }


    var toolTip = d3.tip()
        .attr("class", "tooltip")
        // .style("border", "solid")
        .style("background-color", "gray")
        .offset([80, -60])
        .html(function (d) {
            return (`${d.state}<br>${label}${d[chosenXAxis]}<br>${label2}${d[chosenYAxis]}`);
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function (data) {
        toolTip.show(data, this);
    })

        //onmouseout event
        .on("mouseout", function (data, index) {
            toolTip.hide(data, this);
        });



    return circlesGroup;
}

// Retrieve data from the csv file and execute everything below

//console.log("journaldata")
d3.csv("assets/data/data.csv").then(function (journalData, error) {
    if (error) throw error;
    console.log("journaldata", journalData)

    // parse data 
    journalData.forEach(function (data) {
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

    // // Create y scale function 
    // var yLinearScale = d3.scaleLinear()
    //     .domain([0, d3.max(journalData, d => d.obesity)])
    //     .range([height, 0]);

    // Create y scale function
    var yLinearScale = YScale(journalData, chosenYAxis);

    // Create initial axis functions 
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);


    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);


    // append y axis 
    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .attr("transform", ``)
        .call(leftAxis);


    // // append y axis
    // chartGroup.append("g")
    //     .call(leftAxis);

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


    var incomeLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "income")
        .classed("active", true)
        .text("Household Income (Median)");



    // append y axis
    var obesitylabel = chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("active", true)
        .text("Obese (%)");

    var smokeslabel = chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -80)
        .attr("x", 0 - (height / 2))
        .attr("dy", "2em")
        .classed("active", true)
        .text("Smokes (%)");

    var healthcarelabel = chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -120)
        .attr("x", 0 - (height / 2))
        .attr("dy", "3em")
        .classed("active", true)
        .text("Lacks Healthcare (%)");


    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

    var circlesGroup = updateToolTip(chosenYAxis, circlesGroup)


    // x axis labels event listener
    labelsGroup.selectAll("text")
        .on("click", function () {


            //get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenXAxis && value !== chosenYAxis) {

                //replaces chosenxAxis with value
                chosenXAxis = value;
                chosenYAxis = value;

                //functions here found above csv import
                // updates x scale for new data 
                xLinearScale = xScale(journalData, chosenXAxis);
                yLinearScale = YScale(journalData, chosenYAxis)

                //update x axis with transition
                xAxis = renderAxesX(xLinearScale, xAxis);
                yAxis = renderAxesY(yLinearScale, yAxis);

                // updates circles with new x values 
                circlesGroup = renderCirclesX(circlesGroup, xLinearScale, chosenXAxis);
                circlesGroup = renderCirclesY(circlesGroup, yLinearScale, chosenYAxis);

                //updates tooltips with new info
                circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
                circlesGroup = updateToolTip(chosenYAxis, circlesGroup);


                // changes classes to change bold text 
                if (chosenXAxis === "age" && chosenYAxis === "obesity") {
                    ageLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    povertyLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    incomelabel
                        .classed("active", false)
                        .classed("inactive", true);
                    obesitylabel
                        .classed("active", true)
                        .classed("inactive", false);
                    healthcarelabel
                        .classed("active", false)
                        .classed("inactive", true);
                    smokeslabel
                        .classed("active", false)
                        .classed("inactive", true);

                }
                else {
                    ageLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    povertyLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    incomeLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    obesitylabel
                        .classed("active", false)
                        .classed("inactive", true);
                    healthcarelabel
                        .classed("active", true)
                        .classed("inactive", false)
                    smokeslabel
                        .classed("active", true)
                        .classed("inactive", false)


                }
            }
        });
});





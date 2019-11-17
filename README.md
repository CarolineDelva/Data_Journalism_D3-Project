# Data Journalism 

I completed this project during my time at the [Columbia Engineering Data Analytics Bootcamp](https://bootcamp.cvn.columbia.edu/data/nyc/landing/?s=Google-Brand&pkw=%2Bdata%20%2Banalytics%20%2Bcolumbia&pcrid=392444639754&pmt=b&utm_source=google&utm_medium=cpc&utm_campaign=%5BS%5D_GRD_Data_Brand_ALL_NYC_BMM_New&utm_term=%2Bdata%20%2Banalytics%20%2Bcolumbia&utm_content=392444639754&s=google&k=%2Bdata%20%2Banalytics%20%2Bcolumbia&gclid=Cj0KCQiA2b7uBRDsARIsAEE9XpFH-2wU0-_7jtxCV_PCkGBR0prlyKtvpF2-nAWU1tO4oYci5h1QStsaAsg5EALw_wcB&gclsrc=aw.ds) located in New York, NY.

#### -- Project Status: [Completed]


![Newsroom](https://media.giphy.com/media/v2xIous7mnEYg/giphy.gif)




## Project Description

The purpose of this project is to analyze the current trends shaping people's lives and to create charts, graphs, and interactive elements to help readers understand your findings. The [data.csv](https://github.com/CarolineDelva/Data_Journalism_D3-Project/tree/master/assets/data) is based on [2014 ACS 1-year estimates](https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml) and includes data on rates of income, obesity, poverty, etc. by state and MOE (margin of error).

The interactive scatter plot includes the following features:

- State abbreviations inside the circles

- Axes and labels to the left and bottom of the chart

- Multiple labels in scatter plot with click events so that users can decide which data to display 

- Animated transitions for circles' locations as well as the range of axes

- Tooltips to your circles and display each tooltip with the data that the user has selected when the user hovers their cursor over circles 

## Methods Used
* Data Visualization 
* Statistical Analysis
* Data exploration


## Technologies
* JavaScript (D3)
* HTML, CSS


## Needs of this project

To test graph in terminal, run the following code:

```
python -m http.server
```

### Visualizations


![7-animated-scatter](Images/7-animated-scatter.gif)


#### 2. Incorporate d3-tip


![8-tooltip](Images/8-tooltip.gif)


## [Visit Visualization](https://carolinedelva.github.io/Data_Journalism_D3-Project/)




### Conclusion

At a glance, it looks like there is a positive correlation between poverty and obesity, there is no clear correlation between age and obesity and there is a negative correlation between obesity and household income. It looks like there is a positive correlation between poverty and smokes, there is no clear correlation between age an smokes, and there is a negative correlation between smokes and household income. It also looks like there is a positive correlation between lack of healthcare and poverty, there is no clear correlation between lack of healthcare and age, and there is a negative correlation between lack of healthcare and household income.


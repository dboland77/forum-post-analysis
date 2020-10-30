# Visualising forum posts (Topic analysis output)

This application retrieves user posts from a fake message board. 

The posts have already been evaluated for "likely topics" with likelihood distribution available. 

The application groups the data by month and stores the three topics most frequently encountered. 

These topics are displayed in a stacked bar chart by month. 

The user can choose the number of posts analysed and displayed. 

---
## To run the application
---
Download or clone this reposito, cd to the containing folder and run "npm install" to install the package dependencies.  

Once the packages are installed (please check peer dependencies) you can run "npm start" from the same folder. 

---
## Tech stack
---

GraphQL 

Apollo 

React.js

Javascript 

d3-time-format 

VisX 

CSS 

HTML

---

## Assumptions
---
1. The topic with the highest probability from the likelihood distribution is the one to assign as the topic for that post.

2. If there are less than three topics in a month then that month should be excluded from the output.

3. Just one data visualisation and query are required.

---

## Steps taken to approach the task
---

1. GraphiQL used to manually explore the faker dataset with guidance from the github Readme.

1. I decided to use the first example in the task specification to visualise. 

1. Create-React-App bootstrapped project and added dependencies for Apollo and GraphQL

1. Set up Apollo client and connected to fakerQL

1. Query the dataset with react and ensure that some posts are retrieved successfully

1. Count passed as a variable to the graphql query (firstly hardcoded in the UseQuery hook, later set as a constant in App.js and passed as props). 

1. For the likelihood distribution I decided to  take the most probable entry as the label for that post

1. I wrote javascript utility functions to format, aggregate the data by month and obtain and store the most prevalent 3 topics each month. 

1. Once I was happy with the results from the dataset I looked at VisX documentation to learn about it.

1. I explored three visx examples and got them working (area chart, tooltip and stacked bar chart)

1. I decided to visualise the data with a series of stacked bar charts

1. I changed the example dataset in the stacked bar chart example to use mine

1. I went through a series of debugging steps to format my data to that required by the VisX component as well as mapping my array of data through to create individual stacked bar charts.

1. I played with the sample size (POSTS_TO_RETRIEVE) to determine the effects. I noted that for smaller sample sizes I might not get any results in a given month and chose to just not display a bar chart for that month if that was the case

1. I continued to play with the sample size and noted that as it increased the distribution was approaching something of a steady state. I did not determine where the limiting distribution lies but noted that when I set the sample size to 50000 I almost got a uniform result for the top 3 (barring February in which the results were the same topics but with the top 2 switched)

1. I set the sample size to 70000 and I get a uniform top 3 of "fishing, birthday, potato". GraphQl can return this amount of data very quickly as it just sends JSON and the data processing is performed in Javascript. 

1. As I found this interesting I thought the user might too so I added a user input field to allow the user to dynamically play with the sample size. 

1. As I was learning as I went I did not pay much attention to any code or project formatting with my emphasis being firmly on getting a working prototype, so the codebase was not in a presentable state. I re-factored and wrote the Readme. 

---
## Bugs encountered
---

- Warning: "React does not recognize the `xScale` prop on a DOM element. If you
intentionally want it to appear in the DOM as a custom attribute spell it as
lowercase `xscale` instead"

https://stackoverflow.com/questions/53849710/react-vx-chart-react-does-not-recognize-the-xscale-prop-on-a-dom-element


- Controlling the height of the chart element when using a responsive or grid layout was tricky they kept rendering infinite height and generating an error on the <rect> component with attribute height: A negative value is not valid (Due to Parent Container passing a lower height than min of 150 and rect going negative). I have gone with fixed component sizes and grid for n<10000

---
## Learning / Snaglist
---

1. I had minimal exposure to GraphQl so had to learn 
1. I had never used Apollo so had to learn
1. I had never used Visx so had to learn
1. I had to write quite a few utility javascript functions and learn about unix timestamps and data manipulation with JSON to parse the data and format for visualisation

1. Visx examples are mainly in Typescript so I had to decide whether to interpret this to javascript or convert my existing project to typescript. I went with the former

1. Once I had the data grouped and aggregated it took a while to figure out how I wanted to visualise it. I chose to use stacked bar graphs 


---
## Improvements / Future Development.
---

I took a pragmatic approach to this challenge and produced a working prototype. If this were to be accepted as meeting the user / stakeholder requirements then the following would need to be performed before it would be ready for being a release candidate to production. 

1. Add error handling (currently non-existent)

1. Convert to Typescript? (Depends on the rest of the code base)

1. Refactor to fit team coding style / patterns

1. Add Redux for state management

1. Switch to environment variable for the data URL

1. Add better UX for long load times (spinner or progress bar, change cursor)

1. Full testing 

---
## Potential future additions
---

1. Make the app responsive (add back visx/responsive and/or media queries)

1. Add any required user interaction   

1. Add other queries and visualisations for more insight to the data 




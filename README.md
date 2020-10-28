# Visualising forum posts (Topic analysis output)

## Steps
1. GraphiQL used to explore the faker dataset

2. Create-React-App bootstrapped project and added dependencies for Apollo, GraphQL and Visx

3. Set up Apollo client and connect to fakerQL

4. Query the dataset and ensure Posts are retrieved successfully

5. Count passed as a variable to the graphql query (currently hardcoded in the UseQuery hook in both the Autho and Posts components). 

6. Refactored to set n=1000 for now to ensure a reasonable sample size and pass as props.

7. For the likelihood distribution I just took the most probable entry as the label for that post. 

6. Visx Examples of BarStack, AreaChart and Tooltip implemented responsively

Next step is to hook these up to my data.

Noted that the date returned was not a user-friendly format. It is an epoch date
in milliseconds so I wrote a quick conversion function.

## First major issue
Warning: "React does not recognize the `xScale` prop on a DOM element. If you
intentionally want it to appear in the DOM as a custom attribute spell it as
lowercase `xscale` instead

https://stackoverflow.com/questions/53849710/react-vx-chart-react-does-not-recognize-the-xscale-prop-on-a-dom-element

I generated gradients from:
https://webgradients.com/ (thanks!)


Main issues / problems:
1. I did not know GraphQl so had to learn (I had used it a little for my gatsby site)
2. I had never used Apollo
3. I had to write quite a few helper javascript functions and learn about unix timestamps
4. I had to learn how to use Visx
5. Visx examples are mainly in Typescript so I had to decide whether to interpret this to javascript or convert my existing project to typescript. I went with the former (for now)
6. Codesandbox demos not working for most elements and documentation pretty thin!

## Improvements / Future Development.

This task took a significant amount of time so I have not done the following which are necessary:

1. Refactoring - remove all comments, redundant node modules, module names, folder structure

2. Convert to Typescript? (Depends on the rest of the code base)

3. Add Redux for state management

4. Allow user input for number of cases (+/-)

5. Full testing (Jest, Enzyme)

6. Proper error handling and Error Boundaries


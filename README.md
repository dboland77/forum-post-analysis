## Analysing forum posts (Topic analysis)

Project dependencies for Apollo, GraphQL and Visx added

Apollo client set up and connected to fakerQL

Posts retrieved successfully

Count passed as a variable to the graphql query (currently hardcoded to 8 in the UseQuery hook)

Visx Examples of BarStack, AreaChart and Tooltip implemented responsively

Next step is to hook these up to my data.

Noted that the date returned was not a user-friendly format. It is an epoch date
in milliseconds so I wrote a quick conversion function.

#First major issue
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




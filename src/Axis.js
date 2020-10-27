//This chart follows the tutorial at
//https://medium.com/vx-code/getting-started-with-vx-1756bb661410

import React from "react";
import { appleStock } from "@visx/mock-data";
import { scaleTime, scaleLinear } from "@visx/scale";
import { extent, max } from "d3-array";
import { AreaClosed } from "@visx/shape";
import { Group } from "@visx/group";
const data = appleStock;

const width = 750;
const height = 400;

const margin = {
  top: 60,
  bottom: 60,
  left: 80,
  right: 80,
};

const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

//Accessors - functional approach to x,y tuples
const x = (d) => new Date(d.date);
const y = (d) => d.close;

// Test the accessors
// console.log(data.map(y));
// console.log(x(data[0]));
// console.log(y(data[0]));

const xScale = scaleTime({
  range: [0, xMax],
  domain: extent(data, x),
});

const yScale = scaleLinear({
  range: [yMax, 0],
  domain: [0, max(data, y)],
});

// extent is a d3 array function
// https://github.com/d3/d3-array#extent

// Note that visx expects chart elements to be rendered inside of an
// svg element

const Example = () => {
  return (
    <svg width={width} height={height}>
      <Group top={margin.top} left={margin.left}>
        <AreaClosed
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          fill={"red"}
        />
      </Group>
    </svg>
  );
};

export default Example;

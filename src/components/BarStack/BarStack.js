import React from "react";
import { BarStack } from "@visx/shape";
import { Group } from "@visx/group";
import { Grid } from "@visx/grid";
import { AxisBottom } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { timeParse, timeFormat } from "d3-time-format";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { LegendOrdinal } from "@visx/legend";

import styles from "./BarStack.module.css";

const purple1 = "#a1c4fd";
const purple2 = "#96e6a1";
const purple3 = "#84fab0";
const background = "#eaedff";

const defaultMargin = { top: 10, right: 0, bottom: 0, left: 0 };

const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white",
};

// MAIN FUNCTION STARTS HERE!!!
export default function StackedBarChart({
  width,
  height,
  events = false,
  margin = defaultMargin,
  dataline,
  extra,
  categoryTotal = 0,
}) {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip();

  categoryTotal = Object.values(dataline)
    .slice(-3)
    .reduce((acc, val) => acc + val);

  //Quick hack to ensure we have an array rather than a JSON
  let data = [];
  data.push(dataline);

  //Keys are for the stacks and legend - just ignore the month
  const keys = Object.keys(data[0]).filter((d) => d !== "month");

  // See https://github.com/d3/d3-time-format
  const parseDate = timeParse("%B_%Y");
  const format = timeFormat("%b %y");
  const formatDate = (d) => format(parseDate(d));

  // accessor
  const getDate = (d) => d.month;

  // scales
  const dateScale = scaleBand({
    domain: data.map(getDate),
    padding: 0.2,
  });

  const linScale = scaleLinear({
    domain: [0, categoryTotal],
    nice: true,
  });

  //This sets the colour scale for the legend
  const colorScale = scaleOrdinal({
    domain: keys,
    range: [purple1, purple2, purple3],
  });

  let tooltipTimeout = 0;

  const { containerRef, TooltipInPortal } = useTooltipInPortal();

  if (width < 10) return null;

  // bounds
  const xMax = width;
  const yMax = height - margin.top - 30;

  dateScale.rangeRound([0, xMax]);
  linScale.range([yMax, 0]);

  //Rect rx=rounded corners (SVG)
  return width < 10 ? null : (
    // relative position is needed for correct tooltip positioning
    <div style={{ position: "relative" }}>
      <svg ref={containerRef} width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={background}
          rx={0}
        />
        <Grid
          top={margin.top}
          left={margin.left}
          xScale={dateScale}
          yScale={linScale}
          width={xMax}
          height={yMax}
          stroke="black"
          strokeOpacity={0.1}
          xOffset={dateScale.bandwidth() / 2}
        />
        <Group top={margin.top}>
          <BarStack
            data={data}
            keys={keys}
            x={getDate}
            xScale={dateScale}
            yScale={linScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => (
                  <rect
                    key={`bar-stack-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    height={bar.height}
                    width={bar.width}
                    fill={bar.color}
                    onMouseLeave={() => {
                      tooltipTimeout = window.setTimeout(() => {
                        hideTooltip();
                      }, 100);
                    }}
                    onMouseMove={(event) => {
                      if (tooltipTimeout) clearTimeout(tooltipTimeout);
                      const top = event.clientY - margin.top - bar.height;
                      const left = bar.x + bar.width / 2;
                      showTooltip({
                        tooltipData: bar,
                        tooltipTop: top,
                        tooltipLeft: left,
                      });
                    }}
                  />
                ))
              )
            }
          </BarStack>
        </Group>
        <AxisBottom
          top={yMax + margin.top}
          scale={dateScale}
          tickFormat={formatDate}
          stroke={purple3}
          tickStroke={purple3}
          tickLabelProps={() => ({
            textAnchor: "middle",
          })}
        />
      </svg>
      <div
        className={styles.legend}
      >
      <LegendOrdinal
        scale={colorScale}
        direction="column"
        shape="circle"
      />
      </div>

      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          key={Math.random()} // update tooltip bounds each render
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div style={{ color: colorScale(tooltipData.key) }}>
            <strong>Topic: {tooltipData.key}</strong>
          </div>
          <div>Posts: {tooltipData.bar.data[tooltipData.key]}</div>
          <div>Date: {formatDate(getDate(tooltipData.bar.data))}</div>
        </TooltipInPortal>
      )}
    </div>
  );
}

import React from "react";
import { BarStack } from "@visx/shape";
import { Group } from "@visx/group";
import { Grid } from "@visx/grid";
import { AxisBottom } from "@visx/axis";
import cityTemperature from "@visx/mock-data/lib/mocks/cityTemperature";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { timeParse, timeFormat } from "d3-time-format";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { LegendOrdinal } from "@visx/legend";

const purple1 = "#6c5efb";
const purple2 = "#c998ff";
export const purple3 = "#a44afe";
export const background = "#eaedff";
const defaultMargin = { top: 40, right: 0, bottom: 0, left: 0 };
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white",
};


const testData = cityTemperature.slice(0, 12);

// MAIN FUNCTION STARTS HERE!!!
export default function Example({
  width,
  height,
  events = false,
  margin = defaultMargin,
  data=testData
}) {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip();
  
  console.log(data)
  
  
  const keys = Object.keys(data[0]).filter((d) => d !== "date");
  
  const temperatureTotals = data.reduce((allTotals, currentDate) => {
    const totalTemperature = keys.reduce((dailyTotal, k) => {
      dailyTotal += Number(currentDate[k]);
      return dailyTotal;
    }, 0);
    allTotals.push(totalTemperature);
    return allTotals;
  }, []);
  
  const parseDate = timeParse("%Y-%m-%d");
  const format = timeFormat("%b %d");
  const formatDate = (d) => format(parseDate(d));
  
  // accessors
  const getDate = (d) => d.date;
  
  // scales
  const dateScale = scaleBand({
    domain: data.map(getDate),
    padding: 0.2,
  });
  const temperatureScale = scaleLinear({
    domain: [0, Math.max(...temperatureTotals)],
    nice: true,
  });
  const colorScale = scaleOrdinal({
    domain: keys,
    range: [purple1, purple2, purple3],
  });
  
  let tooltipTimeout = 0;

  const { containerRef, TooltipInPortal } = useTooltipInPortal();

  if (width < 10) return null;
  // bounds
  const xMax = width;
  const yMax = height - margin.top - 100;

  dateScale.rangeRound([0, xMax]);
  temperatureScale.range([yMax, 0]);

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
          rx={14}
        />
        <Grid
          top={margin.top}
          left={margin.left}
          xScale={dateScale}
          yScale={temperatureScale}
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
            yScale={temperatureScale}
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
                    onClick={() => {
                      if (events) alert(`clicked: ${JSON.stringify(bar)}`);
                    }}
                    onMouseLeave={() => {
                      tooltipTimeout = window.setTimeout(() => {
                        hideTooltip();
                      }, 300);
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
            fill: purple3,
            fontSize: 11,
            textAnchor: "middle",
          })}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: margin.top / 2 - 10,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontSize: "14px",
        }}
      >
        <LegendOrdinal
          scale={colorScale}
          direction="row"
          labelMargin="0 15px 0 0"
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
            <strong>{tooltipData.key}</strong>
          </div>
          <div>{tooltipData.bar.data[tooltipData.key]}℉</div>
          <div>
            <small>{formatDate(getDate(tooltipData.bar.data))}</small>
          </div>
        </TooltipInPortal>
      )}
    </div>
  );
}

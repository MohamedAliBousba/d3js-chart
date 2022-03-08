import "./App.css";
import * as d3 from "d3";
import { scaleLinear, scaleBand } from "d3-scale";
import { useRef, useEffect, useCallback } from "react";

const Data = [
  { id: 1, value: 10, region: "USA" },
  { id: 2, value: 11, region: "India" },
  { id: 3, value: 12, region: "China" },
  { id: 4, value: 6, region: "Germany" }
];

function App() {
  // useRef();

  const xScale = scaleBand()
    .domain(Data.map(d => d.region))
    .rangeRound([0, 250])
    .padding(0.1);
  const yScale = scaleLinear()
    .domain([0, 15])
    .range([250, 0]);

  const svgRef = useCallback(ref => {
    if(ref == null) return

    const container = d3.select(ref).classed("container", true);
    const bars = container
      .selectAll(".bar")
      .data(Data)
      .enter()
      .append("rect")
      .classed("bar", true)
      .style("width", xScale.bandwidth())
      .style("height", data => 250 - yScale(data.value))
      .attr("x", data => xScale(data.region))
      .attr("y", data => yScale(data.value))
      .exit().remove();
  }, []);

  return <div className="App">
    <svg ref={svgRef}></svg> 
  </div>;
}

export default App;

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useStyles } from './Style';

function Chart() {
    const classes = useStyles();
    const ref = useRef();

    useEffect(() => { generateSvg(); }, []);

    const data = [{
        name: "E",
        value: 0.12702
    }, {
        name: "T",
        value: 0.09056
    }, {
        name: "A",
        value: 0.08167
    }];

    const width = 500;

    const height = 500;

    const margin = ({ top: 30, right: 0, bottom: 10, left: 30 });

    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([margin.left, width - margin.right]);

    const y = d3.scaleBand()
        .domain(d3.range(data.length))
        .rangeRound([margin.top, height - margin.bottom])
        .padding(0.1);

    const format = x.tickFormat(20, data.format);

    const xAxis = g => g
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisTop(x).ticks(width / 80, data.format))
        .call(g => g.select(".domain").remove());

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickFormat(i => data[i].name).tickSizeOuter(0));

    function generateSvg() {
        const svgElement = d3.select(ref.current);

        // svgElement.append('circle')
        //     .attr('cx', '50%')
        //     .attr('cy', '50%')
        //     .attr('r', 50)
        //     .attr("viewBox", [0, 0, 500, 500])


        svgElement.append("g")
            .attr("fill", "steelblue")
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", x(0))
            .attr("y", (d, i) => y(i))
            .attr("width", d => x(d.value) - x(0))
            .attr("height", y.bandwidth());

        svgElement.append("g")
            .attr("fill", "white")
            .attr("text-anchor", "end")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .selectAll("text")
            .data(data)
            .join("text")
            .attr("x", d => x(d.value))
            .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
            .attr("dy", "0.35em")
            .attr("dx", -4)
            .text(d => format(d.value))
            .call(text => text.filter(d => x(d.value) - x(0) < 20) // short bars
                .attr("dx", +4)
                .attr("fill", "black")
                .attr("text-anchor", "start"));

        svgElement.append("g")
            .call(xAxis);

        svgElement.append("g")
            .call(yAxis);
    }

    return <svg ref={ref} className={classes.svg} />
}

export default Chart;
import React, { useEffect, useRef, useState } from 'react';
import { useStyles } from './Style';
import { select, scaleLinear, scaleBand, max, axisLeft, axisBottom } from 'd3';

function Chart(props) {
    const classes = useStyles();
    const ref = useRef();
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => { generateSvg(); }, []);

    function generateSvg() {
        const data = [{
            country: 'teste1', population: '123'
        }, {
            country: 'teste2', population: '456'
        }, {
            country: 'teste3', population: '789'
        }, {
            country: 'teste4', population: '120'
        }, {
            country: 'teste5', population: '450'
        }, {
            country: 'teste6', population: '790'
        }, {
            country: 'teste7', population: '30'
        }, {
            country: 'teste8', population: '50'
        }, {
            country: 'teste9', population: '80'
        }, {
            country: 'teste10', population: '123'
        }, {
            country: 'teste11', population: '456'
        }, {
            country: 'teste12', population: '789'
        }];

        data.forEach(d => {
            d.population = d.population * 10;
        });

        const svgElement = select(ref.current);
        const width = svgElement.attr('width');
        const height = svgElement.attr('height');
        const margin = { top: 20, right: 20, bottom: 20, left: 50 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const xScale = scaleLinear()
            .domain([0, max(data, d => d.population)])
            .range([0, innerWidth]);
        const yScale = scaleBand()
            .domain(data.map(d => d.country))
            .range([0, innerHeight])
            .padding(0.1)

        const g = svgElement.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)

        g.append('g').call(axisLeft(yScale));
        g.append('g').call(axisBottom(xScale))
            .attr('transform', `translate(0, ${innerHeight})`);

        g.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('y', d => yScale(d.country))
            .attr('width', 0)
            .attr('height', yScale.bandwidth())
            .transition()
            .duration(1000)
            .attr('width', d => xScale(d.population))

        const tooltip = svgElement.append('g')
            .attr('class', classes.tooltip)
            .style('display', 'none')

        tooltip.append('text')
            .attr('x', 15)
            .attr('dy', '1.e2m')
            .style('font-size', '1.25em')
            .attr('font-weight', 'bold')

        const bars = svgElement.selectAll('rect');

        bars.on('mouseover', (event, data) => {
            // tooltip.style('display', 'block');
            setShowInfo(false);
        });

        bars.on('mouseout', (event, data) => {
            tooltip.style('display', 'none');
            setShowInfo(false);
        });

        bars.on('mousemove', (event, d) => {
            const xPos = event.clientX - 10;
            const yPos = event.clientY - 105;
            tooltip.attr('transform', `translate(${xPos}, ${yPos})`);
            tooltip.select('text').text(d.country);
            tooltip.style('display', 'block');
            setShowInfo(true);
        });
    }

    return (
        <div className={classes.content}>
            <svg ref={ref} className={classes.svg} width='960' height='500' />
            {showInfo && <div>asdasdfsafasfasfsafasfas</div>}
        </div>
    );
}

export default Chart;
import React, { useEffect, useRef, useState } from 'react';
import { useStyles } from './Style';
import { Box, Typography } from '@material-ui/core';
import { select, scaleLinear, scaleBand, max, axisLeft, axisBottom } from 'd3';

function Chart(props) {
    const { data } = props;
    const classes = useStyles();
    const ref = useRef();
    const [dataDetail, setDataDetail] = useState({});

    useEffect(() => { generateSvg(); }, []);

    function generateSvg() {

        const svgElement = select(ref.current);
        const width = svgElement.attr('width');
        const height = svgElement.attr('height');
        const margin = { top: 5, right: 20, bottom: 5, left: 170 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const xScale = scaleLinear()
            // .domain([0, max(data, d => d.percetualChart)])
            .domain([0, 100])
            .range([0, innerWidth]);
        const yScale = scaleBand()
            .domain(data.map(d => d.descricao))
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
            .attr('fill', d => getColorRect(d))
            .attr('y', d => yScale(d.descricao))
            .attr('width', 0)
            .attr('height', yScale.bandwidth())
            .transition()
            .duration(1000)
            .attr('width', d => xScale(d.percetualChart))
            .style('cursor', 'pointer')

        const tooltip = svgElement.append('g')

        tooltip.append('text')
            .attr('x', 15)
            .attr('dy', '1.2em')
            .style('font-size', '1em')
            .style('color', '#545454')

        const bars = svgElement.selectAll('rect');

        bars.on('click', (event, data) => {
            updateMoreDetail(data)
        });

        bars.on('mouseout', (event, data) => {
            tooltip.style('display', 'none');
        });

        bars.on('mousemove', (event, d) => {
            const xPos = event.clientX - 10;
            const yPos = event.clientY - 120;
            tooltip.attr('transform', `translate(${xPos}, ${yPos})`);
            tooltip.select('text').text(`Percentual de conclusão: ${d.percentual}%`);
            tooltip.style('display', 'block');
        });
    }

    function getColorRect(d) {
        switch (d.estagio) {
            case 'TO_DO':
                return '#00d4ff'
            case 'DOING':
                return '#fbcb00'
            case 'DONE':
                return '#00bb00'
            default:
                return 'transparent'
        }
    }

    function updateMoreDetail(data) {
        setDataDetail(data);
    }

    return (
        <Box className={classes.content}>
            <svg ref={ref} className={classes.svg} width='600' height='320' />
            <Box className={classes.moreDetail}>
                <Typography>Detalhes</Typography>
                <ul>
                    <li>Descrição: {dataDetail.descricao}</li>
                    <li>Data prevista início: {dataDetail.dataPrevistaInicio}</li>
                    <li>Data prevista término: {dataDetail.dataPrevistaTermino}</li>
                    <li>Data início: {dataDetail.dataInicio}</li>
                    <li>Data término: {dataDetail.dataTermino}</li>
                    <li>Estágio: {dataDetail.estagioStr}</li>
                    <li>Percentual de conclusão: {dataDetail.percentual}</li>
                </ul>
            </Box>
        </Box>
    );
}

export default Chart;
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useStyles } from './Style';

function Chart(props) {
    const classes = useStyles();
    const ref = useRef();

    useEffect(() => { generateSvg(); }, []);

    // data = [{
    //     ano: 2019,
    //     atividades: [{
    //         comentarios: [],
    //         dataInicio: null,
    //         dataPrevistaInicio: "04/12/2019",
    //         dataPrevistaTermino: "16/01/2020",
    //         dataTermino: null,
    //         descricao: "Título",
    //         detalhes: null,
    //         estagio: "TO_DO",
    //         id: 353,
    //         percentualConclusao: 0
    //     }]
    // }, {
    //     ano: 2020,
    //     atividades: [{
    //         comentarios: [],
    //         dataInicio: null,
    //         dataPrevistaInicio: "04/12/2019",
    //         dataPrevistaTermino: "16/01/2020",
    //         dataTermino: null,
    //         descricao: "Título",
    //         detalhes: null,
    //         estagio: "TO_DO",
    //         id: 353,
    //         percentualConclusao: 0
    //     }]
    // }]

    function generateSvg() {
        const svgElement = d3.select(ref.current);

        const data = [30, 15, 50, 70, 80];

        const width = 500;
        const height = 500;

        // svgElement.attr('width', width)
        //     .attr('height', height);

        const widthScale = d3.scaleLinear()
            .domain([0, 80])
            .range([0, width]);

        const colorScale = d3.scaleLinear()
            .domain([0, 80])
            .range(['red', 'blue']);

        const bars = svgElement.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('width', 0)
            .attr('height', 30)
            .attr('fill', d => colorScale(d))
            .attr('y', (d, i) => i * 35)

        bars.transition()
            .duration(1000)
            .attr('width', d => widthScale(d))


    }

    return (
        <div className={classes.content}>
            <svg ref={ref} className={classes.svg} />
        </div>
    );
}

export default Chart;
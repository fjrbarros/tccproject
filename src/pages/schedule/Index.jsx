import React, { useEffect } from 'react';
import { useStyles } from './Style';
import Api from '../../util/api/Index';
import Body from '../../components/body/Index';
import Chart from "react-google-charts";


function PageSchedule(props) {
	const classes = useStyles();
	const Project = props.location.state ? props.location.state.Project : null;

	useEffect(() => {
		getSchedule();
	}, []);

	function getSchedule() {
		if (!Project) return;

		Api.get(`/projeto/${Project.id}/cronograma`)
			.then(resp => {

			})
			.catch(error => {

			});
	}

	return (
		<Body>
			<Chart
				width={'100vw'}
				height={'calc(100vh - 80px)'}
				chartType="BarChart"
				loader={<div>Carregando gráfico</div>}
				diffdata={{
					old: [
						['Name', 'Popularity'],
						['Cesar', 250],
						['Rachel', 4200],
						['Patrick', 2900],
						['Eric', 8200],
					],
					new: [
						['Name', 'Popularity'],
						['Cesar', 370],
						['Rachel', 600],
						['Patrick', 700],
						['Eric', 1500],
					],
				}}
				options={{
					legend: { position: 'top' },
				}}
				rootProps={{ 'data-testid': '3' }}
			/>
		</Body>
	);
}

export default PageSchedule;
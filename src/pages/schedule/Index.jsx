import React, { useEffect, useState } from 'react';
import { useStyles } from './Style';
import Api from '../../util/api/Index';
import Body from '../../components/body/Index';
import Loading from '../../components/loading/Index';
import Chart from 'react-google-charts';

function PageSchedule(props) {
	const classes = useStyles();
	const Project = props.location.state ? props.location.state.Project : null;
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		getSchedule();
	}, []);

	function getSchedule() {
		if (!Project) return;

		setIsLoading(true);
		Api.get(`/projeto/${Project.id}/cronograma`)
			.then(resp => {
				assembleGraphic(resp);
			})
			.catch(error => {
				setIsLoading(false);
			});
	}

	function assembleGraphic(resp) {
		const defaultData = [[
			{ type: 'string', label: 'Activitie ID' },
			{ type: 'string', label: 'Activitie Name' },
			{ type: 'string', label: 'Resource' },
			{ type: 'date', label: 'Start Date' },
			{ type: 'date', label: 'End Date' },
			{ type: 'number', label: 'Duration' },
			{ type: 'number', label: 'Percent Complete' },
			{ type: 'string', label: 'Dependencies' },
		]];

		resp.data.atividades.map(item => {
			item.atividades.map(item => {
				var splitStartDate = null;
				var splitEndDate = null;
				var startDate = null;
				var endDate = null;

				if (item.dataInicio && item.dataTermino) {
					splitStartDate = item.dataInicio.split('/');
					splitEndDate = item.dataTermino.split('/');
					startDate = new Date(`${splitStartDate[2]}/${splitStartDate[1]}/${splitStartDate[0]}`);
					endDate = new Date(`${splitEndDate[2]}/${splitEndDate[1]}/${splitEndDate[0]}`);
				} else {
					splitStartDate = item.dataPrevistaInicio.split('/');
					splitEndDate = item.dataPrevistaTermino.split('/');
					startDate = new Date(`${splitStartDate[2]}/${splitStartDate[1]}/${splitStartDate[0]}`);
					endDate = new Date(`${splitEndDate[2]}/${splitEndDate[1]}/${splitEndDate[0]}`);
				}

				defaultData.push([
					item.id,
					item.descricao,
					item.estagio,
					startDate,
					endDate,
					null,
					item.percentualConclusao,
					null,
				]);
			});
		});
		setData(defaultData);
		setIsLoading(false);
	}

	return (
		<Body>
			<Chart
				width={'100%'}
				height={'100%'}
				chartType='Gantt'
				loader={<Loading />}
				data={data}
				options={{
					height: '100%',
					gantt: {
						trackHeight: 30,
					},
				}}
				rootProps={{ 'data-testid': '2' }}
			/>
			{isLoading && <Loading />}
		</Body>
	);
}

export default PageSchedule;
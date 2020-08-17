import React, { useEffect } from 'react';
import { useStyles } from './Style';
import Api from '../../util/api/Index';


function PageSchedule(props) {
	const Project = props.location.state ? props.location.state.Project : null;
	// http://54.233.238.26:8080/projectmanager/api/v1/projeto/${idProjeto}/cronograma
	useEffect(() => {
		getSchedule();
    }, []);

	function getSchedule() {
		Api.get(`/projeto/${Project.id}/cronograma`)
            .then(resp => {
                
            })
            .catch(error => {
                
            });
	}

	return (
		<h1>aaaaaaaaaaaa</h1>
	);
}

export default PageSchedule;
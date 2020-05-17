import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from 'date-fns/locale';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

function ComponentDate(props) {

    return (
        <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
            <KeyboardDatePicker
                className={props.className}
                autoOk
                variant='inline'
                label={props.label}
                format='dd/MM/yyyy'
                value={props.value}
                InputAdornmentProps={{ position: 'end' }}
                onChange={props.onChange}
            />
        </MuiPickersUtilsProvider>
    );
}

export default ComponentDate;
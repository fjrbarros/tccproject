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
                {...props}
                variant='inline'
                format='dd/MM/yyyy'
                InputAdornmentProps={{ position: 'end' }}
                onChange={props.onChange}
            />
        </MuiPickersUtilsProvider>
    );
}

export default ComponentDate;
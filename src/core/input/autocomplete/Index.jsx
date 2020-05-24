import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

function InputAutoCompele(props) {

    return (
        <Autocomplete
            {...props}
            renderInput={(params) =>
                <TextField {...params}
                    label={props.label}
                    error={props.error}
                    helperText={props.helperText}
                />
            }
        />
    );
}

export default InputAutoCompele;
import React from 'react';
import { TextField } from '@material-ui/core';
import InputMask from "react-input-mask";

function PhoneField(props) {
    return (
        <InputMask
            {...props}
            maskChar={null}
        >
            {() => <TextField
                {...props}
            />}
        </InputMask>
    );
}

export default PhoneField;
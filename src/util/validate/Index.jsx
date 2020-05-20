export function validateForm(values, errorFn) {
    let msg;
    if(values.hasOwnProperty('name')) {
        if((msg = validateName(values.name))) {
            errorFn('name', msg)
        }
    }

    if(values.hasOwnProperty('email')) {
        if((msg = validateEmail(values.email))) {
            errorFn('email', msg)
        }
    }
    if(values.hasOwnProperty('phone')) {
        if((msg = validatePhone(values.phone))) {
            errorFn('phone', msg)
        }
    }
    if(values.hasOwnProperty('password')) {
        if((msg = validatePassword(values.password))) {
            errorFn('password', msg)
        }
    }
    if(values.hasOwnProperty('confPassword')) {
        if((msg = validateConfPassword(values.confPassword, values.password))) {
            errorFn('confPassword', msg)
        }
    }
}

function validateName(name, required) {
    if(!name) {
        return 'Nome é obrigatório!';
    } else {
        return '';
    }
}

function validateEmail(email) {
    if(!email) {
        return 'E-mail é obrigatório!';
    }

    const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

    if(!regex.test(email)) {
        return 'E-mail inválido';
    }

    return '';
}

function validatePhone(phone) {
    if(!phone) {
        return 'Telefone é obrigatório!';
    }

    if(phone.length !== 15) {
        return 'Número inválido!';
    }

    return '';
}

function validatePassword(password) {
    if(!password) {
        return 'Senha é obrigatório!';
    }

    return '';
}

function validateConfPassword(confPassword, password) {
    if(!confPassword) {
        return 'Confirmação senha é obrigatório!';
    }

    if(password && password !== confPassword) {
        return 'Senhas diferentes!';
    }

    return '';
}